import React from 'react'

const ButtonGroup = ({options, selected, setSelected}) => {

  return (
    <div style={{
      zIndex: 1,
      display: 'flex',
      backgroundColor: '#272729',
      position: 'absolute',
      padding: '.3em',
      borderRadius: '4px',
      fontFamily: 'monospace',
      maxWidth: '350px',
      width: '100%',
      left: 'calc(50% - 125px)',
      marginTop: '1em'
    }}>
      {
        options.map((elem, index) => <Button title={elem.algorithm} key={index} selected={index === selected} index={index} setSelected={setSelected} />)
      }
    </div>
  )
}

interface IButton {
    title: string,
    selected?: boolean,
    index: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>
}

const Button: React.FC<IButton> = ({title, selected, index, setSelected}) => {
  const handleClick = (index: number) => setSelected(index);

  return(
      <button
        style={{
          border: 0,
          cursor: 'pointer',
          color: selected ? '#ff0072' : 'white',
          backgroundColor: selected ? 'black' : '#272729',
          padding: '5px 10px',
          borderRadius: '3px',
          fontWeight: selected ? 700 : 500,
          margin: '2px',
          textTransform: 'capitalize',
          width: '100%'
        }}
        onClick={() => handleClick(index)}
      >{title}</button>
  )
}

export default ButtonGroup