import { food_list, creatures } from '../../Controller/Stores.js';
import { foodSize, creatureSize } from '../../Controller/config.js';
import { StorageManager } from '../Utilities/StorageManager.js';
import { drawCreaturePlate } from '../../View/ViewDrawing.js';

export class Creature
{
    constructor(container, container_data)
    {
        this.age = 0;
        this.maxAge = this.setMaxAge();
        this.container = container_data;
        this.containerId = container.id;
        this.spawn(container);
        this.disorientation = 0;
        this.energy = 0;
        this.closestFood = null;
        this.updatedContainer = false;
        this.randomTurnLength = 0;
        this.dying = false;        
    }

    spawn(container)
    {
        this.body = document.createElement('img');

        let rect = this.container;
        let minX = rect.left;
        let minY = rect.top;
        let maxX = minX + rect.width - creatureSize;
        let maxY = minY + rect.height - creatureSize;        

        const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY);
        
        this.body.style.top = `${randomY}px`;
        this.body.style.left = `${randomX}px`;        
        this.body.src = "../Resources/ax.webp";

        this.x_pos = randomX;
        this.y_pos = randomY;        

        this.body.classList += `absolute w-[${creatureSize}px] h-[${creatureSize}px] duration-500 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)] hover:saturate-150`;

        let randomDegrees = Math.floor(Math.random() * 360);
        this.rotate(randomDegrees);        

        container.appendChild(this.body);
        
        this.body.addEventListener('click', ()=>
        {
            drawCreaturePlate(container, this);
        });
    }

    rotate(value)
    {
        this.body.style.transform = `rotate(${value}deg)`;
    }

    move(timeControl)
    {
        this.moveTick(timeControl);
        this.ageTick(timeControl);
    }

    moveTick(timeControl)
    {
        // ----------------------
        // Variables
        // ----------------------
        let storageManager = new StorageManager();
        let turnLength = storageManager.ReadSS('turnLength');        
        let baseLotlSpeed = storageManager.ReadSS('baseLotlSpeed');

        // ----------------------
        // Calculating nearest food or either a random point to head to.
        // ----------------------
        /*
        timeControl.miniTime is a counter. Each iteration it gets increased by 1, with the game being set roughly at 1 iteration per 0.1 seconds.
        This means 10 iterations are performed in 1 second, so multiplying the turnLength by 10 and trying to find a dividend of miniTime that returns 0 
        actually sets how long it'd take for this to happen.

        Little lotls are gonna move around till their turn has passed or either they reached their random location they were heading to.
        */
        if(timeControl.miniTime % ((turnLength + this.randomTurnLength) * 10) == 0 || this.closestFood == null)
        {            
            if(food_list.length > 0)
            {
                this.closestFood = this.calculateNearestFood();
            }
            else
            {
                this.closestFood = this.getRandomPoint();
            }
            if(!this.updatedContainer)
            {
                this.container = document.getElementById(`${this.containerId}`).getBoundingClientRect();
                this.updatedContainer = true;
            }

            this.randomTurnLength = Math.floor(Math.random() * 3); // Setting some random turn length extension between 0 and 2 seconds.
        }

        // ----------------------
        // Calculating the initial arrival point
        // ----------------------
        let dx = this.closestFood.x_pos - this.x_pos;
        let dy = this.closestFood.y_pos - this.y_pos;

        // Calculate disorientation angle deviation
        let disorientationAngle = ((this.disorientation + 50) / 100) * Math.PI; // Normalize disorientation to 0-PI range
        let randomAngleDeviation = Math.random() * disorientationAngle - disorientationAngle / 2; // Generate random deviation within disorientation range

        // Calculate target angle considering disorientation
        let targetAngleRadians = Math.atan2(dy, dx) + randomAngleDeviation;

        let movementDistance = baseLotlSpeed; // This can get boosted later.
    
        // Calculate the new position based on the normalized distance
        this.x_pos += Math.round(movementDistance * Math.cos(targetAngleRadians));
        this.y_pos += Math.round(movementDistance * Math.sin(targetAngleRadians));

        // Calculate the updated distance to the arrival point
        dx = this.closestFood.x_pos - this.x_pos;
        dy = this.closestFood.y_pos - this.y_pos;
        let distanceToFood = Math.sqrt(dx * dx + dy * dy);

        if(distanceToFood <= foodSize - 20 && !this.dying)
        {
            this.consumeFood(this.closestFood);
            this.closestFood = null;
        }

        // ----------------------
        // Changing the body's orientation and position
        // ----------------------
        this.body.style.top = `${this.y_pos}px`;
        this.body.style.left = `${this.x_pos}px`;        
    
        // Calculate the new angle towards the food
        //let targetAngleRadians = Math.atan2(dy, dx);
        let targetAngleDegrees = Math.round((targetAngleRadians * (180 / Math.PI)) / 3);
        this.rotate(targetAngleDegrees);
    }

    calculateNearestFood()
    {
        let nearestFood = false;
        let nearestDistance = false;
        if(food_list.length > 0)
        {
            for(let i = 0; i < food_list.length; i++)
            {            
                let dx = food_list[i].x_pos - this.x_pos;            
    
                let dy = food_list[i].y_pos - this.y_pos;            
    
                let distance = Math.round(Math.sqrt(dx * dx + dy * dy));
    
                if(distance < 0)
                {
                    distance = distance * -1;
                }
    
                if(nearestDistance == false || nearestDistance > distance)
                {
                    nearestDistance = distance;
                    nearestFood = {x_pos: food_list[i].x_pos, y_pos: food_list[i].y_pos};
                }
            }
        }

        return nearestFood;
    }

    async consumeFood(nearestFood)
    {
        for(let i = 0; i < food_list.length; i++)
        {
            if(food_list[i].x_pos == nearestFood.x_pos && food_list[i].y_pos == nearestFood.y_pos)
            {
                food_list[i].consume();
                return true;
            }
        }

        return false;
    }

    getRandomPoint()
    {        
        let rect = this.container;
        let minX = rect.left;
        let minY = rect.top;
        let maxX = minX + rect.width - creatureSize;
        let maxY = minY + rect.height - creatureSize;   

        let randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        let randomY = Math.floor(Math.random() * (maxY - minY) + minY);

        return {x_pos: randomX, y_pos: randomY};
    }

    setMaxAge()
    {
        let storageManager = new StorageManager();
        let maxAge = parseInt(storageManager.ReadSS('maxAge'));
        let max = 5;
        let min = -5;

        return (maxAge + Math.floor(Math.random() * (max - min + 1) + min));
    }

    ageTick(timeControl)
    {
        let storageManager = new StorageManager();
        let agingTime = storageManager.ReadSS('agingTime');
        
        if(timeControl.miniTime != 0 && timeControl.miniTime % (agingTime * 1) == 0)
        {
            this.age += 1;            
        }
        if(this.age >= this.maxAge)
        {
            this.die();
        }
    }

    die()
    {
        this.body.classList.add('dying-creature');
        this.dying = true;
        setTimeout(() =>
            {
                this.body.remove();
    
                for(let i = 0; i < creatures.length; i++)
                {
                    if(creatures[i] == this)
                    {
                        creatures.splice(i, 1);
                        break;
                    }
                }
        }, 2000);
    }
}