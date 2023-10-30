import React from 'react';
import { getStraightPath, Position, Node } from 'reactflow';

import { getEdgeParams } from './utils'; // .js から .ts に変更する場合は拡張子は不要です

interface FloatingConnectionLineProps {
  toX: number;
  toY: number;
  fromPosition: Position;
  toPosition: Position;
  fromNode: Node;
}

const FloatingConnectionLine: React.Component<FloatingConnectionLineProps> = ({ toX, toY, fromPosition, toPosition, fromNode }) => {
  if (!fromNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    width: 1,
    height: 1,
    positionAbsolute: { x: toX, y: toY }
  };

  const { sx, sy } = getEdgeParams(fromNode, targetNode);
  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: toX,
    targetY: toY
  });

  console.log(edgePath)

  return (
      <g>
        <path
            fill="none"
            stroke="#222"
            strokeWidth={1.5}
            className="animated"
            d={edgePath}
        />
        <circle
            cx={toX}
            cy={toY}
            fill="#fff"
            r={3}
            stroke="#222"
            strokeWidth={1.5}
        />
      </g>
  );
}

export default FloatingConnectionLine;
