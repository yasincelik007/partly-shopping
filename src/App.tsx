import React, { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, StatsGl } from '@react-three/drei'
import Scene from './components/Scene'
import SidePanel from './components/SidePanel'
import { WebGLRenderer, SRGBColorSpace } from 'three'

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [explode, setExplode] = useState(0)
  const dpr = useMemo(() => Math.min(window.devicePixelRatio, 2), [])
  function createRenderer(canvas: HTMLCanvasElement) {
    const r = new WebGLRenderer({ canvas, antialias: true })
    r.outputColorSpace = SRGBColorSpace
    return r
  }
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas dpr={dpr} shadows gl={(canvas) => createRenderer(canvas)}>
          <color attach="background" args={['#0e0f12']} />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1} position={[5, 8, 5]} castShadow />
          <Scene onSelect={setSelectedId} explode={explode} />
          <OrbitControls makeDefault />
          <StatsGl />
        </Canvas>
        <div style={{ position: 'absolute', left: 12, bottom: 12, background: '#14161a', color: '#e8eaf0', padding: 8, borderRadius: 6 }}>
          <div style={{ fontSize: 12, marginBottom: 4 }}>Explode</div>
          <input type="range" min={0} max={1} step={0.01} value={explode} onChange={e => setExplode(parseFloat(e.target.value))} style={{ width: 240 }} />
        </div>
      </div>
      <SidePanel selectedId={selectedId} />
    </div>
  )
}
