export default function calculateDijkstra(nodes, edges, startNode) {
  const distances = {};
  const visited = new Set();
  const priorityQueue = [];
  const pathEdges = [];

  // Inicializa todas las distancias como infinito
  nodes.forEach(node => {
    distances[node] = Infinity;
  });

  // Verifica si el nodo inicial está en el formato esperado
  const formattedStartNode = nodes.find(node => node.includes(startNode));
  if (!formattedStartNode) {
    console.error('Nodo inicial no encontrado en la lista de nodos');
    return [];
  }

  // La distancia del nodo inicial a sí mismo es 0
  distances[formattedStartNode] = 0;
  priorityQueue.push({ node: formattedStartNode, distance: 0 });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.distance - b.distance);
    const { node: currentNode, distance: currentDistance } = priorityQueue.shift();

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      for (const edge of edges) {
        const { start, end, weight } = edge;
        const neighbor = (start === currentNode) ? end : (end === currentNode) ? start : null;

        if (neighbor && !visited.has(neighbor)) {
          const newDistance = currentDistance + parseInt(weight, 10);

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            priorityQueue.push({ node: neighbor, distance: newDistance });
            pathEdges.push({ start: currentNode, end: neighbor, weight: parseInt(weight, 10) });
          }
        }
      }
    }
  }
  return pathEdges;
}