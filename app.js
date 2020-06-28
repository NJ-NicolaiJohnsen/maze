function createWalls(size){
    let wall = document.querySelector('.wall');
    let maze = document.querySelector('.maze');
    let walls = [];

    for (i=0; i < size; i++) {
        walls.push(wall.cloneNode());
    }

    walls.forEach(wall=>{
        wall.style.display = 'inline-block';
        wall.style.float = 'left';
        maze.appendChild(wall);
    })
    
    return walls;

}
// createWalls(SIZE) should be defined by an input in the html. Something you select, if you get more advanced.

let pinkWallArray = [];

function wallColor(walls) {
    walls.forEach(wall=>{
        if (Math.random()*2 > 1) {
            wall.style.background = 'pink';
           
            pinkWallArray.push(wall)
        }
    })   
}

wallColor(createWalls(400));


pinkWallArray.forEach(pinkWall =>{

    

})


let arr1 = {item1: 42,
        item2: 'another thing',
        item3: function () {
            console.log('running!');
        }
};
    
let arr2 = [13, 24, 32];

let isEqual = function (value, other) {

    let type = Object.prototype.toString.call(value);

    if (type !== Object.prototype.toString.call(other)){
        return false;
    }

    return true;
}

console.log(Object.prototype.toString.call(arr2));
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