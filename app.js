let player = document.querySelector('.player');
let goal = document.querySelector('.goal');
let coordinates = {
    x: 0,
    y: 0
};





function createMaze(size){
    let walls = [];
    let wall = document.querySelector('.wall');
    let maze = document.querySelector('.maze');


    for (i=0; i<size/4; i++){
        walls.push(wall.cloneNode());
        
    }

    walls.forEach(wall=>{
        wall.style.display = 'block';
        maze.appendChild(wall)
    })

  return walls;
    
}




function createWalls(){
    let walls = createMaze((900/20)*(900/20));
    let x = 20;
    let y = 20;
    
    walls.forEach(wall=>{

        wall.style.left = x+'px';
        wall.style.top = y+'px';

        x+=40;
        
        if (x > 900) {
            x = 20;
            y+=40
        }
        
    })

    return walls;

}



function binaryMaze(){
    let walls = createWalls()
    clonedNodeArray = [];
    walls.forEach(wall=>{
        clonedNodeArray.push(wall.cloneNode());
    })

    for (i=0; i< walls.length; i++){
        walls[i].appendChild(clonedNodeArray[i]);
        clonedNodeArray[i].style.top = '0px';
        clonedNodeArray[i].style.left = '0px'
        clonedNodeArray[i].style.position = 'relative';

        let randomInt = Math.random()*3;
        if (randomInt<0.8){
            clonedNodeArray[i].style.top = '-20px';
        } else if (randomInt >= 0.8 && randomInt < 1.6) {
            clonedNodeArray[i].style.top = '-20px';
        } else if (randomInt >= 1.6 && randomInt < 2.4) {
            clonedNodeArray[i].style.left = '-20px';
        } else {
            clonedNodeArray[i].style.left = '-20px'
        }


        

    }
    
  
}
binaryMaze()


//console.log(isEqual(player, walls[i])); 


/*        
function isEqual(value, other) {

    let type = Object.prototype.toString.call(value);

    if (type !== Object.prototype.toString.call(other)){
        return false
    }
       
    return true
}
*/

function collisionControl() {
    let wallNodes = document.querySelectorAll('.wall');
    wallNodes.forEach(node=>{
       console.log(player.style.left)
    })
}


// left arrowkey === 37
// right arrowkey === 39
// up arrowkey === 38
// down arrowkey === 40
document.addEventListener('keydown', function(event){

    console.log(collisionControl())

    if (event.keyCode === 39 || event.keyCode === 68) { //right
        coordinates.x+= 20;
        if (coordinates.x > 1621){coordinates.x = 0};
        player.style.top =  coordinates.y + 'px';
        player.style.left = coordinates.x + 'px';
    }

    if (event.keyCode === 37 || event.keyCode === 65) { //left
        coordinates.x-= 20;
        if (coordinates.x < -1){coordinates.x = 1620};
        player.style.top =  coordinates.y + 'px';
        player.style.left = coordinates.x + 'px';
    }

    if (event.keyCode === 38 || event.keyCode === 87) { //up
        coordinates.y-= 20;
        if (coordinates.y < -1){coordinates.y = 860};
        player.style.top =  coordinates.y + 'px';
        player.style.left = coordinates.x + 'px';
    }

    if (event.keyCode === 40 || event.keyCode === 83) { //down
        coordinates.y+= 20;
        
        if (coordinates.y > 861){coordinates.y = 0};
        player.style.top =  coordinates.y + 'px';
        player.style.left = coordinates.x + 'px';
    }



    console.log(coordinates.x, coordinates.y)

})





