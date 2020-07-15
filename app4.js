
let maze = document.getElementById('maze');
const height = 900;
const width = 1500;
const cube = 50 // cell size = 20px by 20px. Hence cube
const yRows = height/cube;
const cols = width/cube; 
maze.style.width = width + 'px';
maze.style.height = height + 'px';   

class Cell {
    constructor(y, x) {
        this.x = x,
        this.y = y
        this.index = this.y*cols + this.x;
        this.visited = false;
        this.weight = Math.random();
    }

    borderControl(){
        this.borders = {}
        if (this.borderToTheRight) {
            this.borders.borderRight = 1;
            this.borders.borderBottom = 1;
        } else {
            this.borders.borderRight = 0;
            this.borders.borderBottom = 1;
        }
        return this.borders;
    }
}


let cells = []; // these are the grid-items, nesten arrays
for (let y = 0; y< yRows; y++) {
    cells[y] = []
    for (let x = 0; x < cols; x++){
        cells[y][x] = new Cell(y, x)
    }
}

let potentialWalls = [];

for (let y = 1; y < yRows; y++) {
    for (let x = 0; x< cols; x++) {

        potentialWalls.push([cells[y][x], cells[y-1][x]])
    }
}

for (let y = 0; y < yRows; y++) {
    for (let x = 1; x < cols; x++) {
        potentialWalls.push([cells[y][x], cells[y][x-1]])
    }
}



function drawPotentials(){
    
    let rows = [];
    for (let y = 0; y < cells.length; y++) {
        rows[y] = document.createElement('DIV');
        maze.appendChild(rows[y]);
        for (let x = 0; x<cells[y].length; x++) {
            rows[y][x] = document.createElement('DIV');
            rows[y][x].className = 'column';
            rows[y][x].style.width = cube+'px';
            rows[y][x].style.height = cube+'px';
            rows[y][x].style.backgroundColor = 'black'
            rows[y].appendChild(rows[y][x])
        }
    }

    let rowArray = []
    for (let i=0; i<yRows; i++){
        for (let j = 0; j< cols; j++){
            rowArray.push(rows[i][j])
        }
    }

    let cellArray = [];
    for (let y = 0; y<cells.length; y++){
        for (let x = 0; x< cells[y].length; x++){
            
            cellArray.push(cells[y][x])
        }
    }

    function checkColor(cell) {
        return cell.style.backgroundColor !== null;
    }

   // console.log(rowArray.every(checkColor))

  
   let inUse = [];
   
   function func1(){
       //remember about the weight
       // let walls = [...potentialWalls];
        let twoCells = potentialWalls[Math.floor(Math.random()*potentialWalls.length)]
        inUse.push(twoCells)
        let coordinates = {}
        let cell1 = inUse[inUse.length-1][0]
        let cell2 = inUse[inUse.length-1][1]
     
        // use the last item inside the inUse array
        if (cellArray[twoCells[0].index].visited == false || cellArray[twoCells[1].index].visited == false){
         
            let removalIndex = potentialWalls.indexOf(twoCells)
            potentialWalls.splice(removalIndex, 1)
          
            coordinates.x2 = cell2.x,
            
            coordinates.y2= cell2.y,
            coordinates.x1= cell1.x,
            coordinates.y1= cell1.y
           console.log(removalIndex)
           cellArray[cell1.index].visited = true;
           cellArray[cell2.index].visited = true;
        }
        console.log(cellArray[cell1.index].visited, cellArray[cell2.index].visited)
      // requestAnimationFrame(func1)
        return coordinates;

    }
    //func1()

    function draw(){
        let coord = func1()
        let x1 = coord.x1;
        let y1 = coord.y1;
        let x2 = coord.x2;
        let y2 = coord.y2;
        //console.log(y1)
        if (x1 == x2) {
            if (rows[y2]){

                rows[y2][x2].style.borderBottom = 0;
            }
            
        } else {
            rows[y2][x2].style.borderRight = 0;
        }

        if (rows[y1]){
            rows[y1][x1].style.backgroundColor = null;
            rows[y2][x2].style.backgroundColor = null

        }
        
       
        requestAnimationFrame(draw)
        
    }

   draw()
  
   
   

   // console.log(inUse[inUse.length-1][0].index )
}
drawPotentials()








function draw() {
    maze.innerHTML = null;
    let rows = [];
    for (let y = 0; y < cells.length; y++) {
        rows[y] = document.createElement('DIV');
        maze.appendChild(rows[y]);
        for (let x = 0; x<cells[y].length; x++) {
            rows[y][x] = document.createElement('DIV');
            rows[y][x].className = 'column';
            rows[y][x].style.width = cube+'px';
            rows[y][x].style.height = cube+'px';
            rows[y][x].style.backgroundColor = 'black'
            rows[y].appendChild(rows[y][x])
        }
    }
    
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
 
    // One long array containing all the cell objects
    let cellArray = [];
    for (let y = 0; y<cells.length; y++){
        for (let x = 0; x< cells[y].length; x++){
            
            cellArray.push(cells[y][x])
        }
    }
    let inUse = [];


    function func4(){
        
        let randIndex2
        let randIndex1 = getRandomArbitrary(0, cellArray.length);
        if (Math.random()*2>1){
            randIndex2 = randIndex1 - 1;
        } else {
            randIndex2 = randIndex1 - cols;
        }
        
        let index;
        if (cellArray[randIndex2] == undefined || cellArray[randIndex1].weight > cellArray[randIndex2].weight) {
            index = randIndex1;
        } else {
            index = randIndex2;
        }
        
        
        /*
        let index;
        for (let i = 0; i< cellArray.length; i++) {
            if (cellArray[index] == undefined || cellArray[i].weight > cellArray[index].weight) {
                index=i
                
            } 
        }
        
        */

        let x1 = cellArray[index].x
        let y1 = cellArray[index].y
        
        let x2;
        let y2;
        let borderToRight = Math.random()*2>1;
        
        if (borderToRight) {
            if (cells[y1][x1+1] == undefined || cells[y1][x1-1] == undefined || cells[y1][x1+1].weight < cells[y1][x1-1].weight){
                x2 = x1+1;
                y2 = y1;
            } else {
                x2 = x1-1;
                y2 = y1;
            }
          
            if (rows[y2] && rows[y2][x2] != undefined){
                rows[y2][x2].style.borderRight = '0px';
                
                rows[y1][x1].style.backgroundColor = null;
                rows[y2][x2].style.backgroundColor = null;
                inUse.push(cellArray.splice(index, 1))
            } 
        } else {
            if (cells[y1-1] == undefined || cells[y1+1] == undefined || cells[y1+1][x1].weight < cells[y1-1][x1].weight){
                x2 = x1;
                y2 = y1+1
            } else {
                x2 = x1;
                y2 = y1-1
            }
            
            if (rows[y2] && rows[y2][x2] != undefined){
                
                rows[y2][x2].style.borderBottom = '0px'
                rows[y1][x1].style.backgroundColor = null;
                rows[y2][x2].style.backgroundColor = null;
                inUse.push(cellArray.splice(index, 1))
            } 
        }

        requestAnimationFrame(func4)
    }

    
    func4()
    
}
//draw();



