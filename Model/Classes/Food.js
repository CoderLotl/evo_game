export class Food
{
    constructor(container)
    {
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

        this.x_pos = randomX;
        this.y_pos = randomY;

        this.body.style.position = 'absolute';
        this.body.style.top = `${randomY}px`;
        this.body.style.left = `${randomX}px`;
        this.body.src = "../Resources/plant.png";
        this.body.classList += `w-[${bodyWidth}px] h-[${bodyHeight}px] duration-500 hover:drop-shadow-[0_0_35px_rgba(51,204,51,1)] hover:saturate-150`;

        container.appendChild(this.body);
    }
}