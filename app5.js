
// do i want to check if a cell has alreayd been visited?
// i could do it by adding a index to both the edges and the cells
// I dont want to check if an edge has been visited, cause it is being spliced away each time an edge is chosen. So that particular edge cant be chosen again, but because there are more possible combination of edges/cells, that doesnt work, since it would end up removing every single edge.
// So you want some kind of way to track which edges have been removed, and thereby which cells are joined. Every time i remove an edge, i am effectively joining two cells together. i could identify that by pushing cell[edge.y1][edge.x1] && cell[edge.y2][edge.x2] into a tree.
// Now i need to detect if trees contain the same cells.
// If the chosen edge contains a cell equal to a tree, then check if 

let maze = document.getElementById('maze');
const height = 250;
const width = 250;
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
        this.weight = Math.random();
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
    constructor(cell1, cell2){
        this.cells = [cell1, cell2];
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

let trees = [];

function makeTree(){
    let edge = chooseEdgeToRemove()
    edge.removeEdge()
    
    if (trees.length == 0) {
        let newTree = new Tree(edge.cell1, edge.cell2)
        trees.push(newTree)
    } else {
        // check for cell connection and tree connection to existing trees
        trees.forEach(tree=>{
            tree.cells.forEach(cell=>{
                if (cell == edge.cell1 && cell != edge.cell2) {
                    tree.cells.push(edge.cell1)
                } 
                else if (cell == edge.cell2 && cell != edge.cell1) {
                    tree.cells.push(edge.cell2)
                }
                else {
                    let newTree = new Tree(edge.cell1, edge.cell2)
                    trees.push(newTree)
                }


            })
        })
        
    }

   
    //requestAnimationFrame(makeTree)
}

makeTree()
makeTree()
makeTree()


console.log(trees)
