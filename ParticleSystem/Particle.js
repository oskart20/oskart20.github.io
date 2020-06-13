class Particle {

    constructor(x, y, r, mass, c, vx, vy){
        this.P = createVector(constrain(x, r, width - r), constrain(y, r, height - r));
        this.r = r;
        this.m = mass;
        this.c = c;
        this.V = createVector(vx, vy);
        this.A = createVector(0, 0);
    }

    display() {
        fill(color(this.c));
        ellipseMode(RADIUS);
        circle(this.P.x, this.P.y, this.r);
    }

    move() {
        this.P.set(constrain(this.P.x, this.r, width - this.r), constrain(this.P.y, this.r, height - this.r));
        this.P.add(this.V);
    }

    accelerate() {
        this.V.add(this.A);
        this.V.limit(7);
    }

    detection() {
        if (this.P.x > width - this.r || this.P.x < this.r) {
            this.V.x *= -1;
        }
        if (this.P.y > height - this.r || this.P.y < this.r) {
            this.V.y *= -1;
        }
    }

    setAcceleration(F){
        this.A.set(F);
    }
}

class Electron extends Particle {
    constructor(x, y, vx, vy) {
        super(x, y, 2, 0.01, 'blue', vx, vy);
        this.q = -1;
    }
}

class Neutron extends Particle {
    constructor(x, y, vx, vy) {
        super(x, y, 5, 1, 'green', vx, vy);
        this.q = 0;
    }
}

class Proton extends Particle {
    constructor(x, y, vx, vy) {
        super(x, y, 5, 1, 'red', vx, vy);
        this.q = 1;
    }
}