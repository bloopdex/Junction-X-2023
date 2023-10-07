import React, { useEffect, useRef } from "react";
import OvenPlayer, { OvenPlayerConfig } from "ovenplayer";

function VideoPlayer() {
  const videoStreamUrl = "ws://13.38.173.241:3333/app/1"; // Set the WebSocket URL here
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    // Initialize OvenPlayer when the component mounts
    const options: OvenPlayerConfig = {
      sources: [
        {
          type: "hls",
          file: videoStreamUrl,
        },
      ],
    };

    const player = OvenPlayer.create(videoPlayerRef.current ?? "", options);
  }, [videoStreamUrl]);

  return <div className="video-player" ref={videoPlayerRef}></div>;
}

export default VideoPlayer;
