import { food_list } from '../../Controller/Stores.js';

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

        let bodyWidth = 50;
        let bodyHeight = 50;

        let rect = container.getBoundingClientRect();
        let minX = rect.left;
        let minY = rect.top;
        let maxX = minX + rect.width - bodyWidth;
        let maxY = minY + rect.height - bodyHeight;        

        const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY);
        
        this.body.style.top = `${randomY}px`;
        this.body.style.left = `${randomX}px`;        
        this.body.src = "../Resources/ax.webp";

        this.x_pos = randomX;
        this.y_pos = randomY;        

        this.body.classList +='absolute w-[50px] h-[50px] duration-500 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)] hover:saturate-150';

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
            let turnAngle = this.calculateTurnAngle(nearestFood);

            this.rotate(turnAngle);

            let arrivalPoint = this.calculateArrivalPoint(3);

            this.x_pos = arrivalPoint.x;
            this.y_pos = arrivalPoint.y;

            this.body.style.top = `${this.y_pos}px`;
            this.body.style.left = `${this.x_pos}px`;
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

    calculateTurnAngle(nearestFood)
    {
        let dx = nearestFood.x_pos - this.x_pos;
        let dy = nearestFood.y_pos - this.y_pos;

        let targetAngleRadians = Math.atan2(dy, dx);
        let targetAngleDegrees = targetAngleRadians * (180 / Math.PI);
        let turnAngle = targetAngleDegrees - this.angle;

        if(turnAngle > 180)
        {
            turnAngle -= 360;
        }
        else if(turnAngle < -180)
        {
            turnAngle += 360;
        }

        return turnAngle;
    }

    calculateArrivalPoint(distance)
    {
        let radians = this.angle * (Math.PI / 180);
        let dx = Math.round(distance * Math.cos(radians));
        let dy = Math.round(distance * Math.sin(radians));
    
        return { x: this.x_pos + dx, y: this.y_pos + dy };
    }
}