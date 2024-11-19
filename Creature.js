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
        this.body.src = "./ax.webp";

        this.x_pos = randomX;
        this.y_pos = randomY;

        this.body.classList +='absolute w-[50px] h-[50px] duration-500 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)] hover:saturate-150';

        let randomDegrees = Math.floor(Math.random() * 360);
        this.rotate(randomDegrees);

        container.appendChild(this.body);
    }

    rotate(value)
    {
        this.body.style.transform = `rotate(${value}deg)`;
    }
}