import {
  FC,
  useLayoutEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from "react";
import { Button } from "./button";
import { cn } from "../../utils/cn";
import useMeasure from "react-use-measure";

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {}

const VideoPlayer: FC<VideoProps> = ({
  src,
  controls,
  className,
  ...props
}) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ref, { width }] = useMeasure();

  const videoRef = useRef<HTMLVideoElement>(null);
  const offscreenVideoRef = useRef(null);
  const canvasRef = useRef(null);

  const captureFrame = (time) => {
    const video = offscreenVideoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    video.currentTime = time;

    video.onseeked = () => {
      // Draw the video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL();
      setThumbnail(dataURL);
      video.onseeked = null; // Clear the event handler
    };
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!videoRef.current) return;
    const offsetX = e.nativeEvent.offsetX;
    const percentage = (offsetX / width) * 100;

    // Assuming video duration is available
    const newCurrentTime = (percentage / 100) * duration;

    captureFrame(newCurrentTime);
  };

  const handlePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleStop = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.played) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const handleChangeTime = (type: "back" | "front") => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.currentTime =
      type === "back"
        ? videoRef.current.currentTime - 5
        : videoRef.current.currentTime + 5;
  };

  const handleProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!videoRef.current) return;
    const offsetX = e.nativeEvent.offsetX;
    const percentage = (offsetX / width) * 100;

    // Assuming video duration is available
    const newCurrentTime = (percentage / 100) * duration;

    videoRef.current.currentTime = newCurrentTime;
    setProgress(newCurrentTime);
  };

  useLayoutEffect(() => {
    if (!videoRef.current) return;

    const listenChange = () => {
      if (!videoRef.current) return;
      setProgress(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    };

    videoRef.current.addEventListener("timeupdate", listenChange);

    return () =>
      videoRef.current?.removeEventListener("timeupdate", listenChange);
  }, []);

  return (
    <div className="relative w-fit- h-fit">
      <video ref={offscreenVideoRef} style={{ display: "none" }}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        onClick={handlePlay}
        ref={videoRef}
        {...props}
        controls={false}
        className={cn("rounded-lg", className)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {controls && (
        <div className="flex flex-col gap-5 absolute bottom-0 left-0 w-full p-3">
          <canvas
            ref={canvasRef}
            width="1920"
            height="1080"
            className="w-[150px] h-[100px]"
            style={{ border: "1px solid black" }}
          />
          <div
            onMouseMove={handleHover}
            onClick={handleProgress}
            ref={ref}
            className="w-full h-[5px] bg-slate-300"
          >
            <div
              className="bg-red-500 h-full"
              style={{
                width: `calc(${(progress / duration) * width}px)`,
              }}
            />
          </div>
          <div className="flex gap-1">
            <Button onClick={handlePlay} size="sm">
              {videoRef.current?.paused ? "play" : "pause"}
            </Button>
            <Button onClick={handleStop} size="sm">
              Stop
            </Button>
            <Button onClick={() => handleChangeTime("back")} size="sm">
              {"<<"}
            </Button>
            <Button onClick={() => handleChangeTime("front")} size="sm">
              {">>"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
