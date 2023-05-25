import React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Loader from './Loader'

function Model({ format, modelPath }) {
  let model;
  switch(format) {
    case 'gltf':
      model = useLoader(GLTFLoader, modelPath);
      break;
    case 'obj':
      model = useLoader(OBJLoader, modelPath);
      break;
    case 'fbx':
      model = useLoader(FBXLoader, modelPath);
      break;
    default:
      console.error(`Unsupported format: ${format}`);
      return null;
  }
  return <primitive object={model.scene} />
}

export default function ModelViewer({ format, modelPath }) {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model format={format} modelPath={modelPath} />
      </Suspense>
    </Canvas>
  )
}
