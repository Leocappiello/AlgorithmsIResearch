import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import ButtonGroup from './ButtonGroup.tsx';
import CustomEdge from './Nodes/CustomEdge.jsx';
import NodeCustom from './Nodes/NodeCustom.jsx';

import Sidebar from './Sidebar';

/* import calculateDijkstra from '../algorithm/Djikstra.ts'; */
import EdgeAlgorithm from '../algorithm/Edge.class.js';
import { fordFulkerson } from '../algorithm/FordFulkerson.class.ts';
import Graph from '../algorithm/Graph.class.ts';
import calculateKruskal from '../algorithm/Kruskal.class.ts';
import calculatePrim from '../algorithm/Prim.class.js';
import './index.css';
import calculateDijkstra from '../algorithm/Djikstra.ts';

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes = [];


const DnDFlow = ({solution, setSolution, reactFlowWrapper, selected,  setSelected, options, setFFResult}) => {
  
  const nodeTypes = useMemo(() => ({
    nodeCustom: NodeCustom,
  }), []);
  const edgeTypes = useMemo(() => ({
    'customEdge': CustomEdge
  }), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [djikstraStart, setDjikstraStart] = useState(0);

  const [ff, setFf] = useState({
    start: null,
    end: null
  })
  const [hasErrors, setHasErrors] = useState(false);

  const onConnect = useCallback((params) => {
      const edge = {...params, type: 'customEdge'};
      setEdges((edgs) => addEdge(edge, edgs));
    }, [nodes],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          /* label: `${type}Node` */
          label: nodes.length
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, reactFlowInstance],
  );

  const onClickSolution = () => {
    /* setSolution([]) */
    const nodesAlgorithm = nodes.map((elem) => elem.id)
    const edgesAlgorithm = edges.map((elem) => new EdgeAlgorithm(elem.source, elem.target, elem.data?.value ?? undefined))

    try {
      const weights = edgesAlgorithm.map(elem => elem.weight ?? 0);
      if (weights.length && !weights.some(isNaN)) {
        setHasErrors(false)
        switch (options[selected].algorithm) {
          case 'prim':
            setSolution(calculatePrim(nodesAlgorithm, edgesAlgorithm));
            break;

          case 'kruskal':
            setSolution(calculateKruskal(nodesAlgorithm, edgesAlgorithm));
            break;

          case 'djikstra':
            if (djikstraStart) setSolution(calculateDijkstra(nodesAlgorithm, edgesAlgorithm, djikstraStart));
            break;

          case 'Ford Fulkerson':
            if (ff.end && ff.start) {
              setFFResult(fordFulkerson(new Graph(nodesAlgorithm, edgesAlgorithm), ff.end, ff.start));
            }
            break;

          default:
            break;
        }
      } else {
        setHasErrors(true)
      }
    } catch (error) {
      console.log(error);
      console.log('error');
    }
  }

  return (
    <div className="dndflow" style={{height: '100%', width: '100%'}}>
      <ButtonGroup options={options} selected={selected} setSelected={setSelected} />
      <ReactFlowProvider >
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            variant={BackgroundVariant.Dots}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar
          onSolutionClick={onClickSolution}
          setHasErrors={setHasErrors}
          hasErrors={hasErrors}
          selected={options[selected].algorithm}
          ff={ff}
          setFf={setFf}
          djikstraStart={djikstraStart}
          setDjikstraStart={setDjikstraStart}
          nodes={nodes}
          setNodes={setNodes}
          setEdges={setEdges}
          setSolution={setSolution}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
