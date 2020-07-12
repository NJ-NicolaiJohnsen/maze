// The maze is a square, so i only have one size listen, being the height. The height represents the amount of rowDivs the createWallDivs function should create. The width is the amount of columnDivs in the maze. This maze being a square, i only use one value.

// Classes are essentially just the layout of an object. That means they are objects-to-be
// The constructor determines which key-value pairs the object has. When you instantiate
// the class, you pass arguments as the parameters of the constructor, and those arguments then
// become the value of the key  - value pairs of the new object.
// Classes also have methods.





















doTheWholeShebang(document.getElementById('sizes').options[0].value/20)


function chooseSize(){
    let height;
    const sizesSelect = document.getElementById('sizes');
    const sizes = sizesSelect.options[sizesSelect.selectedIndex]
    const maze = document.querySelector('.maze');
    height = sizes.value/20
    maze.remove();
    doTheWholeShebang(height)
}


function doTheWholeShebang(height){

    let x = 0;
    let y = 0;
    let lastPosition = []
    let grid = []
    
    function setMazeSize(){
        let maze = document.createElement('div');
        maze.className = 'maze';
        maze.style.width = height*20+'px';
        maze.style.height = height*20+'px'
        document.body.appendChild(maze)
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

        class BinaryMaze {
            constructor(y, x){

                this.yPosition = y;
                this.xPosition = x;
                this.toTheLeft = this.xPosition+1;
                this.isAbove = this.yPosition+1;
                this.wallIsAbove = Math.random()*2 > 1;
            }
    
            orderlyFillOut(){
                grid[this.yPosition][this.xPosition].style.backgroundColor = 'blue';
            }
    
            binaryControl(){
                if (this.wallIsAbove) {
                    grid[this.isAbove][this.xPosition].style.backgroundColor = 'blue';
                } else {
                    grid[this.yPosition][this.toTheLeft].style.backgroundColor = 'blue';
                }
            }

            static pattern(height){
                this.rowsToUse = []
                for (i=1; i<height; i+=2){
                    this.rowsToUse.push(i)
                }
                this.columnsToUse = [];
                for (j = 1; j<height; j+=2){
                    this.columnsToUse.push(j)
                }
                this.coordinates = {
                    xCoord: this.rowsToUse,
                    yCoord: this.columnsToUse,
                }

                return this.coordinates;
            }
    
        }

        console.log(BinaryMaze.pattern(height))
        let wall;
        
        BinaryMaze.pattern(height).yCoord.forEach(row=>{
            BinaryMaze.pattern(height).xCoord.forEach(column=>{
                wall = new BinaryMaze(row, column)
                wall.orderlyFillOut()
                wall.binaryControl()
            })
        })
 
    }

    generateBinaryMaze()

    function moveCommands(){
        //console.log(y, x)
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
            if (grid[y-1] && grid[y-1][x].style.backgroundColor !== 'blue'){
                y-=1
                
                lastPosition.push(grid[y][x])
            }
        }
        
        function moveDown() {
            if (grid[y+1] && grid[y+1][x].style.backgroundColor !== 'blue'){
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

    document.addEventListener('keydown', movePlayer)

    function movePlayer(event){ //move the player unit
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
            console.log(y, x)
    
            if (grid[y][x] && grid[y][x].style.backgroundColor !== 'blue'){
                grid[y][x].style.backgroundColor = 'pink';
            }
    }

    document.addEventListener('DOMContentLoaded', movePlayer(38))
}

