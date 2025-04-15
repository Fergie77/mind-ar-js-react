import React, { useEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const MindARViewer = () => {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const aVideoRef = useRef(null);
  const [started, setStarted] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) {
      console.error("Scene element not found!");
      return;
    }

    sceneEl.addEventListener("loaded", () => {
      const arSystem = sceneEl.systems["mindar-image-system"];
      if (!arSystem) {
        console.error("MindAR system not found!");
        return;
      }

      sceneEl.addEventListener("renderstart", () => {
        arSystem.start(); // start AR
        // Auto-trigger video playback
        const video = videoRef.current;
        const aVideo = aVideoRef.current;
        if (video && aVideo) {
          video.play();
          aVideo.setAttribute("opacity", 1);
          setStarted(true);
          setPlaying(true);
        }
      });

      sceneEl.addEventListener("error", (error) => {
        console.error("A-Frame error:", error);
      });
    });

    return () => {
      if (sceneEl.systems["mindar-image-system"]) {
        sceneEl.systems["mindar-image-system"].stop();
      }
    };
  }, []);

  const handleClick = () => {
    const video = videoRef.current;
    const aVideo = aVideoRef.current;

    if (!started) {
      video.play();
      aVideo.setAttribute("opacity", 1);
      setStarted(true);
      setPlaying(true);
    } else {
      if (playing) {
        video.pause();
        setPlaying(false);
      } else {
        video.play();
        setPlaying(true);
      }
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100vh", position: "relative" }}
      onClick={handleClick}
    >
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /target.mind; autoStart: false; uiLoading: yes; uiError: yes; uiScanning: no; smoothCount: 10; smoothTolerance: 0.5; filterMinCF: 0.001; filterBeta: 1000;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <video
            id="video"
            ref={videoRef}
            src="/target.MP4"
            style={{ opacity: 0 }}
            width="160"
            height="90"
            autoplay
            loop
            muted
            playsinline
            webkit-playsinline
            crossorigin
          />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-video
            ref={aVideoRef}
            src="#video"
            position="0 0 0"
            height="1.1"
            width="1.1"
            opacity="0"
            rotation="0 0 0"
          ></a-video>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default MindARViewer;
