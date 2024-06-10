export default function calculateDijkstra(nodes, edges, startNode) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = [];
  
    nodes.forEach(node => {
      distances[node] = Infinity;
    });
    distances[startNode] = 0;
  
    priorityQueue.push({ node: startNode, distance: 0 });
  
    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.distance - b.distance);
      const { node: currentNode, distance: currentDistance } = priorityQueue.shift();
  
      if (!visited.has(currentNode)) {
        visited.add(currentNode);
  
        for (const edge of edges) {
          if (edge.node1 === currentNode || edge.node2 === currentNode) {
            const neighbor = edge.node1 === currentNode ? edge.node2 : edge.node1;
            const newDistance = currentDistance + edge.weight;
  
            if (newDistance < distances[neighbor]) {
              distances[neighbor] = newDistance;
              priorityQueue.push({ node: neighbor, distance: newDistance });
            }
          }
        }
      }
    }
  
    return distances;
  }