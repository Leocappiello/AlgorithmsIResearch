
export default ({isDjikstra, djikstraStart, setDjikstraStart, setNodes, setEdges, nodes}) => {
  console.log('isDjikstra', isDjikstra);
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  }

  const changeDjikstraStart = (e) => {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    const value = parseInt(e.target.value)
    if (!isNaN(value)) { setDjikstraStart(e.target.value) }
  }

  const nodesAvailable = nodes.map(elem => elem.id.split('dndnode_')[1]);

  return (
    <aside>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'nodeCustom')} draggable>
        <div className="nodeCircle"/>
        Node
      </div>
      <div className="dndnode output buttonClear"
        onClick={handleClear}
      >
        Clear canvas
      </div>
      {isDjikstra &&
      <>
        <h3 style={{textAlign: 'center', color: '#282828', borderTop: '1px solid gray', paddingTop: '1em'}}>Inicio del Djikstra</h3>
        <input
          placeholder={nodes.length > 0 ? `Ingresa el inicio entre 0 y ${nodes.length}` : 'No hay nodos, agrega uno'}
          className="dndnode output"
          style={{width: '95%', cursor: 'text', textAlign: 'end'}}
          onChange={changeDjikstraStart}
          type="number"
        />

        {!nodesAvailable.includes(djikstraStart) ?
        <div style={{color: 'gray'}}>
          <p>El numero de inicio  parece incorrecto.</p>
          <p>Cantidad de nodos actuales: {nodes.length}</p>
          {nodesAvailable.length > 0 && <p style={{margin: 0}}>Nodos disponibles:</p>}
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {
            nodesAvailable.map((elem, index) => 
              index != nodesAvailable.length - 1 ?
              <p style={{margin: '0 0 0 2px'}}> {elem} -  </p>
              :
              <p style={{margin: '0 0 0 2px'}}> {elem} </p>
            )
          }
          </div>
        </div>
        :
        ''
        }
      </>
      }
      <button className="dndnode solution"
        style={{cursor: 'pointer'}}
      >Show solution</button>
    </aside>
  );
};