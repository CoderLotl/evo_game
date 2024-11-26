import { food_list } from '../../Controller/Stores.js';
import { foodSize, creatureSize } from '../../Controller/config.js';
import { StorageManager } from '../Utilities/StorageManager.js';

export class Creature
{
    constructor(container, container_data)
    {
        this.age = 0;
        this.container = container_data;
        this.spawn(container);        
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
        this.disorientation = 0;
        this.energy = 0;
        this.closestFood = null;

        this.x_pos = randomX;
        this.y_pos = randomY;        

        this.body.classList += `absolute w-[${creatureSize}px] h-[${creatureSize}px] duration-500 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)] hover:saturate-150`;

        let randomDegrees = Math.floor(Math.random() * 360);
        this.rotate(randomDegrees);
        this.angle = randomDegrees;

        container.appendChild(this.body);
    }

    rotate(value)
    {
        this.body.style.transform = `rotate(${value}deg)`;
    }

    move(timeControl)
    {                
        this.moveTowardsFood(timeControl);
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
            }
        }
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

    moveTowardsFood(timeControl)
    {
        let storageManager = new StorageManager();
        let turnLength = storageManager.ReadSS('turnLength');        
        let baseLotlSpeed = storageManager.ReadSS('baseLotlSpeed');

        if(timeControl.miniTime % (turnLength * 10) == 0 || this.closestFood == null)
        {            
            if(food_list.length > 0)
            {
                this.closestFood = this.calculateNearestFood();
            }
            else
            {
                this.closestFood = this.getRandomPoint();
            }            
        }
        
        let dx = this.closestFood.x_pos - this.x_pos;
        let dy = this.closestFood.y_pos - this.y_pos;
  
        // Calculate the distance to the food
        let distance = Math.sqrt(dx * dx + dy * dy);
        if(distance == 0)
        {
            distance = 10; // If by any means distance ends being 0, then it's set to 10.
        }

        if(distance <= foodSize)
        {
            this.consumeFood(this.closestFood);
            this.closestFood = null;
        } 

        let movementDistance = baseLotlSpeed; // This can get boosted later.
    
        // Calculate the new position based on the normalized distance
        this.x_pos += Math.round(movementDistance * dx / distance);
        this.y_pos += Math.round(movementDistance * dy / distance);

        this.body.style.top = `${this.y_pos}px`;
        this.body.style.left = `${this.x_pos}px`;        
    
        // Calculate the new angle towards the food
        let targetAngleRadians = Math.atan2(dy, dx);
        let targetAngleDegrees = Math.round((targetAngleRadians * (180 / Math.PI)) / 3);
        this.rotate(targetAngleDegrees);
    }

    wander()
    {

    }
}