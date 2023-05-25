import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Stage } from "@react-three/drei";

const ComputersCanvas = ({ children }) => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0.2, 0.1, 0.3], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <OrbitControls
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        dampingFactor={0.3}
      />
      <Stage contactShadow={{ resolution: 1024, scale: 1000 }}>
        {children}
      </Stage>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
