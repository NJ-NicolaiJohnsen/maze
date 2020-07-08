// The maze is a square, so i only have one size listen, being the height. The height represents the amount of rowDivs the createWallDivs function should create. The width is the amount of columnDivs in the maze. This maze being a square, i only use one value.
// 1. track the current position, and pass the current position on to the last position, when issuing a move command. Then style all the lastPosition coordinates to green.

// 2. Generate a binary maze
/*
function generateBinaryMaze() {
    // 10 ROWS OF 10 DIVS
    // 1. go to a div
    // 2. color either the div to the right blue, or the div below blue
    // 3. skip a div
    // 4. repeat

    const currentRow = // get the nth child of the maze
    const divsYoullUse = // get divs 0, 2, 4, 6, 8 etc
    for (const div in divsYoullUse) {  // div is 
        const wallIsToTheRight = Math.random() * 2 > 1
        if (wallIsToTheRight) {
            const divToTheRight = currentRow[divIndex + 1]
            divToTheRight.style.backgroundColor = "blue"
            recordOfWallCoords.push([index, divIndex + 1])
        } else {
            const divBelow = maze.children[index + 1].children[divIndex]
            divBelow.style.backgroundColor = "blue"
            recordOfWallCoords.push([index + 1, divIndex])
        }
    }
}
*/


let xAxis = 0;
let yAxis = 0;
let height = 800/20;

let currentPosition = {x: 0, y: 0}
let lastPosition = {x: xAxis, y: yAxis}



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
            const becomesBlue = Math.random() * 2 > 1.5;
            if (becomesBlue){
                column = 1;
            } else {
                column = 0;
            }
            
            rows[i].push(column)
        }
    }

    rows.forEach(row=>{
        const rowDiv = document.createElement('DIV');
        rowDiv.className = 'row';
        maze.appendChild(rowDiv);

        row.forEach(column=>{
            const columnDiv = document.createElement('DIV');
            columnDiv.className = 'column';

            if (column === 1) {
                columnDiv.style.backgroundColor = 'blue'
            }

            rowDiv.appendChild(columnDiv)
        })
    })
 
}
createWallDivs();

let gridCoordinates = []

function gridData(){
    const grid = [];
    const rows = document.querySelectorAll('.row')
    if (rows) {
        rows.forEach(e=>{
            grid.push(e.children)
            gridCoordinates.push(e.children)
        })
    } else {
        throw "Something went wrong!"
    }
}
gridData()

// if coordinate === 1, not passable

console.log(gridCoordinates)

function moveCommands(){
    let grid = gridData(yAxis, xAxis)

    function moveLeft(x) {
        if (grid.style.backgroundColor !== 'blue'){
            xAxis-=x;
        } else {
            xAxis+=x;
        }    
    }
    
    function moveRight(x) {

        if (grid.style.backgroundColor !== 'blue'){
            xAxis+=x
        } else {
           xAxis-=x;
        }    
    }
    
    function moveUp(y) {
       
        
        if (grid.style.backgroundColor !== 'blue'){
            yAxis-=y;
            
        } else {
            yAxis+=y;
        }    
    }
    
    function moveDown(y) {
        if (grid.style.backgroundColor !== 'blue'){
            yAxis+=y;
            
        } else {
           yAxis-=y;
        }    
    }

    let commands = {
        left: moveLeft,
        right: moveRight,
        up: moveUp,
        down: moveDown
    }

    return commands;
}


document.addEventListener('keydown', function(event){ //move the player unit
// Color the gridNode that i am on pink. Pink is going to be the player unit. If the node i move into is === 1, then dont move.
    let commands = moveCommands(); //http:rosettacode.org/wiki/Maze_generation#JavaScript



    if (xAxis < 0){xAxis = 0}
    if (xAxis > height){xAxis = height}
    if (yAxis <= 0){yAxis = 0}
    if (yAxis > height){yAxis = height}

    if (event.keyCode === 37){ // left
        commands.left(1);
    }

    if (event.keyCode === 38){ // up
        commands.up(1);
    }

    if (event.keyCode === 39){ // right
        commands.right(1);
    }

    if (event.keyCode === 40){ // down
        commands.down(1);
    }


    let grid = gridData(yAxis, xAxis)
    if (grid.style.backgroundColor !== 'blue'){
        grid.style.backgroundColor = 'pink';
    }
    
    console.log(yAxis, xAxis)
    
})

