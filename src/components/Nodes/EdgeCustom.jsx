import React from 'react';
import { EdgeProps, getStraightPath } from "reactflow";

const DEFAULT_EDGE_STYLES = {};
export const HIGHLIGHTED_EDGE_STYLES: React.CSSProperties = {
  filter: "drop-shadow( 0px 3px 1px rgba(0, 0, 0, .9))"
};

export const EdgeCustom = React.memo((edgeInfo: EdgeProps) => {
    const [edgePath] = getStraightPath({
      sourceX: edgeInfo.sourceX,
      sourceY: edgeInfo.sourceY,
      targetX: edgeInfo.targetX,
      targetY: edgeInfo.targetY
    });

    const handleClickEdge = (a) => {
      console.log('clickea3', a);
    }
    console.log(`RENDER - edgeinfo`, edgeInfo);
    return (
      <div>
        <path
          className="react-flow__edge-path"
          data-edgeid={edgeInfo.id}
          style={{ ...DEFAULT_EDGE_STYLES }}
          onClick={handleClickEdge}
          onMouseOver={(event) => {
            const edge = event.target as HTMLElement;
            console.log(`[CustomEdge]`, edge);
            edge.style.filter = "drop-shadow( 0px 3px 5px rgba(0, 0, 0, .9))";
          }}
          onMouseLeave={(event) => {
            const edge = event.target as HTMLElement;
            edge.style.filter = "";
          }}
          d={edgePath}
          markerEnd={edgeInfo.markerEnd}
        />
        <text>
          <textPath
            href={`#${edgeInfo.id}`}
            style={{ fontSize: "12px" }}
            startOffset="50%"
            textAnchor="middle"
          >
            {/* {edgeInfo.data.text} */}
            test
          </textPath>
        </text>
      </div>
    );
  });
  

export default EdgeCustom