function Ball(x, y, radius) {
    //let the radius of the ball equal to the radius the user enters
    this.radius = radius;

    //dx is the velocity in the x direction
    //dy is the velocity in the y direction
    //let the dx of the ball be the dx that the user enters
    this.dx = randomDx();
    //let the dx of the ball be the dx that the user enters
    this.dy = randomDy();

    // we assume that the mass is equal to the radius
    // of the ball, so the number that the user enters is
    // both the radius and the mass
    this.mass = this.radius;

    //set the initial x y position of the ball
    this.x = x;
    this.y = y;

    //set the color of the ball
    this.color = randomColor();

    //draw the ball
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.stroke();
        ctx.closePath();
    };

    //calculate the speed of the ball
    this.speed = function() {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };

    //calculate the angle of the ball with the x axis
    this.angle = function() {
        return Math.atan2(this.dy, this.dx);
    };

    //calculate the kinetic energy
    this.kineticEnergy = function () {
        return (0.5 * this.mass * this.speed() * this.speed());
    };

}

