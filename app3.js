const canvas = document.getElementById('c1')
const c = canvas.getContext('2d');
canvas.width = window.innerWidth/3;
canvas.height = window.innerHeight/3;
const cube = 20;
const cols = Math.ceil(canvas.width/cube)
const rows = Math.ceil(canvas.height/cube)

c.lineWidth = cube/2;
c.strokeStyle = '#000'
c.fillStyle = "#fff";


// i === rows
// j === columns

class Cell {
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.index = this.j+this.i*rows
        this.inMaze = false;
    }

    show() {
        if (this.inMaze){
            c.fillRect(this.i*20, this.j*20, cube, cube)
        }
    }
}

class Wall {
    constructor(i1, j1, i2, j2) {
        this.i1 = i1;
        this.j1 = j1;
        this.i2 = i2;
        this.j2 = j2;
        this.weight = Math.random();

        if (i1-i2 == 0) {
            let y1 = cells[i1][j1].j*cube+cube/2;
            let y2 = cells[i2][j2].j*cube+cube/2;
            this.x1 = cells[i1][j1].i*cube;
            this.y1 = (y1+y2)/2;
            this.x2 = cells[i1][j1].i*cube+cube;
            this.y2 = this.y1;
        } else {
            let x1 = cells[i1][j1].i*cube+cube/2;
            let x2 = cells[i2][j2].i*cube+cube/2;
            this.x1 = (x1+x2)/2;
            this.y1 = cells[i1][j1].j*cube;
            this.x2 = this.x1;
            this.y2 = cells[i1][j1].j*cube+cube;
        }
    }

    show(){
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();
    }
}


c.lineCap = 'square';

let cells = [];
//rows = y-axis  ++++++++++ cols = x-axis
for (let i = 0; i< cols; i++) {
    cells[i] = [];
    for (let j = 0; j<rows; j++){
        cells[i][j] = new Cell(i, j);
    }
}

let walls = [];
let closed = [];
for (let i = 0; i<cols; i++) {
    for (let j = 0; j<rows; j++) {
        if (i< cols-1) {
            walls.push(new Wall(i, j, i+1, j))
        }
        if (j < rows-1){
            walls.push( new Wall(i, j, i, j+1))
        }
    }
}

let speed = 1;
function draw(){
    for (let a = 0; a<speed; a++){
        while(true){
            
            let index;
            for (let i = 0; i< walls.length; i++) {
                if (walls[index] == undefined || walls[i].weight < walls[index].weight) {
                    index = i;
                   
                }
            }
            let newIndex = cells[walls[index].i1][walls[index].j1].index;
            let oldIndex = cells[walls[index].i2][walls[index].j2].index;

            if (oldIndex != newIndex) {
                cells[walls[index].i1][walls[index].j2].inMaze = true;
                cells[walls[index].i2][walls[index].j2].inMaze = true;

                for (let i = 0; i<cols; i++){
                    for (let j = 0; j < rows; j++) {
                        if (cells[i][j].index == oldIndex) {
                            cells[i][j].index = newIndex;
                        }
                    }
                }

                walls.splice(index,1)
                break;
            } else {
                closed.push(walls[index])
            }
            walls.splice(index, 1)

            if (walls.length == 0) {
                break;
            }
        }

        if (walls.length == 0) {
            break;
        }
    }
    for (let i = 0; i< cols; i++) {
        for (let j = 0; j< rows; j++) {
            cells[i][j].show();
        }
    }

    for (let i = 0; i < walls.length; i++) {
        if (cells[walls[i].i1][walls[i].j1].ineMaze || cells[walls[i].i2][walls[i].j2].ineMaze) {
            walls[i].show();
        }
    }

    for (let i = 0; i< closed.length; i++) {
        closed[i].show();
    }

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(cols*cube, 0);
    c.lineTo(cols*cube, rows*cube);
    c.lineTo(0, rows*cube);
    c.closePath();
    c.stroke();
    
    if (walls.length > 0) requestAnimationFrame(draw);
}

draw()