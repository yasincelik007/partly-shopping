import React from 'react'

type Props = {
  selectedId: string | null
}

export default function SidePanel({ selectedId }: Props) {
  return (
    <div style={{ width: 340, background: '#14161a', color: '#e8eaf0', padding: 16, borderLeft: '1px solid #222' }}>
      <h2 style={{ margin: 0, marginBottom: 12, fontSize: 18 }}>Part</h2>
      <div style={{ fontSize: 14 }}>
        <div>Selected ID</div>
        <div style={{ fontFamily: 'monospace', marginTop: 6 }}>{selectedId || 'None'}</div>
      </div>
    </div>
  )
}
