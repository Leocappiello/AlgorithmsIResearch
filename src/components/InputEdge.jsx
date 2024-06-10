import React from 'react'

const InputEdge = ({left, top}) => {
  console.log(left, top);
  return (
    <div style={{
        position: 'absolute',
        left: `${Math.abs(left+50)}px`,
        top: `${Math.abs(top+150)}px`,
        transform: 'translate(-50%. -50%)'
    }}>
        <input type="text" placeholder="Ingrese el valor"></input>
    </div>
  )
}

export default InputEdge