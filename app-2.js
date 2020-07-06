// The maze is a square, so i only have one size listen, being the height. The height represents the amount of rowDivs the createWallDivs function should create. The width is the amount of columnDivs in the maze. This maze being a square, i only use one value.
let xAxis = 0;
let yAxis = 0;
let height = 40;

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
       let row = [];
       rows.push(row)
    }
    for (i=0; i<rows.length; i++){
        for (j=0; j<rows.length; j++) {

            let column;
            if (Math.random()*2 > 1.9){
                column = 1;
            } else {
                column = 0;
            }
            
            rows[i].push(column)
        }
    }

    rows.forEach(row=>{
        let rowDiv = document.createElement('DIV');
        rowDiv.className = 'row';
        maze.appendChild(rowDiv);

        row.forEach(column=>{
            let columnDiv = document.createElement('DIV');
            columnDiv.className = 'column';

            if (column === 1) {
                columnDiv.style.backgroundColor = 'blue'
            }

            rowDiv.appendChild(columnDiv)
        })
    })
 
}
createWallDivs();



function gridData(y, x){
    let grid = [];
    let rows = document.querySelectorAll('.row')

    rows.forEach(e=>{
        grid.push(e.children)

    })

    if (grid[y][x].style.backgroundColor !== 'blue'){
        grid[y][x].style.backgroundColor = 'pink';
    }

    return grid[y][x]
}

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
    let commands = moveCommands();


    if (xAxis < 0){xAxis = 0}
    if (xAxis > height){xAxis = height}
    if (yAxis < 0){yAxis = 0}
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
    

    console.log(yAxis, xAxis)
    
})

