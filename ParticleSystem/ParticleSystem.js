var eps = 100;
var gam = 100;
let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    background(200);
    //let p = new Proton(400, 275, 0, 0);
    //let e = new Electron(400, 300, 0, 0);
    //let n = new Neutron(400, 250, 0, 0);
    //particles = [p, e, n];
    for (var i = 0; i < 60; i += 3) {
        particles[i] = new Proton(random(15, width-15), random(15, width-15), random(-2, 2), random(-2, 2));
        particles[i+1] = new Electron(random(15, width-15), random(15, width-15), random(-2, 2), random(-2, 2));
        particles[i+2] = new Neutron(random(15, width-15), random(15, width-15), random(-2, 2), random(-2, 2));
    }
}

function draw() {
    background(1, 45);
    for (let part of particles) {
        part.accelerate();
        part.move();
        part.detection();
        part.display();
        for (let other of particles){
            if (part != other) {
                part.setAcceleration(force(part, other));
            }
        }
    }
}

function force(a, b) {
    let d = a.P.dist(b.P);
    if (d == 0) {
        d = 0.01;
    }
    let F = createVector(b.P.x - a.P.x, b.P.y - a.P.y);
    F.setMag((eps * a.q * b.q)/sq(d) + (gam * a.m * b.m)/sq(d));
    return F;
}