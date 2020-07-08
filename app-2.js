// The maze is a square, so i only have one size listen, being the height. The height represents the amount of rowDivs the createWallDivs function should create. The width is the amount of columnDivs in the maze. This maze being a square, i only use one value.




let x = 0;
let y = 0;
let height = 39;
let lastPosition = []
let grid = []

function setMazeSize(){
    let maze = document.querySelector('.maze');
    maze.style.width = height*20+'px';
    maze.style.height = height*20+'px'
}

setMazeSize()

function createWallDivs(){
    let maze = document.querySelector('.maze');
    let rows = []

   for (i=0; i<height; i++) {
       const row = [];
       rows.push(row)
    }

    for (i=0; i<rows.length; i++){
        for (j=0; j<rows.length; j++) {

            let column; 
            rows[i].push(column)
        }
    }

    rows.forEach(row=>{
        const rowDiv = document.createElement('DIV');
        rowDiv.className = 'row';
        maze.appendChild(rowDiv);

        row.forEach(()=>{
            const columnDiv = document.createElement('DIV');
            columnDiv.className = 'column';

            rowDiv.appendChild(columnDiv)
        })
    })
 
}
createWallDivs();



function gridData(){
    const rows = document.querySelectorAll('.row')
    if (rows) {
        rows.forEach(e=>{
            grid.push(e.children)
        })
    } else {
        throw "Something went wrong!"
    }
}
gridData()

function generateBinaryMaze(){
    const rowsToUse = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37]
    const columnsToUse = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37]
    
    rowsToUse.forEach(row=>{
        columnsToUse.forEach(column=>{  
            grid[row][column].style.backgroundColor = 'blue'
            const divToLeft = Math.random()*2 > 1;
            if (divToLeft) {
                grid[row][column-1].style.backgroundColor = 'blue'
            } else {
                grid[row-1][column].style.backgroundColor = 'blue'
            } 
        })
    })    
}

generateBinaryMaze()

function moveCommands(){

    function moveLeft() {
        if (grid[y][x-1] && grid[y][x-1].style.backgroundColor !== 'blue'){
            x-=1
            lastPosition.push(grid[y][x])
        } 
    }

    function moveRight() {
        if (grid[y][x+1] && grid[y][x+1].style.backgroundColor !== 'blue'){
            x+=1
            lastPosition.push(grid[y][x])
        }   
    }
    
    function moveUp() {
        if (grid[y][x] && grid[y-1][x].style.backgroundColor !== 'blue'){
            y-=1
            lastPosition.push(grid[y][x])
        }
    }
    
    function moveDown() {
        if (grid[y][x] && grid[y+1][x].style.backgroundColor !== 'blue'){
            y+=1
            lastPosition.push(grid[y][x])
        }
    }

    let commands = {
        left: moveLeft,
        right: moveRight,
        up: moveUp,
        down: moveDown
    }
    turnColumnBackToGreen()
    return commands;
}

function turnColumnBackToGreen(){
    for (i=0; i<lastPosition.length; i++){
        lastPosition[i].style.backgroundColor = null;
    }
}

document.addEventListener('keydown', function(event){ //move the player unit
// Color the gridNode that i am on pink. Pink is going to be the player unit. If the node i move into is === 1, then dont move.
    let commands = moveCommands(); //http:rosettacode.org/wiki/Maze_generation#JavaScript

    if (event.keyCode === 37){ // left
        commands.left();
    }

    if (event.keyCode === 38){ // up
        commands.up();
    }

    if (event.keyCode === 39){ // right
        commands.right();
    }

    if (event.keyCode === 40){ // down
        commands.down();
    }

    if (grid[y][x] && grid[y][x].style.backgroundColor !== 'blue'){
        grid[y][x].style.backgroundColor = 'pink';
    }
    
})

