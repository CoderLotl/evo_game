import { eggs, creatures } from '../../Controller/Stores.js';
import { creatureSize } from '../../Controller/config.js';
import { Creature } from './Creature.js';

export class Egg
{
    constructor(container_, position)
    {
        this.time = 0;
        this.tilt = 0;
        this.hatched = false;
        this.goingToPositive = true;
        this.containerID = container_;
        this.body = document.createElement('img');        
        this.body.style.top = `${position.y_pos}px`;
        this.body.style.left = `${position.x_pos}px`;
        this.x_pos = position.x_pos;
        this.y_pos = position.y_pos;

        let min = 2;
        let max = 10;
        let rand = (Math.floor(Math.random() * (max - min + 1) + min));

        this.body.src = `../Resources/egg${rand}.png`;
        this.body.width = 30;
        this.body.height = 30;
        this.body.title = 'a lotl egg!';
        this.body.classList += 'absolute duration-100 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)';        

        let container = document.getElementById(this.containerID);
        container.appendChild(this.body);
        eggs.push(this);
    }

    rotate(value)
    {
        this.body.style.transform = `rotate(${value}deg)`;        
    }

    hatch()
    {
        this.time += 1;
        let tiltChange = 15;

        if(this.tilt < 45 && this.goingToPositive)
        {
            this.tilt += tiltChange;
            if(this.tilt >= 45)
            {
                this.goingToPositive = false;
            }
        }
        else if(!this.goingToPositive && this.tilt > -45)
        {
            this.tilt -= tiltChange;
            if(this.tilt <= -45)
            {
                this.goingToPositive = true;
            }
        }
        this.rotate(this.tilt);

        if(this.time >= 50 && this.hatched == false)
        {
            this.hatched = true;
            
            this.body.classList.add('dying-creature');
            setTimeout(() =>
            {
                // LOTL SPAWNING
                let newLotlNumber = Creature.findLastLotl();

                let container_data = document.getElementById(this.containerID).getBoundingClientRect();
                let position = {x_pos: this.x_pos, y_pos: this.y_pos};
                

                let newLotl = new Creature(this.containerID, container_data, newLotlNumber, false, position);
                creatures.push(newLotl);

                // EGG REMOVAL
                for(let i = 0; i < eggs.length; i++)
                {
                    if(eggs[i] == this)
                    {
                        this.body.remove();
                        eggs.splice(i, 1);
                        break;
                    }
                }
            }, 1000);
        }
    }
}