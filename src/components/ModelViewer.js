import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Loader from './Loader';

function Model({ format, modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const obj = useLoader(OBJLoader, modelPath);
  const fbx = useLoader(FBXLoader, modelPath);
  
  let model;
  switch(format) {
    case 'gltf':
      model = gltf;
      break;
    case 'obj':
      model = obj;
      break;
    case 'fbx':
      model = fbx;
      break;
    default:
      console.error(`Unsupported format: ${format}`);
      return null;
  }

  return <primitive object={model.scene} />;
}

export default function ModelViewer({ format, modelPath }) {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model format={format} modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
}
