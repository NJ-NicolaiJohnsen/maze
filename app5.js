
// do i want to check if a cell has alreayd been visited?
// i could do it by adding a index to both the edges and the cells
// I dont want to check if an edge has been visited, cause it is being spliced away each time an edge is chosen. So that particular edge cant be chosen again, but because there are more possible combination of edges/cells, that doesnt work, since it would end up removing every single edge.
// So you want some kind of way to track which edges have been removed, and thereby which cells are joined. Every time i remove an edge, i am effectively joining two cells together. i could identify that by pushing cell[edge.y1][edge.x1] && cell[edge.y2][edge.x2] into a tree.
// Now i need to detect if trees contain the same cells.
// If the chosen edge contains a cell equal to a tree, then check if 

let maze = document.getElementById('maze');
const height = 900;
const width = 1500;
const cube = 50 // cell size = 20px by 20px. Hence cube
const rows = height/cube;
const cols = width/cube; 
maze.style.width = width + 'px';
maze.style.height = height + 'px';


class Cell {
    constructor(y, x){
        this.y = y;
        this.x = x;
        this.index = this.y*cols + this.x
        this.weight = Math.random()
    }

    makeCellDivs(){
        this.cellDiv = document.createElement('DIV');
        this.cellDiv.className = 'column';
        this.cellDiv.style.width = cube + 'px';
        this.cellDiv.style.height = cube + 'px';
        this.cellDiv.style.backgroundColor = 'black';
        this.cellDiv.style.borderLeft = '1px solid red';
        this.cellDiv.style.borderTop = '1px solid red'
        return this.cellDiv
    }
}

class Edge {
    constructor(cell1, cell2, direction) {
        this.cell1 = cell1;
        this.cell2 = cell2
        this.direction = direction
        this.weight;
        if (this.cell1.weight < this.cell2.weight){
            this.weight = this.cell1.weight;
        } else {
            this.weight = this.cell2.weight
        }

    }

    removeEdge(){
        // chooses one edge to remove, then colors both sides of the edge white.
        if (this.direction == 'vertical') {
            this.cell2.cellDiv.style.borderTop = 0;
        } else {
            this.cell2.cellDiv.style.borderLeft = 0;
        }
        this.cell1.cellDiv.style.backgroundColor = null;
        this.cell2.cellDiv.style.backgroundColor = null;
    }
}

class Tree {
    constructor(){
        this.cells = [];
        this.weight;
    }
}

let cells = [];

for (let y = 0; y < rows; y++){
    cells[y] = document.createElement('DIV');
    maze.appendChild(cells[y]);
    for (let x = 0; x < cols; x++){
        cells[y][x] = new Cell(y, x);
        cells[y].appendChild(cells[y][x].makeCellDivs())
    }
}

let edges = [];
// pushes all edges into a single array, excluding the last row and column of the the grid
for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
        if (y < rows-1){
            edges.push(new Edge(cells[y][x], cells[y+1][x], 'vertical'))
        }
        if (x < cols-1) {
            edges.push(new Edge(cells[y][x], cells[y][x+1], 'horizontal'))
        }

    }
}


function chooseEdgeToRemove(){
    let randomIndex = Math.floor(Math.random()*edges.length);
    let edge = edges[randomIndex]
    edges.splice(randomIndex, 1)

    return edge;
}

let usedEdges = []
function setWeight(){
    let edge = chooseEdgeToRemove()
    let doNothing = null;
    let analyseWeight = false;
    let removeEdge = false;
    let collisionIndex;
    if (usedEdges.length == 0) {
        removeEdge = true;
    } else {
        usedEdges.forEach(usedEdge=>{
            
            if (usedEdge.cell1 != edge.cell1 && usedEdge.cell2 != edge.cell2) {
                removeEdge = true; // The new edge doesnt collide with an existing edge
            } else if (usedEdge.cell2 != edge.cell1 && usedEdge.cell1 != edge.cell2){
                removeEdge = true; // The new edge doesnt collide with an existing edge

                // UNDER HERE --- the new edge collides with an existing edge.
            } else if (usedEdge.cell2 == edge.cell2 && usedEdge.cell1 != edge.cell1) {
                analyseWeight = true
                collisionIndex = usedEdges.indexOf(usedEdge)
              
            } else if (usedEdge.cell1 == edge.cell2 && usedEdge.cell2 != edge.cell1) {
                analyseWeight = true;
                collisionIndex = usedEdges.indexOf(usedEdge)
                
            } else if (usedEdge.cell2 == edge.cell1 && usedEdge.cell1 != edge.cell2) {
                analyseWeight = true;
                collisionIndex = usedEdges.indexOf(usedEdge)
               
            } else if (usedEdge.cell1 == edge.cell1 && usedEdge.cell2 != edge.cell2) {
                analyseWeight = true;
                collisionIndex = usedEdges.indexOf(usedEdge)
               
            } else {
                return doNothing;
            }
        })
    }
    
    if (analyseWeight == true) {

        if (edge.weight < usedEdges[collisionIndex].weight) {
            usedEdges.forEach(usedEdge=>{
                // see if there are any other usedEdges with the same weight as the collisionIndex
                // that is effectively a tree
                if (usedEdge.weight == usedEdges[collisionIndex].weight) {
                    usedEdge.weight = edge.weight
                    console.log(usedEdge.weight)
                    // check for tree collision
                } else if (edge.cell1.weight ==  usedEdge.cell1.weight && 
                  edge.cell2.weight == usedEdge.cell2.weight) {
                    console.log(edge.cell1.weight)
                }
            })
            removeEdge = true;
        } else if (edge.weight > usedEdges[collisionIndex].weight) {
            edge.weight = usedEdges[collisionIndex].weight;
            removeEdge = true;
        } else { // if both edges are equal in weight
            removeEdge = false;
        }
    }
    console.log(edge.weight)
    if (removeEdge == true) {
        edge.removeEdge()
        usedEdges.push(edge)
        //console.log(edge)
    }

  

}




let usedWeights = [];
function compareWeights() {
    setWeight()
   // console.log(usedEdges)
    usedWeights.push(usedEdges[usedEdges.length-1].weight)
    const areAllWeightsEqual = arr => arr.every(value => value == arr[0]) // returns a boolean value
    

  //  console.log(areAllWeightsEqual(usedWeights))
  //  console.log(usedEdges)
/*
    if (usedWeights.length == 0) {
        setWeight()
    } else {   
        while (areAllWeightsEqual(usedWeights) == false){
            setWeight()
        }
    }
*/


    
}



for (let i = 0; i < 6; i++) {
    compareWeights()
}










let trees = [];

function makeTree(){
    let edge = chooseEdgeToRemove()
    
    let makeNewTree = null;
    let treeIndex;
    if (trees.length == 0) {
        makeNewTree = true;
    } else {
        // check for cell connection and tree connection to existing trees
        trees.forEach(tree=>{
            tree.cells.forEach(cell=>{
                if (cell == edge.cell1 && cell != edge.cell2) {
                    treeIndex = trees.indexOf(tree);
                    makeNewTree = false;
                } 
                else if (cell == edge.cell2 && cell != edge.cell1) {
                    treeIndex = trees.indexOf(tree);
                    makeNewTree = false;
                    
                } 
                else {
                    makeNewTree = true;
                    
                }
                
            })
        })
    }

    if (makeNewTree == true) {
        let newTree = new Tree()
        newTree.cells.push(edge.cell1, edge.cell2)
        newTree.weight = edge.weight
        trees.push(newTree)

    } else {
        trees[treeIndex].cells.push(edge.cell1, edge.cell2)

         if (edges.weight < trees[treeIndex].weight) {
            trees[treeIndex].weight = edges.weight
        }
    }
    
    return edge;
    //requestAnimationFrame(makeTree)
}

function detectTreeCollision(){
    let edge = makeTree();

    trees.forEach(tree=>{
        tree.cells.forEach(cell=>{
            let index = tree.cells.indexOf(cell);
            
        })
    })

    edge.removeEdge()
    //requestAnimationFrame(detectTreeCollision)
}

//detectTreeCollision()




