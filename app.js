let x = 0;
let y = 0;

for (i=1; i<20; i+1){
    x+=i;
   
}

console.log(x);































/*
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

*/