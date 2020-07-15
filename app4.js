
let maze = document.getElementById('maze');
const height = 800;
const width = 1000;
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
        this.borderToTheRight = true;
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
        /*
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
        
        */
        
        let index;
        for (let i = 0; i< cellArray.length; i++) {
            if (cellArray[index] == undefined || cellArray[i].weight > cellArray[index].weight) {
                index=i
                
            } 
        }
        
        

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
draw();



