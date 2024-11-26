//Let's make a creature!
class Creature {
    constructor(
        x,
        y,
        speed = 100,
        size = 100,
        dor = 100,
        tail = 0,
        lfin = 0,
        rfin = 0,
        nred = 250,
        ngreen = 40,
        nblue = 40,
        tml = 60,
        agerate = 600
        //prio = [plant, avoid, wander, chase]
        //prio = [100, 50, 0]
    ) {
        this.x = x;
        this.y = y;

        //DIRECTION
        this.d = 0;

        //SPEED is set to 10 more, 10 less, or equal to the speed in the parameters, / 50. (ex. speed set to 90 becomes 100 becomes 2)
        this.speed = (speed + random([-10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) / 50;

        //SIZE is set to  10 more, 10 less, or equal the size in the parameters, / 300 + 1/3. (ex. speed set to 90 becomes 100 become 2/3)
        this.size = (size + random([-10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) / 300 + 0.33;

        //DISORIENTATION is set to 10 more, 10 less, or equal to the size in the parameters, / 75 (ex. diso. set to110 becomes  100 becomes 3/4)
        this.dor = (dor + random([-10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) / 75;

        //TAIL is set to either 0 or 10 if the tail in the parameters is 0. If the tail in the perameters is more than 10, it's set to 10 more, 10 less, or equal that.
        if (tail == 0) {
            this.tail = tail + random([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        } else {
            this.tail = tail + random([-10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }

        //LEFT FIN
        if (lfin == 0) {
            this.lfin = lfin + random([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        } else {
            this.lfin = lfin + random([-10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }

        //RIGHT FIN
        if (rfin == 0) {
            this.rfin = rfin + random([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        } else {
            this.rfin = rfin + random([-10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }

        //Natural color
        this.nred = nred + random(-20, 20)

        this.ngreen = ngreen + random(-20, 20)

        this.nblue = nblue + random(-20, 20)

        //Active(?) color (the "a" was just so that the code doesn't read it as the actual color)
        this.ared = this.nred

        this.agreen = this.ngreen

        this.ablue = this.nblue

        //TURN MOVE LENGTH is set to 1 second
        this.tml = tml;

        //AGE RATE
        this.agerate = agerate;

        this.age = 1;

        //CLOSEST PLANT
        this.clp = 0;

        //CLOSEST PLANT DIRECTION
        this.clpd = 0;

        //TAIL ROTATION
        this.tailr = 0;

        //FIN ROTATION
        this.finr = 5;

        //BODY BACK+FORTH ROTATION
        this.swivel = 0;

        //Size and age determine the body's size
        this.diameter = 50 * this.size + this.age * this.size;

        this.energy = 500;

        this.want2Kill = false
    }

    display() {
        //The higher the speed, size, tail, and/or fins, the faster the creature runs out oof energy
        this.energy -= 0.4 + this.speed * this.size / 3 + this.tail / 100 + this.rfin / 100 + this.lfin / 100

        push();
        translate(this.x - windowPos.X, this.y - windowPos.Y);

        //Different creatures will have different colors
        fill(this.ared, this.agreen, this.ablue)

        //If the creature doesn't have a tail it will constantly swivel back and forth, with a greater swivel the faster it is
        if (this.tail <= 0) {
            this.d += sin(this.swivel) * this.speed * 3 * (this.size + 0.33);
            this.swivel += 20 / (this.size + 0.33);
        }

        //Time to make a tail
        if (this.tail > 0) {
            push();
            //The tail waves back and forth
            rotate(sin(this.tailr) * this.speed * 5 + this.d);
            this.tailr += 20;
            //The tail is placed at the end of the creature and its size is dependant on the size of the creature's body and the value of the tail variable
            rectMode(CENTER);
            rect(
                -this.diameter / 2 - (this.diameter * this.tail) / 100,
                0,
                (this.diameter * this.tail) / 50,
                (this.diameter * this.tail) / 500 + 2
            );
            pop();
        }

        //Now to make the fins
        if (this.rfin > 0) {
            push();
            //The fin waves back and forth
            rotate(sin(this.finr) * this.speed * 5 + this.d);
            //The fin is places at the right side of the creature and its size is dependant on the size of the creature's body and the value of the tail variable
            rectMode(CENTER);
            rect(
                0,
                this.diameter / 2 + (this.diameter * this.rfin) / 100,
                (this.diameter * this.rfin) / 500 + 2,
                (this.diameter * this.rfin) / 50
            );
            pop();
        }

        //Now the left fin
        if (this.lfin > 0) {
            push();
            //The fin waves back and forth
            rotate(-sin(this.finr) * this.speed * 5 + this.d);
            //The fin is places at the left side of the creature and its size is dependant on the size of the creature's body and the value of the tail variable
            rectMode(CENTER);
            rect(
                0,
                -this.diameter / 2 - (this.diameter * this.lfin) / 100,
                (this.diameter * this.lfin) / 500 + 2,
                (this.diameter * this.lfin) / 50
            );
            pop();
        }
        this.finr += 15;

        //The body slightly waves opposite to the tail
        rotate(this.d - sin(this.tailr) * 10);

        //We're finally giving the creature a body!
        ellipse(0, 0, this.diameter);

        //The size of the eyes are determined by size, not age. However, the eyes are further apart when the creature's age is higher
        fill(255);
        ellipse(
            4 * this.size,
            11.5 * this.size + (this.age * this.size) / 5,
            22 * this.size
        );
        fill(255);
        ellipse(
            4 * this.size,
            -11.5 * this.size - (this.age * this.size) / 5,
            22 * this.size
        );

        //When the creature's disorientation is zero, the pupils are in the center of the eye. When the disorientation is higher, the pupils are further apart. When the disorientation is lower in the negatives, the pupils are closer together
        fill(0);
        ellipse(
            5 * this.size,
            -11.5 * this.size -
            (this.age * this.size) / 5 -
            (this.dor * this.size) / 1.5,
            13 * this.size
        );
        fill(0);
        ellipse(
            5 * this.size,
            11.5 * this.size +
            (this.age * this.size) / 5 +
            (this.dor * this.size) / 1.5,
            13 * this.size
        );
        if (this.tail > 0) {
        }
        pop();

        if (sin(this.finr) > 0) {
            this.d -=
                sin(sin(this.finr)) * this.rfin * 100 -
                sin(sin(this.finr)) * this.lfin * 100;
        }

        if (this.energy <= 0) {
            this.ared += 3;
            this.ablue += 3;
            this.agreen -= 3;
        }
        else {
            this.ared = this.nred
            this.agreen = this.ngreen
            this.ablue = this.nblue
        }
    }

    is_dead() {
        return this.energy <= 0 && this.ared >= 255 && this.agreen <= 0 && this.ablue >= 255;
    }


    move() {

        //REPRODUCTION TIME!!!!
        if (this.energy > 2000 && this.age >= 6) {
            this.energy -= 2000
            let newCreature = new Creature(
                this.x,
                this.y,
                this.speed * 50,
                this.size * 300 - 99,
                this.dor * 75,
                this.tail,
                this.lfin,
                this.rfin,
                this.nred,
                this.ngreen,
                this.nblue,
                this.tml,
                this.agerate
            );
            creature.push(newCreature);
        }

        //Creature changes direction every 60 frames (1 second)
        if (frameCount % this.tml == 0) {
            //Turns toward the closest plant of there are plants
            if (plant.length > 0) {
                //Finds the closet plant to the creature by checking each plant's distance.

                this.clp = 0;

                for (let i = 0; i < plant.length; i++) {
                    if (
                        dist(plant[i].x, plant[i].y, this.x, this.y) <
                        dist(plant[this.clp].x, plant[this.clp].y, this.x, this.y)
                    ) {
                        this.clp = i;
                    }
                }

                //Decides the direction to face the the closest plant. The direction can be messed up depending on disorientation. The higher the disorientation, the bigger the chance of being messed up. At 0 disorientation, the creature never gets confused, and lower in the negatives, the bigger the chance of being messed up.
                this.clpd = atan2(
                    plant[this.clp].y - this.y,
                    plant[this.clp].x - this.x
                );

                if (this.clpd > 10) {
                    this.clpd += random(-abs(this.dor) * (this.clpd - 10) / 3, abs(this.dor) * (this.clpd - 10) / 3);
                }

                //If there aren't any plants, the creature choses a random direction
            } else {
                this.clpd = random(360);
            }
        }

        //The creature turns towards the closest plant
        if (this.clpd < this.d - 180) {
            this.clpd += 360;
        } else if (this.clpd > this.d + 180) {
            this.clpd -= 360;
        }
        this.d += (this.clpd - this.d) / 7;

        //Creature moves foward
        this.x += cos(this.d) * (this.speed + this.tail / 150 + this.rfin / 150);
        this.y += sin(this.d) * (this.speed + this.tail / 150 + this.rfin / 150);

        //Ages every 10 seconds
        if (frameCount % this.agerate == 0) {
            this.age++;
            this.diameter = 50 * this.size + this.age * this.size;
        }
    }
}