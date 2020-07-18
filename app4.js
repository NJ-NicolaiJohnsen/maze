
let maze = document.getElementById('maze');
const height = 900;
const width = 900;
const cube = 50 // cell size = 20px by 20px. Hence cube
const yRows = height/cube;
const cols = width/cube; 
maze.style.width = width + 'px';
maze.style.height = height + 'px';   
let count = 0;

class Cell {
    constructor(y, x) {
        this.x = x,
        this.y = y
        this.index = this.y*cols + this.x;
        this.visited = false;
        this.connectsToCoordinate = []
    }

    makeCellDivs(){
        // Creates the cell-div-elements and returns the element WITHOUT appending it to the DOM
        this.cellDiv = document.createElement('DIV');
        this.cellDiv.className = 'column';
        this.cellDiv.style.width = cube+'px';
        this.cellDiv.style.height = cube+'px';
        this.cellDiv.style.backgroundColor = 'black'
        this.cellDiv.style.borderLeft = '1px solid red';
        this.cellDiv.style.borderTop = '1px solid red'
        return this.cellDiv
    }
}

class ConnectedCells {
    constructor(y1, x1, y2, x2) {
        this.y1 = y1;
        this.x1 = x1;
        this.y2 = y2;
        this.x2 = x2;
        this.wallIsLeft = null;
        this.wallIsAbove = null;
        this.index1 = this.y1*cols + this.x1;
        this.index2 = this.y2*cols + this.x2;
        this.visited = false;
        this.weight = Math.random();
    }

    removeBorder(){
       
        // if Cell-coordinate-2 is above Cell-coordinate-1, then remove the border below Cell-2
        if (this.x1 == this.x2) {
            cells[this.y2][this.x2].cellDiv.style.borderTop = 0;
            this.wallIsAbove = false;
        } else {
            cells[this.y2][this.x2].cellDiv.style.borderLeft = 0;
            this.wallIsLeft = false;
        }
        // change the color of both cell-1 and cell-2 to white
        cells[this.y1][this.x1].cellDiv.style.backgroundColor = null;
        cells[this.y2][this.x2].cellDiv.style.backgroundColor = null;
    }
}
// a tree is a collection of cells making a path.
// The trees here get a weight. Three things can happen when two trees are connected.
// 1. The trees have the same weight, meaning they are already connected, and there do nothing.
// 2. Tree1 has a lower weight than Tree2, and Tree1 absorbs Tree2
// 3. Tree1 has a higher weight than Tree2, and Tree2 then absorbs Tree1.
// When there is only one weight left, stop the function
class Tree {
    constructor(weight) {
        this.weight = weight
        this.path = [];
    }
}

// cells will be referred to when removing borders inside the maze.
let cells = []; // these are the grid-items, nested arrays
for (let y = 0; y< yRows; y++) {
    cells[y] = document.createElement('DIV');
    maze.appendChild(cells[y])
    for (let x = 0; x < cols; x++){    
        cells[y][x] = new Cell(y, x)
        cells[y][x].makeCellDivs();
        cells[y].appendChild(cells[y][x].makeCellDivs())
    }
}

let potentialWalls = [];
for (let y = 0; y < yRows; y++) {
    for (let x = 0; x < cols; x++) {
        if (y < yRows-1){
            potentialWalls.push(new ConnectedCells(y, x, y+1, x));
        }
        if (x < cols-1) {
            potentialWalls.push(new ConnectedCells(y, x, y, x+1));
        }
    }
}




function drawPotentials(){

    // A single array containing all the cells. The index-property of the potentialWalls will be used.
    let cellArray = [];
    for (let i =0; i< yRows; i++){
        for (let j = 0; j< cols; j++){
            cellArray.push(cells[i][j])
        }
    }
   

    let trees = [];

   function getCoordinates(){
        let twoCells = potentialWalls[Math.floor(Math.random()*potentialWalls.length)]
        let removalIndex = potentialWalls.indexOf(twoCells) 
        potentialWalls.splice(removalIndex, 1)
        // use the last item inside the inUse array
      //  if (cellArray[twoCells.index1].visited == false || cellArray[twoCells.index2].visited == false) {
        
        // check the paths within all the trees for coordinates that are equal to the current one - twoCells === current one
        if (trees.length < 1) {
           // console.log(trees)
           twoCells.removeBorder()
            let tree = new Tree(twoCells.weight)
            tree.path.push(twoCells);
            trees.push(tree)
        } else {
            twoCells.removeBorder()
            for (let i = 0; i < trees.length; i++){
                for (let j = 0; j < trees[i].path.length; j++) {
                    if (twoCells.y2 == trees[i].path[j].y2 && twoCells.x2 == trees[i].path[j].x2)   {   
                        if (twoCells.weight != trees[i].weight){
                            if (twoCells.weight < trees[i].weight) {
                               
                                trees[i].weight = twoCells.weight;
                                trees[i].path.push(twoCells)
                              //  break;
                            } else {
                               
                                trees[i].path.push(twoCells)
                              //  break;                  
                            }
                        }
                    } else {
                       
                        let tree = new Tree(twoCells.weight)
                        tree.path.push(twoCells);
                        trees.push(tree)
                       // break;
                    }
                    
                }
            }
        }    
            
           
          
          //  console.log(trees)
      //  }
       
       // requestAnimationFrame(getCoordinates)
    }
    getCoordinates()
    getCoordinates()
    getCoordinates()
 //   getCoordinates()
  //  getCoordinates()
    //getCoordinates()

    
  
    trees.forEach(tree=>{
        console.log(tree)
        tree.path.forEach(obj=>{
            console.log(obj)
        })
    })
 

    
}
drawPotentials()

// now we have an array of arrays containing cells w/ info abt the presence of walls in the cells.
// todo: group cells into their respective trees. how tho...
// solution: attach info about which coordinate the cell connects to into the cell
// then use magic to discover the chains of cells

