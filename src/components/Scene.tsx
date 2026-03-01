import React, { Suspense, useMemo, useRef } from 'react'
import { GroupProps, RootState, ThreeEvent, useFrame } from '@react-three/fiber'
import { Mesh, Object3D, Vector3 } from 'three'
import Exploder from './exploder'
import Model from './Model'

type SceneProps = {
  onSelect: (id: string | null) => void
  explode: number
}

function selectableId(o: Object3D): string | null {
  const id = (o.userData && (o.userData.part_id || o.userData.id || o.name)) as string | undefined
  return id || null
}

function useExploded(root: React.RefObject<Object3D>, strength: number) {
  useFrame(() => {
    if (!root.current) return
    Exploder.apply(root.current, strength)
  })
}

function DummyAssembly() {
  const g = useRef<Object3D>(null)
  return (
    <group ref={g}>
      <mesh position={[-0.6, 0, 0]} userData={{ part_id: 'part-A' }}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#4f83ff" />
      </mesh>
      <mesh position={[0.1, 0.3, 0]} userData={{ part_id: 'part-B' }}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#7fd18b" />
      </mesh>
      <lod userData={{ part_id: 'part-C' }} position={[0.8, -0.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 64]} />
          <meshStandardMaterial color="#e1a86c" />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 12]} />
          <meshStandardMaterial color="#e1a86c" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshStandardMaterial color="#e1a86c" />
        </mesh>
      </lod>
    </group>
  )
}

export default function Scene({ onSelect, explode }: SceneProps) {
  const group = useRef<Object3D>(null)
  useExploded(group, explode)

  function onPointerDown(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    const mesh = e.object as Mesh
    const id = selectableId(mesh)
    onSelect(id)
  }

  return (
    <group ref={group as unknown as React.RefObject<GroupProps>} onPointerDown={onPointerDown}>
      <Suspense fallback={null}>
        {(import.meta as any).env?.VITE_MODEL_URL ? (
          <Model url={(import.meta as any).env.VITE_MODEL_URL} />
        ) : (
          <DummyAssembly />
        )}
      </Suspense>
    </group>
  )
}
