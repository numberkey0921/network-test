import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  DefaultEdgeOptions,
  NodeTypes,
  EdgeTypes,
  MarkerType
} from "reactflow";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

import CustomNode from "./CustomNode";
import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';

const initialNodes: Node[] = Array.from({ length: 50 }).map((_, index) => {
  return {
    id: `node-${index}`,
    type: 'custom',
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    data: { label: `Node ${index}` },
  };
});

const initialEdges: Edge[] = Array.from({ length: 49 }).map((_, index) => {
  return {
    id: `edge-${index}`,
    type: 'floating',
    source: `node-${index}`,
    target: `node-${index + 1}`,
    data: { label: `Edge from node-${index} to node-${index + 1}` },
  };
});

const simulation = forceSimulation(initialNodes)
  .force('link', forceLink().id(d => (d as Node).id).links(initialEdges))
  .force('charge', forceManyBody().strength(-100))
  .force('center', forceCenter(250, 250));


for (let i = 0; i < 300; ++i) simulation.tick();

const simulationNodes = simulation.nodes();

const updatedNodes: Node[] = initialNodes.map(node => {
  const simNode = simulationNodes.find(n => n.id === node.id);
  
  return {
    ...node,
    position: { x: simNode?.x || 0, y: simNode?.y || 0 }
  };
});
console.log(updatedNodes, initialNodes, initialEdges);

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  floating: FloatingEdge,
};

const initialEdges2: Edge[] = Array.from({ length: 49 }).map((_, index) => {
  return {
    id: `edge-${index}`,
    type: 'floating',
    source: `node-${index}`,
    target: `node-${index + 1}`,
    data: { label: `Edge from node-${index} to node-${index + 1}` },
  };
});

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(updatedNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges2);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)),
    [setEdges]
  );
  

  return (
    <div className="floatingedges">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionLineComponent={FloatingConnectionLine}
    >
      <Background/>
    </ReactFlow>
    </div>
  );
}

export default Flow;
