import {
  FC,
  useEffect,
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
  const [thumbnail, setThumbnail] = useState(0);
  const [hovering, setHovering] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const offscreenVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const captureFrame = (time: number) => {
    if (!offscreenVideoRef.current || !canvasRef.current) return;
    const video = offscreenVideoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    video.currentTime = time;

    video.onseeked = () => {
      // Draw the video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!videoRef.current) return;

    const offsetX = e.nativeEvent.offsetX;
    const percentage = (offsetX / width) * 100;

    console.log("offsetX", offsetX);

    // Assuming video duration is available
    const newCurrentTime = (percentage / 100) * duration;
    const newThumnailPosition = (width / 100) * percentage;

    setThumbnail(newThumnailPosition);
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

  const extractPaddingClasses = (className: string) => {
    if (!className) return;
    return className
      .split(" ")
      .filter(
        (cls) =>
          cls.startsWith("p-") ||
          cls.startsWith("pt-") ||
          cls.startsWith("pr-") ||
          cls.startsWith("pb-") ||
          cls.startsWith("pl-") ||
          cls.startsWith("px-") ||
          cls.startsWith("py-")
      )
      .join(" ");
  };

  const paddingClasses = extractPaddingClasses(className as string);

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail]);

  return (
    <div className="relative flex justify-center items-center">
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
        Your browser does not support the video tag.
      </video>
      {controls && (
        <div className={`absolute bottom-0 left-0 w-full ${paddingClasses}`}>
          <div className="flex flex-col gap-5 p-3">
            <div
              onMouseOver={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onMouseMove={handleHover}
              onClick={handleProgress}
              ref={ref}
              className="w-full relative py-[4px] cursor-pointer"
            >
              <div className="w-full bg-slate-300 h-[6px]">
                <div
                  className="bg-red-500 h-full relative"
                  style={{
                    width: `calc(${(progress / duration) * width}px)`,
                  }}
                >
                  {hovering && (
                    <button
                      onMouseMove={(e) => e.stopPropagation()}
                      className="bg-red-500 size-[10px] rounded-full absolute top-1/2 -translate-y-1/2 -right-[5px]"
                    />
                  )}
                </div>
                {hovering && (
                  <canvas
                    ref={canvasRef}
                    width="1920"
                    height="1080"
                    className="w-[150px] h-[100px] absolute bottom-[16px] duration-100"
                    style={{
                      left:
                        thumbnail <= 150
                          ? "0px"
                          : thumbnail >= width - 150
                          ? `${width - 150}px`
                          : `calc(${thumbnail}px - 75px)`,
                    }}
                  />
                )}
              </div>
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
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
