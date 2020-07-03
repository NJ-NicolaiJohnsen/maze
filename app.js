let player = document.querySelector('.player');
let goal = document.querySelector('.goal');
let coordinates = {
    x: 0,
    y: 0
};





function createMaze(mazeArea){
    let wallDivs = [];
    let wallDiv = document.querySelector('.wall');
   let maze = document.querySelector('.maze');


    for (i=0; i<mazeArea/4; i++){
        wallDivs.push(wallDiv.cloneNode());
    }

    wallDivs.forEach(wallDiv=>{
        wallDiv.style.display = 'block';
        maze.appendChild(wallDiv)
    })

  return wallDivs;
    
}




function positionWallDivs(){
    const width = 990;
    const height = 820;
    const mazeArea = (width/20) * (height/20);
    let wallDivs = createMaze(mazeArea);

    let xAxis = 20;
    let yAxis = 20;
    // Position each wallDiv uniformly every 40 pixels on along both axises
    wallDivs.forEach(wallDiv=>{
        // The wallDivs are absolutely positioned; with css
        wallDiv.style.left = xAxis+'px';
        wallDiv.style.top = yAxis+'px';

        xAxis+=40;
        
        if (xAxis > 900) {
            xAxis = 20;
            yAxis+=40
        }
        
    })

    return wallDivs;

}



function binaryMaze(){
    let walls = positionWallDivs();
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
        if (randomInt<1.3){
            clonedNodeArray[i].style.top = '-20px';
        } else if (randomInt >= 1.3 && randomInt < 1.5) {
            clonedNodeArray[i].style.top = '20px';
        } else if (randomInt >= 1.5 && randomInt < 2.8) {
            clonedNodeArray[i].style.left = '-20px';
        } else {
            clonedNodeArray[i].style.left = '20px'
        }


        

    }
    
  
}
binaryMaze()
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection

function collisionControl() {// document.elementFromPoint !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   // let wallNodes = document.querySelectorAll('.wall');
    //let maze = document.querySelector('.maze');
    //let mazeClone = maze.cloneNode(true);
    //var shadow = mazeClone.attachShadow({mode: 'open'});
    var elementPoint = document.elementFromPoint(180, 120);
    let caret = document.caretPositionFromPoint(1000, 100)
   // wallNodes.forEach(e=>{
     //   shadow.appendChild(e)
   // })
    
    console.log(caret)
}
collisionControl()


// left arrowkey === 37
// right arrowkey === 39
// up arrowkey === 38
// down arrowkey === 40
document.addEventListener('keydown', function(event){

    

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



