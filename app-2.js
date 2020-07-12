// The maze is a square, so i only have one size listen, being the height. The height represents the amount of rowDivs the createWallDivs function should create. The width is the amount of columnDivs in the maze. This maze being a square, i only use one value.

// Classes are essentially just the layout of an object. That means they are objects-to-be
// The constructor determines which key-value pairs the object has. When you instantiate
// the class, you pass arguments as the parameters of the constructor, and those arguments then
// become the value of the key  - value pairs of the new object.
// Classes also have methods.


// KRUSKAL MAZE ALGORITHM  ---- 
// 1. Give each cell a weight - in my case it is a number. The lower the number, the heavier the weight.
// 2. Randomly select two cells and remove the seperating wall. The new path takes on the number/weight of the cell with the lowest number.
// 3. Continue to randomly select cells and remove walls, again taking on the number of the lowest weight.

// 2.1 How to create and remove walls in this case? 
// 2.2 How access the walls? the grid-array has all the columns i to use. 
// 2.3 How to randomly select a column? Math floor Math random times number of columns?
// 2.3.1 If the columns have the same row-number, then remove a right border.
// 2.3.2 If the columns have the same column-number, then remove the top-border.
// 2.3.3 Now how do i randomly select two columns that are always right next to eachother?
// 2.3.3.1 randomize an x number and a y number between 0 and 19(height);
// 2.3.3.2  I need to randomize two coordinates -- i.e two x-numbers and two y-numbers
// 2.3.3.3 The second coordinate can be based on the first one, and then subtracting either 1 from the y-number or 1 form the x-number.
//2.4 How i do make sure every node has been chosen?
// 2.4.1 The maze is based on a grid, which is made up of y-rows and x-columns.
// 2.4.2 Can i make a list of nodes that have already been chosen, and then only choose nodes that have not yet been chosen randomly.
// 2.4.3 I need to create an array of the grids items.
// 2.4.4 Then i need to randomly select an index of the grid-clone-array. Each time a node i selecten, it should be removed from the array, and pused into another array.
//2.4.4.1 I can use the splice() method for this. It removes an element from a specific array index.




doTheWholeShebang(10)

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
        maze.style.width = height*50+'px';
        maze.style.height = height*50+'px'
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
                let column
                rows[i].push(column)
            }
        }
        let n = 0;
        rows.forEach(row=>{
            const rowDiv = document.createElement('DIV');
            rowDiv.className = 'row';
            maze.appendChild(rowDiv);

            row.forEach(()=>{
                n++
                //console.log(n)
                const columnDiv = document.createElement('DIV');
                columnDiv.className = 'column';
                columnDiv.value = n;
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


    function generateKruskalMaze(){

        let tracker = [];
        /*
        class RandomCoord {
            constructor(height) {
                this.coord1 = {
                    xCoord: Math.floor(Math.random()*height),
                    yCoord: Math.floor(Math.random()*height)
                }
                this.condition = Math.random()*2>1;
                
            }
        
            secondCoord(){
                this.coord2 = {};
                if (this.condition){
                    this.coord2.xCoord = this.coord1.xCoord-1,
                    this.coord2.yCoord = this.coord1.yCoord
                } else {
                    this.coord2.xCoord = this.coord1.xCoord,
                    this.coord2.yCoord = this.coord1.yCoord-1;
                }
                return this.coord2
            }

            wallRemoval(){
                if (grid[this.coord1.yCoord-1] && grid[this.coord1.yCoord][this.coord1.xCoord-1]){

                    if (this.secondCoord().xCoord === this.coord1.xCoord) {
                        if (!tracker.includes(grid[this.coord1.yCoord][this.coord1.xCoord].value)){
                            
                            grid[this.coord1.yCoord][this.coord1.xCoord].style.borderRight ='0px';
                            
                            tracker.push(grid[this.coord1.yCoord][this.coord1.xCoord].value)
                        }
                    } else {
                        if (!tracker.includes(grid[this.secondCoord().yCoord][this.secondCoord().xCoord].value)){

                            grid[this.secondCoord().yCoord][this.secondCoord().xCoord].style.borderBottom = '0px';
                            
                            tracker.push(grid[this.secondCoord().yCoord][this.secondCoord().xCoord].value)
                        }
                    }
                }
            }
        }

        let randXY;
        
        for (i = 0; i < height; i++){
            for (j=0; j < height; j++){
                if (Math.random()*2>1){
                    grid[i][j].style.borderBottom = '0px'
                } else {
                    grid[i][j].style.borderRight = '0px'
                }
                
            }
        }
        */
        let gridArray = [];
        

        
        for (i=0; i<grid.length; i++){
            for (j=0; j<grid.length; j++){
                gridArray.push(grid[i][j])
            }
        }

        //function arrayRemove(arr, value) {
        //    return arr.filter(function(ele){ return ele != value; });
       // }
        // arrayRemove(gridArray, gridArray[Math.floor(Math.random()*gridArray.length)])

        let newArray = [];
        function chooseRandom(){
            //for (i=0; i<gridArray.length; i++){
                
                let random = Math.floor(Math.random()*gridArray.length);
                let fun = gridArray[random]
                let index = gridArray.indexOf(fun)
                let deletes = gridArray.filter(func=>func)
                console.log(deletes)
            //}
            
            
           
        }
        chooseRandom()

      
    }
    generateKruskalMaze()

/*
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
*/
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

    document.addEventListener('keydown', function(event){
        let commands = moveCommands();

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

}
