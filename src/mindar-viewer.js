import React, { useEffect, useRef } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const MindARViewer = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    console.log("Initializing MindAR viewer...");
    const sceneEl = sceneRef.current;
    if (!sceneEl) {
      console.error("Scene element not found!");
      return;
    }

    console.log("Scene element found, waiting for renderstart...");

    // Wait for the scene to be loaded
    sceneEl.addEventListener("loaded", () => {
      console.log("Scene loaded, initializing AR system...");
      const arSystem = sceneEl.systems["mindar-image-system"];
      if (!arSystem) {
        console.error("MindAR system not found!");
        return;
      }

      sceneEl.addEventListener("renderstart", () => {
        console.log("Render started, starting AR system...");
        arSystem.start(); // start AR
      });

      sceneEl.addEventListener("error", (error) => {
        console.error("A-Frame error:", error);
      });
    });

    return () => {
      console.log("Cleaning up AR system...");
      if (sceneEl.systems["mindar-image-system"]) {
        sceneEl.systems["mindar-image-system"].stop();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /target.mind; autoStart: false; uiLoading: yes; uiError: yes; uiScanning: yes; filterMinCF:0.001; filterBeta: 1000"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img id="card" src="/target.png" alt="AR target" />
          {/* <a-asset-item
            id="avatarModel"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
          ></a-asset-item> */}
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            src="#card"
            position="0 0 0"
            height="1"
            width="1"
            rotation="0 0 0"
          ></a-plane>
          <a-gltf-model
            rotation="0 0 0 "
            position="0 0 0.1"
            scale="0.005 0.005 0.005"
            src="#avatarModel"
            animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-gltf-model>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default MindARViewer;
