import { foodSize } from "../../Controller/config.js";
import { food_list } from '../../Controller/Stores.js';

export class Food
{
    constructor(container)
    {
        this.spawn(container);
        this.exists = true;
    }

    spawn(container)
    {
        this.body = document.createElement('img');        

        let rect = container.getBoundingClientRect();
        let minX = rect.left;
        let minY = rect.top;
        let maxX = minX + rect.width - foodSize;
        let maxY = minY + rect.height - foodSize;        

        const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY);

        this.x_pos = randomX;
        this.y_pos = randomY;

        this.body.style.position = 'absolute';
        this.body.style.top = `${randomY}px`;
        this.body.style.left = `${randomX}px`;
        this.body.src = "../Resources/plant.png";
        this.body.style.width = `${foodSize}px`;
        this.body.style.height = `${foodSize}px`;
        this.body.classList += `duration-500 hover:drop-shadow-[0_0_35px_rgba(51,204,51,1)] hover:saturate-150`;

        container.appendChild(this.body);
    }

    consume()
    {
        this.body.classList += 'transition-all ease-in-out';
        this.body.style.width = '0px';
        this.body.style.height = '0px';
        this.exists = false;
        
        setTimeout(() =>
        {
            this.body.remove();

            for(let i = 0; i < food_list.length; i++)
            {
                if(food_list[i] == this)
                {
                    food_list.splice(i, 1);
                    break;
                }
            }
        }, 250);
    }
}