import { Box3, Object3D, Vector3 } from 'three'

type ExplodeData = {
  center: Vector3
  directions: Map<Object3D, Vector3>
}

function computeDirections(root: Object3D): ExplodeData {
  const bbox = new Box3().setFromObject(root)
  const center = bbox.getCenter(new Vector3())
  const directions = new Map<Object3D, Vector3>()
  root.traverse(obj => {
    if ((obj as any).isMesh) {
      const obox = new Box3().setFromObject(obj)
      const ocenter = obox.getCenter(new Vector3())
      const dir = new Vector3().subVectors(ocenter, center).normalize()
      directions.set(obj, dir)
    }
  })
  return { center, directions }
}

function apply(root: Object3D, strength: number) {
  let data = (root as any).__explode as ExplodeData | undefined
  if (!data) {
    data = computeDirections(root)
    ;(root as any).__explode = data
  }
  data.directions.forEach((dir, obj) => {
    obj.position.copy(dir.clone().multiplyScalar(strength))
  })
}

export default { computeDirections, apply }
