import { Handle, Position } from 'reactflow';

function NodeCustom({ data, isConnectable }) {
  let { label } = data;

  return (
    <div className="text-updater-node" style={{borderRadius: '50%', backgroundColor: '#fa75aa', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Handle type="target" position={Position.Right} isConnectable={isConnectable} />
      <p style={{margin: 0}}>{label}</p>
      <Handle type="source" position={Position.Left} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default NodeCustom;
