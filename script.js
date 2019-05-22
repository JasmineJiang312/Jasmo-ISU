//declaration and initialization
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var objArray = [];
var paused = false;
var totalKineticEnergy = 0;

document.addEventListener("keydown", keyDownHandler);

//clean the canvas to make sure the track of the ball does not show up in the box
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//add a ball which has a mass(radius) of 25
function AddnewBall25(){

    objArray[objArray.length] = new Ball(randomX(), randomY(), 25);

}

//add a ball which has a mass(radius) of 10
function AddnewBall10(){

    objArray[objArray.length] = new Ball(randomX(), randomY(), 10);

}

//add a ball which has a mass(radius) of 15
function AddnewBall15(){

    objArray[objArray.length] = new Ball(randomX(), randomY(), 15);

}

//add a ball which has a mass(radius) of 20
function AddnewBall20(){

    objArray[objArray.length] = new Ball(randomX(), randomY(), 20);

}

//user can pause or reset the collision box
//user can pause or reset the collision box
function keyDownHandler(event) {
    if (event.keyCode == 80) {     //if user types P
        paused = !paused;          //paused = false
    } else if (event.keyCode == 82) {     //if user types R
        objArray = [];      //clear the array (so all the balls will disappear)
    }
}


//set the background of the canvas to be white
function canvasBackground() {
    canvas.style.backgroundColor = "white";
}

//draw the circle whose radius and velocity are set by user
function drawCircle1(){
    var temp = randomRadius();
    objArray[objArray.length] = new Ball(randomX(), randomY(), temp);
}

//make the balls bounce back once they hit the wall
function hitTheWall(ball) {
    //left wall and right wall
    if (ball.x - ball.radius + ball.dx < 0 ||
        ball.x + ball.radius + ball.dx > canvas.width) {
        ball.dx *= -1;   //change its x direction
    }
    //up wall and down wall
    if (ball.y - ball.radius + ball.dy < 0 ||
        ball.y + ball.radius + ball.dy > canvas.height) {
        ball.dy *= -1;  //change its y direction
    }

    //makes sure the ball wouldn¡¯t ¡°get into the wall¡± on the bottom
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
    //makes sure the ball wouldn¡¯t ¡°get into the wall¡± on the top of the collision box
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
    }
    //makes sure the ball wouldn¡¯t ¡°get into the wall¡± on the right
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
    }
     //makes sure the ball wouldn¡¯t ¡°get into the wall¡± on the left
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
    }
}

//if balls collide with each other
function ballCollision() {
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {
                var theta1 = objArray[obj1].angle(); //the angle that ball1 is travelling
                var theta2 = objArray[obj2].angle(); //the angle that ball2 is travelling
                var phi = Math.atan2(objArray[obj2].y - objArray[obj1].y, objArray[obj2].x - objArray[obj1].x); //the angle between ball1 and ball2

                //get the mass and speed of ball1 and ball2
                var m1 = objArray[obj1].mass;
                var m2 = objArray[obj2].mass;
                var v1 = objArray[obj1].speed();
                var v2 = objArray[obj2].speed();

                //calculate final velocity for ball1 and ball2
                var dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                var dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                var dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                var dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                //set the velocity
                objArray[obj1].dx = dx1F;
                objArray[obj1].dy = dy1F;
                objArray[obj2].dx = dx2F;
                objArray[obj2].dy = dy2F;
            }
        }
        //if the collision happens close to the wall, check if any balls hit the wall
         hitTheWall(objArray[obj1]);
    }
}

//check if the balls overlap
function staticCollision() {
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 && distance(objArray[obj1], objArray[obj2]) < objArray[obj1].radius + objArray[obj2].radius){
                //if the two balls are not identical and if the distance between the balls is smaller than
                //the sum of their radius (which means they overlap!)

                //calculate the angle between the two balls
                var theta = Math.atan2((objArray[obj1].y - objArray[obj2].y), (objArray[obj1].x - objArray[obj2].x));
                //check if the balls overlap
                var overlap = objArray[obj1].radius + objArray[obj2].radius - distance (objArray[obj1], objArray[obj2]);
                //check which object is smaller (if their radius are the same, make obj1 the smaller one)
                var smallerObject = objArray[obj1].radius < objArray[obj2].radius ? obj1 : obj2
                //decide how the smaller object should travel if they overlap
                objArray[smallerObject].x -= overlap * Math.cos(theta);
                objArray[smallerObject].y -= overlap * Math.sin(theta);
            }
        }
    }
}

//makes the ball move in the x and y direction the user entered/ randomed by the program
function moveObjects() {
    for (var obj in objArray) {
        objArray[obj].x += objArray[obj].dx;
        objArray[obj].y += objArray[obj].dy;
    }
}

//draw the balls
function drawObjects() {
    for (var obj in objArray) {
        objArray[obj].draw();
    }
}

function draw() {

    clearCanvas();
    canvasBackground();

    if (!paused) {
        moveObjects();
    }

    drawObjects();
    staticCollision();
    ballCollision();
    requestAnimationFrame(draw);
}

//default: create a ball when the web page is opened to add more kinetic energy to the system
objArray[objArray.length] = new Ball(randomX(), randomY(), 20);
draw();
