import CustomEdgeStartEnd from './Solution/CustomEdgeStartEnd';

import ReactFlow, { addEdge, Background, Connection, Controls, Edge, EdgeTypes, NodeTypes, useEdgesState, useNodesState } from "reactflow";
import CustomEdgeSolution from "./Solution/CustomEdgeSolution";
import { useCallback, useEffect } from "react";
import CustomNodeSolution from './Solution/CustomNodeSolution';

const edgeTypes: EdgeTypes = {
    custom: CustomEdgeSolution,
    'start-end': CustomEdgeStartEnd,
};

const nodeTypes: NodeTypes = {
    custom: CustomNodeSolution,
}

const Solution = ({solution, selected, ffResult}) => {
    const {nodes: nodesSolution, edges: edgesSolution} = solution;
    const [nodes, setNodes, onNodesChange] = useNodesState(nodesSolution);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesSolution);
    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    useEffect(() => {
        setNodes(nodesSolution)
        setEdges(edgesSolution)
    }, [solution])

    if (selected === 'Ford Fulkerson') {
        return(
            <div style={{height: '20%', textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center', borderTop: '3px solid #cecece'}}>
                <p style={{fontSize: 36}}>Flujo maximo: {ffResult}</p>
            </div>
        );
    } else {
        return(
            <div style={{borderTop: '3px solid #cecece', height: '45%'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    >
                <Controls />
                <Background />
                </ReactFlow>
            </div>
        );
    }
};

export default Solution;