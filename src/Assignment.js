import React from 'react'


export default function Assignment({ assignment }) {

  return (
    <div className="card-footer">
      <small className="text-muted">{assignment.name}</small>
    </div>
  )
}
