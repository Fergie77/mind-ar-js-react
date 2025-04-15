import React, { useEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const MindARViewer = () => {
  const sceneRef = useRef(null);

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

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /target.mind; autoStart: false; uiLoading: yes; uiError: yes; uiScanning: yes;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img id="target" src="/target.png" alt="AR target" />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            src="#target"
            position="0 0 0"
            height="1"
            width="1"
            rotation="0 0 0"
          ></a-plane>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default MindARViewer;
