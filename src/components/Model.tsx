import React, { Suspense } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export default function Model({ url }: { url: string }) {
  const { gl } = useThree()
  const gltf = useLoader(
    GLTFLoader,
    url,
    (loader: GLTFLoader) => {
      const draco = new DRACOLoader()
      draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
      loader.setDRACOLoader(draco)
      const ktx2 = new KTX2Loader()
      ktx2.setTranscoderPath('https://unpkg.com/three@0.164.1/examples/jsm/libs/basis/')
      ktx2.detectSupport(gl)
      loader.setKTX2Loader(ktx2)
    }
  )
  return <primitive object={gltf.scene} />
}
