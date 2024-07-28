import VideoPlayer from "./ui/video-player";

const VideoExample = () => {
  return (
    <div className="flex gap-5 items-start">
      <VideoPlayer src="/arcane.mp4" controls />
      <VideoPlayer src="/arcane.mp4" controls />
    </div>
  );
};

export default VideoExample;
