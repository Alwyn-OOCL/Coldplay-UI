import React, { useRef, useState } from "react";
import "./HomeVideo.css";

const HomeVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // 是否播放
  const [isMuted, setIsMuted] = useState(true); // 初始为静音
  const [volume, setVolume] = useState(0.5); // 初始化音量

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume > 0) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="homevideo">
      <video
        ref={videoRef}
        className="homevideo-content"
        autoPlay
        muted={isMuted} // 初始静音
        loop
        onClick={togglePlayPause}
      >
        <source
          src={require("../../../assets/videos/homevideo.mp4")}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="video-controls-left">
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="video-controls-right">
        <button onClick={toggleFullScreen}>Fullscreen</button>
      </div>
    </section>
  );
};

export default HomeVideo;
