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




doTheWholeShebang(19)

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


    /*
    function generateKruskalMaze(){
        for (let i = 0; i<grid.length; i++){
            grid[grid.length-1][i].style.borderBottom = '0px'
            grid[i][grid[i].length-1].style.borderRight = '0px'
            for (let j=0; j<grid[i].length; j++){
                grid[i][j].style.backgroundColor = 'blue';
            }
        }
// create an identical array to the global grid, so i dont modify the global grid, yet i am still able to work with the grids items inside this function. That is the logic anyways
        let gridArray = [];
        for (let i=0; i < grid.length; i++){
            for (let j=0; j<grid[i].length; j++){
                gridArray.push(grid[i][j])
            }
            
        }

        let tracker = [];
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function removeWall(index1, index2){
            if (gridArray[index1]){
                gridArray[index1].style.backgroundColor = null;
            }

            /*gridArray[index2].style.backgroundColor = null;

            if (index2 > index1-2){
                gridArray[index2].style.borderBottom = '0px';
            } else {
                gridArray[index2].style.borderRight = '0px';
            }
            
        }

        function twoRandomIndexes(){
            const index1 = Math.floor(getRandomArbitrary(height, gridArray.length));
            const condition = Math.random()*2>1;
            //const index2 = condition ? index1-1 : index1-height
            
            //console.log("one",gridArray[index1], "two", gridArray[index2])
            // console.log(index1)
            gridArray.splice(gridArray[index1], 1)
           // gridArray.splice(gridArray[index2], 1)
            removeWall(index1);
        }

        for (let i = (gridArray.length-1); i>=0; i--){
            twoRandomIndexes()
        }





















        class RandomCoord {
            constructor() {
                this.coord1 = {
                    xCoord: Math.floor(getRandomArbitrary(0, gridArray.length)),
                    yCoord: Math.floor(getRandomArbitrary(1, gridArray.length))
                }

                this.condition = Math.random()*2>1;
                this.coord2 = {}

                if (this.condition){
                    this.coord2.xCoord = this.coord1.xCoord-1,
                    this.coord2.yCoord = this.coord1.yCoord
                } else {
                    this.coord2.xCoord = this.coord1.xCoord,
                    this.coord2.yCoord = this.coord1.yCoord-1;
                }
            }
        
            wallRemoval(){
               
                


                if (gridArray[this.coord2.yCoord] && gridArray[this.coord2.yCoord][this.coord2.xCoord]){
                    gridArray[this.coord1.yCoord][this.coord1.xCoord].style.backgroundColor = null;
                    gridArray[this.coord2.yCoord][this.coord2.xCoord].style.backgroundColor = null;
                    if (this.coord2.yCoord == this.coord1.yCoord) {
                            
                        gridArray[this.coord2.yCoord][this.coord2.xCoord].style.borderRight ='0px';
                        
                    } else {
                        gridArray[this.coord2.yCoord][this.coord2.xCoord].style.borderBottom = '0px';
                        
                       
                    }
                   // gridArray.splice(gridArray[this.coord1.yCoord][this.coord1.xCoord], 1)
                    //gridArray.splice(gridArray[this.coord2.yCoord][this.coord2.xCoord], 1)
                }
            }
        }

        let ting;
        for (let i = 0; i< gridArray.length; i++){
            for (let j = 0; j<gridArray[i].length; j++){
                ting = new RandomCoord()
                ting.wallRemoval()
            }
            
        }
        
       
        
    }
    generateKruskalMaze()
      
      */

    
     function kruskalMaze(){

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        let gridArray = [];
        for (let i = 0; i< grid.length; i++){
           
            for (let j = 0; j<grid[i].length; j++){
                gridArray.push(grid[i][j])
            }
        }
        
        // what do i want to do now? I want to randomly pick an index of the array, then style that index, and remove it.
        // that can be accomplished by first removing it, then styling it.

        let removedItems;

        function randomlyChooseIndex(){
            const randomIndex = Math.floor(getRandomArbitrary(0, gridArray.length))
            let condition = Math.random()*2>1;
           // const index2 = condition? randomIndex-1 : randomIndex - height;

            //console.log(index2)

            if (condition){
                gridArray[randomIndex].style.borderRight = '0px';
            } else {
                gridArray[randomIndex].style.borderBottom = '0px'
            }
            
            gridArray.splice(randomIndex, 1)
            //gridArray.splice(index2, 1)
            return gridArray[randomIndex]
        }

        let x = setInterval(function(){
            randomlyChooseIndex();
            if (randomlyChooseIndex() == undefined){
                //clearInterval(x)
                throw "Error"
               
            }
        }, 100)

        
  


       // console.log(removedItems)




    }

    
    kruskalMaze()
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
                for (i=0; i<height; i++){
                    this.rowsToUse.push(i)
                }
                this.columnsToUse = [];
                for (j = 0; j<height; j++){
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
