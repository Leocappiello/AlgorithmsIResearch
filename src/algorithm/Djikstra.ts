export default function calculateDijkstra(nodes, edges, startNode, endNode) {
  const distances = {};
  const previousNodes = {};
  const visited = new Set();
  const priorityQueue = [];

  // Inicializa todas las distancias como infinito
  nodes.forEach(node => {
    distances[node] = Infinity;
    previousNodes[node] = null;
  });

  // Verifica si el nodo inicial y final están en el formato esperado
  const formattedStartNode = nodes.find(node => node.includes(startNode));
  const formattedEndNode = nodes.find(node => node.includes(endNode));
  if (!formattedStartNode || !formattedEndNode) {
    console.error('Nodo inicial o final no encontrado en la lista de nodos');
    return [];
  }

  // La distancia del nodo inicial a sí mismo es 0
  distances[formattedStartNode] = 0;
  priorityQueue.push({ node: formattedStartNode, distance: 0 });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.distance - b.distance);
    const { node: currentNode, distance: currentDistance } = priorityQueue.shift();

    // Si se ha alcanzado el nodo final, se puede detener el algoritmo
    if (currentNode === formattedEndNode) break;

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      for (const edge of edges) {
        const { start, end, weight } = edge;
        const neighbor = (start === currentNode) ? end : (end === currentNode) ? start : null;

        if (neighbor && !visited.has(neighbor)) {
          const newDistance = currentDistance + parseInt(weight, 10);

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previousNodes[neighbor] = currentNode;
            priorityQueue.push({ node: neighbor, distance: newDistance });
          }
        }
      }
    }
  }

  // Construye la ruta más corta desde el nodo inicial al nodo final
  const shortestPath = [];
  let currentNode = formattedEndNode;
  while (currentNode && currentNode !== formattedStartNode) {
    const previousNode = previousNodes[currentNode];
    if (previousNode) {
      const edge = edges.find(e => 
        (e.start === previousNode && e.end === currentNode) ||
        (e.start === currentNode && e.end === previousNode)
      );
      if (edge) {
        shortestPath.unshift({
          start: previousNode,
          end: currentNode,
          weight: edge.weight
        });
      }
    }
    currentNode = previousNode;
  }

  if (!shortestPath.length) {
    console.error('No se encontró una ruta válida entre los nodos especificados');
    return [];
  }

  return shortestPath;
}