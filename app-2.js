

function createWallDivs(){ 
    let maze = document.querySelector('.maze');
    grid = [];
    let rows = []
    let columns = [];

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

