import { food_list } from '../../Controller/Stores.js';
import { foodSize, creatureSize } from '../../Controller/config.js';
import { StorageManager } from '../Utilities/StorageManager.js';

export class Creature
{
    constructor(container)
    {
        this.age = 0;
        this.spawn(container);
    }

    spawn(container)
    {
        this.body = document.createElement('img');

        let rect = container.getBoundingClientRect();
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

    move()
    {
        let nearestFood = this.calculateNearestFood();
      
        if(nearestFood)
        {
            this.moveTowardsFood(nearestFood);
        }
        else
        {
            this.wander();
        }
    }

    calculateNearestFood()
    {
        let nearestFood = false;
        let nearestDistance = false;        
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

    moveTowardsFood(nearestFood)
    {
        let storageManager = new StorageManager();

        let baseLotlSpeed = storageManager.ReadSS('baseLotlSpeed')
        let dx = nearestFood.x_pos - this.x_pos;
        let dy = nearestFood.y_pos - this.y_pos;
  
        // Calculate the distance to the food
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance <= foodSize)
        {
            this.consumeFood(nearestFood);
        }
  
        // Normalize the distance to a smaller value if needed
        let movementDistance = baseLotlSpeed;
    
        // Calculate the new position based on the normalized distance
        this.x_pos += Math.round(movementDistance * dx / distance);
        this.y_pos += Math.round(movementDistance * dy / distance);    
        
        this.body.style.top = `${this.y_pos}px`;
        this.body.style.left = `${this.x_pos}px`;
    
        // Calculate the new angle towards the food
        let targetAngleRadians = Math.atan2(dy, dx);
        let targetAngleDegrees = (targetAngleRadians * (180 / Math.PI)) / 3;
        this.rotate(targetAngleDegrees);
    }

    wander()
    {

    }
}