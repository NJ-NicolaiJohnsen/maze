

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
    let walls = createMaze(400);
    let x = 20;
    let y = 20;
    
    walls.forEach(wall=>{

        wall.style.left = x+'px';
        wall.style.top = y+'px';

        x+=40;
        
        if (x > 380) {
            x = 20;
            y+=40
        }
        
    })

    return walls;

}



function doSomething(){
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
        if (Math.random()*2>1){
            clonedNodeArray[i].style.top = '-20px';
        } else {
            clonedNodeArray[i].style.left = '-20px'
        }
        
       
        //clonedNodeArray[i].style.display = 'none';
    }

    

}
doSomething()





























let player = document.querySelector('.player');
let goal = document.querySelector('.goal');
let coordinates = {
    x: 0,
    y: 0
};
console.log(coordinates);

// left arrowkey === 37
// right arrowkey === 39
// up arrowkey === 38
// down arrowkey === 40
document.addEventListener('keyup', function(event){
    
    
   


    if (event.keyCode === 39) { //right
        coordinates.x+= 20;
        if (coordinates.x > 381){coordinates.x = 0};
        player.style.transform =  'translate('+coordinates.x+'px,'+coordinates.y+'px)';
    }

    if (event.keyCode === 37) { //left
        coordinates.x-= 20;
        if (coordinates.x < -1){coordinates.x = 380};
        player.style.transform =  'translate('+coordinates.x+'px,'+coordinates.y+'px)';
    }

    if (event.keyCode === 38) { //up
        coordinates.y-= 20;
        if (coordinates.y < -1){coordinates.y = 380};
        player.style.transform =  'translate('+coordinates.x+'px,'+coordinates.y+'px)';
    }

    if (event.keyCode === 40) { //down
        coordinates.y+= 20;
        
        if (coordinates.y > 381){coordinates.y = 0};
        player.style.transform =  'translate('+coordinates.x+'px,'+coordinates.y+'px)';
    }

    console.log(coordinates.x, coordinates.y)

})


var c = document.getElementById('myCanvas');

var ctx = c.getContext("2d");

ctx.moveTo(10,0);
ctx.lineTo(10, 10);
ctx.stroke();

abc = c.getContext('2d');
abc.beginPath();
abc.arc(45, 60, 30, 0, 2 * Math.PI); // x, y, radius, radians missing, 2 * PI = circle 
abc.stroke();


function walltest(){
    let randomFoo = Math.random()*2;
    
    if (randomFoo < 1){
        console.log('up')
    } else {
        console.log('left')
    }
}
walltest()

