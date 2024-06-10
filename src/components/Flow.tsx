import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

function Flow() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow style={{ height: '100%', width: '100%' }}>
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;