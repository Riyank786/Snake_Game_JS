
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let snakeW = 10;
let snakeH = 5;
let dir = 'right';
let points = 0;
let pointsH = 0;
function drawsnake(x, y) {

    ctx.fillStyle = "lightgreen";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);

}

document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37 && dir != 'right') {
        dir = 'left';
    }
    else if (e.keyCode == 38 && dir != 'down') {
        dir = 'up';
    }
    else if (e.keyCode == 39 && dir != 'left') {
        dir = 'right';
    }
    else if (e.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
    
})

// create snake 

var len = 4;
snake = [];

for (var i = len - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 0
    })
}
// create food 
var food = {
    x: Math.round(Math.random() * 29),
    y: Math.round(Math.random() * 29)
}

// draw food
function drawFood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);

}

function collisionDetection(newHead, snake) {
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}
//draw function 
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (var i = 0; i < snake.length; i++) {
        var X = snake[i].x;
        var Y = snake[i].y;
        drawsnake(X, Y)
    }
    drawFood(food.x, food.y);
    //snake  head 
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (dir == "right") { snakeX++ }
    else if (dir == "left") { snakeX-- }
    else if (dir == "up") { snakeY-- }
    else if (dir == "down") { snakeY++ }    
    
    if (snakeX == food.x && snakeY == food.y) {
        
        if(sound.innerHTML==soundOn){
            var pointSound = document.getElementById("pointSound");
            pointSound.play();}
            
        food = {
            x: Math.round(Math.random() * 29),
            y: Math.round(Math.random() * 29)
        }
        var newHead = {
            x: snakeX,
            y: snakeY
        }
        points++;
        document.getElementById("scrC").innerHTML = points;
        if (points > pointsH) {
            document.getElementById("scrH").innerHTML = points;
        }
    }
    else {
        snake.pop();
        var newHead = {
            x: snakeX,
            y: snakeY
        }
    }
    // new head 
    snake.unshift(newHead);
    let collideBody = collisionDetection(newHead, snake);
    if (snakeX < 0 || snakeY < 0 || snakeX >= cvs.width / snakeW || snakeY >= cvs.height / snakeH || collideBody) {
        if(sound.innerHTML==soundOn){
            var outSound= document.getElementById("outSound");
            outSound.play();}
        if (points > pointsH) {
            pointsH = points;
        } document.getElementById("yrScore").innerHTML = points;
        document.getElementById("hgScore").innerHTML = pointsH;
        points = 0;
        document.getElementById("out-box").style.display = "flex";
        len = 4;
        snake = [];

        for (var i = len - 1; i >= 0; i--) {
            snake.push({
                x: i,
                y: 0
            })
        }
        dir = "right";
        snakeX = 0;
        snakeY = 0;
        clearInterval(start_game);

    }

} // end draw function


var start_game;
function startnew() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("container").style.display = "flex";
    var game_level = document.getElementById("game-level");
    if (game_level.value == "Easy") {
        start_game = setInterval(draw, 300)
    }
    else if (game_level.value == "Meduim") {
        start_game = setInterval(draw, 200)
    }
    else if (game_level.value == "Hard") {
        start_game = setInterval(draw, 100)
    }
}
function reStart() {
    document.getElementById("out-box").style.display = "none";
    document.getElementById("scrC").innerHTML = points;
    document.getElementById("scrH").innerHTML = pointsH;
    goto: startnew();
}
function goHome() {
    document.getElementById("out-box").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    document.getElementById("scrC").innerHTML = points;
    document.getElementById("scrH").innerHTML = pointsH;
}

function openAboutUs() {
    document.getElementById("aboutUs").style.display = "flex";
}
function closeAboutUs() {
    document.getElementById("aboutUs").style.display = "none";
}

var soundOn = '<i class="fa fa-volume-up" aria-hidden="true"></i>'
var soundOff = '<i class="fa fa-volume-off" aria-hidden="true"></i>'
var sound = document.getElementById("sound");
function soundOnOff() {
    if (sound.innerHTML != soundOn) {
        sound.innerHTML = soundOn;
    }
    else {
        sound.innerHTML = soundOff;
    }
}
window.onload = () => {
    sound.innerHTML = soundOn;
}


