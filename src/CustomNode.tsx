import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';

const TooltipNode = ({ data }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="node-test" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <NodeToolbar isVisible={isVisible} position={data.toolbarPosition}>
        <div>This is a tooltip</div>
      </NodeToolbar>
      <div style={{ padding: 0 }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(TooltipNode);
