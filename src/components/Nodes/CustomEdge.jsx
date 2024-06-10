import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
} from 'reactflow';
import {useState, useEffect} from 'react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges, getNodes, getEdges } = useReactFlow();
    const [hovered, setHovered] = useState(false);
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const handleChangeInput = (e) => {
        /* const edges = getEdges(); */
        setEdges((edges) => edges.map((elem) => elem.id === id ? {...elem, data: { value: e.target.value }} : elem))
        
    }

    return (
    <>
        <BaseEdge id={id} path={edgePath} />
        {/* {console.log(id)}
        {console.log(getNodes())}
        {console.log(getEdges())} */}
        
        <EdgeLabelRenderer>
            <input placeholder="value"
                onChange={handleChangeInput}
                style={{
                    position: 'absolute',
                    pointerEvents: 'all',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY-25}px)`,
                    maxWidth: '50px'
                }}
            />
            <button
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    pointerEvents: 'all',
                    borderRadius: '15px',
                    border: '0',
                    cursor: 'pointer',
                    backgroundColor: `${hovered ? '#f2f2f2' : '#e2e2e2'}`
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="nodrag nopan"
                onClick={() => setEdges((es) => es.filter((e) => e.id !== id))}
            >
                x
            </button>
        </EdgeLabelRenderer>
        </>
    );
}
