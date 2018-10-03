/*
  important graph questions:
  directed or undirected
  how will nodes be referenced
  can a node have an edge with itself
  can a node have multiple edges to another node
  what should node value default to
  what should edge value default to
  how should graph handle impossible actions (ignore, warn, throw error, etc)

!!! Todo:
  refactor into generic Graph that takes parameters for above questions
  create a string representation of graph that can import and export
*/

// class for undirected graph
// nodes identified by integers
class UGraph {
  constructor () {
    this.nodes = {};
    this.lastNode = 0;
  }

  // O(1)
  hasNode(node){
    return(undefined !== this.nodes[node]);
  }

  // O(1)
  addNode(value = undefined){
    this.lastNode++;
    this.nodes[this.lastNode] = {
      value: value,
      neighbors: {}
    };
    return(this.lastNode);
  }

  // O(edgeCount)
  removeNode(node){
    this.getNeighbors(node).forEach((x) => {
      this.removeEdge(node, x);
    });
    delete this.nodes[node];
  }


  // creates connection between nodeX and nodeY
  // node cannot have edge with itself
  // O(1)
  addEdge(nodeX, nodeY, value = undefined){
    if (nodeX != nodeY && this.hasNode(nodeX) && this.hasNode(nodeY)){
      this.nodes[nodeX].neighbors[nodeY] = value;
      this.nodes[nodeY].neighbors[nodeX] = value;
    }
  }

  // O(1)
  removeEdge(nodeX, nodeY){
    if (this.hasNode(nodeX) && this.hasNode(nodeY)){
      delete this.nodes[nodeX].neighbors[nodeY];
      delete this.nodes[nodeY].neighbors[nodeX];
    }
  }

  // array: which nodes are adjacent to node
  // O(edgeCount)
  getNeighbors(node){
    return(
      this.hasNode(node) ?
        Object.keys(this.nodes[node].neighbors).map((x) => {
          return(parseInt(x));
        }) : []
    );
  }

  // boolean: is nodeX adjacent to nodeY
  // O(edgeCount)
  isAdjacent(nodeX, nodeY){
    return(-1 < this.getNeighbors(nodeX).indexOf(String(nodeY)));
  }

  // O(1)
  getNodeValue(node){
    return(this.hasNode(node) ? this.nodes[node].value : undefined);
  }

  // O(1)
  setNodeValue(node, value){
    if (this.hasNode(node)){
      this.nodes[node].value = value;
    }
  }

  // O(1)
  getEdgeValue(nodeX, nodeY){
    return(
      (this.hasNode(nodeX) && this.hasNode(nodeY)) ?
        this.nodes[nodeX].neighbors[nodeY] : undefined
    );
  }

  // O(edgeCount)
  setEdgeValue(nodeX, nodeY, value){
    if (this.isAdjacent(nodeX, nodeY)){
      this.nodes[nodeX].neighbors[nodeY] = value;
      this.nodes[nodeY].neighbors[nodeX] = value;
    }
  }
}

