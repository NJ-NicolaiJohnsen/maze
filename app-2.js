

function createWallDivs(){ 
    let maze = document.querySelector('.maze');
    grid = [];
    let rows = []

    let height = 25;
    let width = 25;

   for (i=0; i<height; i++) {
       let row = [];
       rows.push(row)
    }
    for (i=0; i<rows.length; i++){
        for (j=0; j<rows.length; j++) {

            let column;
            if (Math.random()*2 > 1.1){
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


function gridData(x, y){
    let grid = [];
    let rows = document.querySelectorAll('.row')

    rows.forEach(e=>{
        grid.push(e.children)

    })
    return grid[x][y]
}


let xAxis = 0;
let yAxis = 0;
gridData(xAxis, yAxis)
document.addEventListener('keydown', function(event){ //move the player unit
// Color the node gridNode that i am on pink. Pink is going to be the player unit. If the node i move into is === 1, then dont move. 
    
   
  
    if (xAxis < 0){xAxis = 0}
    if (xAxis > 24){xAxis = 24}
    if (yAxis < 0){yAxis = 0}
    if (yAxis > 24){yAxis = 24}

    if (event.keyCode === 37){ // left
        yAxis-=1
    }

    if (event.keyCode === 38){ // up
        xAxis-=1;
    }

    if (event.keyCode === 39){ // right
        yAxis+=1;
    }

    if (event.keyCode === 40){ // down
        xAxis+=1;
    }

    let grid = gridData(xAxis, yAxis);
    
    console.log(xAxis, yAxis)  

    if (grid.style.backgroundColor !== 'blue'){
        grid.style.backgroundColor = 'pink';
    }



    
})