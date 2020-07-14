
let maze = document.getElementById('maze');
const height = 500;
const width = 900;
const cube = 20 // cell size = 20px by 20px. Hence cube
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


let cells = [];

for (let i = 0; i< yRows; i++) {
    cells[i] = []
    for (let j = 0; j < cols; j++){
        cells[i][j] = new Cell(i, j)
    }
}


function draw() {
    maze.innerHTML = null;
    let rows = [];
    for (let i = 0; i < cells.length; i++) {
        rows[i] = document.createElement('DIV');
        maze.appendChild(rows[i]);
        for (let j = 0; j<cells[i].length; j++) {
            rows[i][j] = document.createElement('DIV');
            rows[i][j].className = 'column';
            rows[i].appendChild(rows[i][j])
        }
    }
    
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
 

    let cellArray = [];
    for (let i = 0; i<cells.length; i++){
        for (let j = 0; j< cells[i].length; j++){
            
            cellArray.push(cells[i][j])
        }
    }
    let inUse = [];
    function func4(){


        let randIndex = getRandomArbitrary(0, cellArray.length);
        let x1 = cellArray[randIndex].x
        let y1 = cellArray[randIndex].y
       
        let x2;
        let y2;
        let borderToRight = Math.random()*2>1;
        if (borderToRight) {
            x2 = x1-1;
            y2 = y1;
            if (rows[y2] && rows[y2][x2] != undefined){
                rows[y2][x2].style.borderRight = '0px';
                
                rows[y1][x1].style.backgroundColor = 'whitesmoke';
                rows[y2][x2].style.backgroundColor = 'whitesmoke';
                inUse.push(cellArray.splice(randIndex, 1))
            } 
        } else {
            x2 = x1;
            y2 = y1-1
            if (rows[y2] && rows[y2][x2] != undefined){
                rows[y2][x2].style.borderBottom = '0px'
                
               
                rows[y1][x1].style.backgroundColor = 'whitesmoke';
                rows[y2][x2].style.backgroundColor = 'whitesmoke';
                inUse.push(cellArray.splice(randIndex, 1))
            } 
        }

        requestAnimationFrame(func4)
    }
    func4()
    
}
draw();
