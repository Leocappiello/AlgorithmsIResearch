import { useRef, useState } from 'react';
import DnDFlow from './components/DnDFlow';
import Solution from './components/Solution';

function transformData(solution) {
  const nodes = [];
  const edges = [];

  // Crear nodos únicos
  const nodeSet = new Set();
  solution.forEach(({ start, end }) => {
      nodeSet.add(start);
      nodeSet.add(end);
  });

  // Asignar posiciones a los nodos
  let xPos = 0;
  let yPos = 0;
  let increment = -100;
  let incrementX = -100;
  nodeSet.forEach((node, index) => {
      nodes.push({
          id: node.replace('dndnode_', ''),
          type: index === 0 ? 'input' : 'custom',
          data: { label: `${node.replace('dndnode_', '')}` },
          position: { x: xPos, y: yPos }
      });
      xPos += incrementX;
      yPos += increment;
  });

  // Crear edges
  solution.forEach(({ start, end, weight }) => {
      edges.push({
          id: `e${start.replace('dndnode_', '')}-${end.replace('dndnode_', '')}`,
          source: start.replace('dndnode_', ''),
          target: end.replace('dndnode_', ''),
          data: { label: weight },
          type: 'custom'
      });
  });

  return { nodes, edges };
}

const App = () => {
  const [solution, setSolution] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [selected, setSelected] = useState(0);
  const [ffResult, setFFResult] = useState(null);

  const options = [
    {
      algorithm: 'prim',
    },
    {
      algorithm: 'kruskal',
    },
    /* {
      algorithm: 'djikstra',
    }, */
    {
      algorithm: 'Ford Fulkerson'
    }
  ]

  return (
    <div className="dndflow" style={{height: '100%', width: '100%', flexDirection: 'column'}}>
      <DnDFlow
        solution={solution}
        setSolution={setSolution}
        reactFlowWrapper={reactFlowWrapper}
        selected={selected}
        setSelected={setSelected}
        options={options}
        setFFResult={setFFResult}
      />
      <Solution ffResult={ffResult} selected={options[selected].algorithm} solution={solution && options[selected].algorithm !== 'Ford Fulkerson' ? transformData(solution) : []} /* reactFlowWrapper={reactFlowWrapper} *//>
    </div>
  )
}

export default App