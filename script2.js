//this is the function that randoms the colors of the balls
function randomColor() {
    red = Math.floor(Math.random() * 3) * 127;
    green = Math.floor(Math.random() * 3) * 127;
    blue = Math.floor(Math.random() * 3) * 127;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

//this is the function that randoms the initial x position of the ball
function randomX() {
    x = Math.floor(Math.random() * canvas.width);
    //make sure the initial position is within the canvas
    if (x < 50) {
        x = 50;
    } else if (x + 50 >= canvas.width) {
        x = canvas.width - 50;
    }
    return x;
}

//this is the function that randoms the initial y position of the ball
function randomY() {
    y = Math.floor(Math.random() * canvas.height);
    //make sure the initial position is within the canvas
    if (y < 50) {
        y = 50;
    } else if (y + 50 > canvas.height) {
        y = canvas.height - 50;
    }
    return y;
}

//this function gets the velocity in the x direction of the ball
function randomDx() {
    var velocityX = document.getElementById("getVelocityX").value;
    var p = Math.floor(Math.random() * 20 - 10);
    //if the value the user enters is equal to the random value, and the the value is an integer between -10 and 10
    while(velocityX != p && velocityX % 1 == 0 && velocityX > -10 && velocityX < 10){
        velocityX = document.getElementById("getVelocityX").value;
        p = Math.floor(Math.random() * 20 - 10);
    }
    if(velocityX % 1 == 0 && velocityX > -10 && velocityX < 10){
        return p;
    }
}

//this function gets the velocity in the y direction of the ball
function randomDy() {
    var velocityY = document.getElementById("getVelocityY").value;
    var q = Math.floor(Math.random() * 20 - 10);

    //if the value the user enters is equal to the random value, and the the value is an integer between -10 and 10
    while(velocityY != q && velocityY % 1 == 0 && velocityY > -10 && velocityY < 10){
        velocityY = document.getElementById("getVelocityY").value;
        q = Math.floor(Math.random() * 20 - 10);
    }
    if(velocityY % 1 == 0 && velocityY > -10 && velocityY < 10){
        return q;
    }
}

//this function gets the radius/mass of the ball
function randomRadius() {
    var rValue = document.getElementById("getRadius").value;
    var r = Math.ceil(Math.random() * 50);

    //if the value the user enters is equal to the random value, and the the value is an integer between 0 and 50
    while(rValue != r && rValue > 0 && rValue < 50 && rValue % 1 == 0){
        rValue = document.getElementById("getRadius").value;
        r = Math.ceil(Math.random() * 50);
    }

    if(rValue > 0 && rValue < 50 && rValue % 1 == 0){
        return r;
    }
}

//this function calculates the distance between two balls in the next frame
function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx)**2 + (a.y + a.dy - b.y - b.dy)**2) - a.radius - b.radius;
}

//this function calculates the distance between two balls
function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}
