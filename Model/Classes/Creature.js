import { food_list, creatures } from '../../Controller/Stores.js';
import { foodSize, creatureSize, nutrition, minimumMatingAge } from '../../Controller/config.js';
import { StorageManager } from '../Utilities/StorageManager.js';
import { drawCreaturePlate, updateEnergy, updateAge, removeCreaturePlate } from '../../View/ViewDrawing.js';

export class Creature
{
    constructor(container, container_data, number, randomSpawn = true, position = false)
    {
        this.age = 0;
        this.lotlNumber = number+1;
        this.name = `Lotl ${number+1}`;
        this.maxAge = this.setMaxAge();
        this.container = container_data;
        this.containerId = container.id;
        this.spawn(container, randomSpawn, position);
        this.disorientation = 0;
        this.energy = 50;
        this.destinationPoint = null;
        this.destinationIsFood = false;
        this.updatedContainer = false;
        this.randomTurnLength = 0;
        this.dying = false;
        this.activePlate = false;
        this.mating = false;
        this.mateName = false;
        this.matingTimer = 0;
        this.matingCooldown = 0;

        this.setGender();
    }

    spawn(container, randomSpawn, position = false)
    {
        this.body = document.createElement('img');

        let pointX;
        let pointY;

        if(randomSpawn)
        {
            let rect = this.container;
            let minX = rect.left;
            let minY = rect.top;
            let maxX = minX + rect.width - creatureSize;
            let maxY = minY + rect.height - creatureSize;
            pointX = Math.floor(Math.random() * (maxX - minX) + minX);
            pointY = Math.floor(Math.random() * (maxY - minY) + minY);
        }
        else
        {
            pointX = position.x_pos;
            pointY = position.y_pos;
        }
        
        this.body.style.top = `${pointY}px`;
        this.body.style.left = `${pointX}px`;        
        this.body.src = "../Resources/ax.webp";

        this.x_pos = pointX;
        this.y_pos = pointY;        

        this.body.classList += `absolute w-[${creatureSize}px] h-[${creatureSize}px] duration-500 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)] hover:saturate-150`;
        this.body.title = this.name;

        let randomDegrees = Math.floor(Math.random() * 360);
        this.rotate(randomDegrees);        

        container.appendChild(this.body);
        
        this.body.addEventListener('click', ()=>
        {
            drawCreaturePlate(container, this);
            for(let i = 0; i < creatures.length; i++)
            {
                if(creatures[i] != this)
                {
                    creatures[i].activePlate = false;
                }
                else
                {
                    creatures[i].activePlate = true;
                }
            }
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
        this.metabolismTick(timeControl);
    }

    seekForMate()
    {        
        let nearestDistance = false;
        if(creatures.length > 0 && creatures.some(element => element.genderValue == 0 && !element.mating && !element.dying && element.age >= minimumMatingAge && element.matingCooldown == 0))
        {
            for(let i = 0; i < creatures.length; i++)
            {
                if(creatures[i].genderValue == 0 && !creatures[i].mating && !creatures[i].dying && creatures[i].age >= minimumMatingAge && creatures[i].matingCooldown == 0)
                {
                    let dx = creatures[i].x_pos - this.x_pos;
                    let dy = creatures[i].y_pos - this.y_pos;        
                    let distance = Math.round(Math.sqrt(dx * dx + dy * dy));                    
        
                    if(nearestDistance == false || nearestDistance > distance)
                    {
                        nearestDistance = distance;
                        
                        this.destinationPoint = {x_pos: creatures[i].x_pos, y_pos: creatures[i].y_pos};                        
                        this.destinationIsFood = false;                        
                        this.mating = true;
                        this.mateName = creatures[i].name;
                        
                        creatures[i].destinationPoint = {x_pos: this.x_pos, y_pos: this.y_pos};
                        this.destinationIsFood = false;
                        creatures[i].mating = true;
                        creatures[i].mateName = this.name;
                        creatures[i].matingTimer = 30;
                        break;
                    }
                }
            }
        }        
    }

    updateMatePosition()
    {
        if(creatures.length > 0)
        {
            let mateFound = false;
            for(let i = 0; i < creatures.length; i++)
            {
                if(creatures[i].name == this.mateName)
                {                    
                    if(creatures[i].dying)
                    {
                        this.destinationPoint = null;
                        this.mating = false;
                        this.mateName = false;
                    }
                    else
                    {
                        mateFound = true;
                        this.destinationPoint = {x_pos: creatures[i].x_pos, y_pos: creatures[i].y_pos};
                    }
                    break;
                }
            }

            if(!mateFound)
            {
                this.mating = false;
                this.mateName = false;
                this.destinationPoint = null;
            }
        }
        else
        {
            this.mating = false;
            this.mateName = false;
            this.destinationPoint = null;
        }
    }

    mate()
    {
        for(let i = 0; i < creatures.length; i++)
        {
            if(creatures[i].name == this.mateName)
            {
                creatures[i].matingTimer--;
                if(creatures[i].matingTimer == 0)
                {
                    this.mating = false;
                    this.mateName = false;
                    this.destinationPoint = null;
                    
                    creatures[i].mating = false;
                    creatures[i].mateName = false;
                    creatures[i].destinationPoint = null;
                    creatures[i].matingCooldown = 1;

                    let game_container = document.getElementById('game_container');
                    let game_container_data = game_container.getBoundingClientRect();
                    let newLotlNumber = this.findLastLotl();

                    let newLotl = new Creature(game_container, game_container_data, newLotlNumber, false, {x_pos: creatures[i].x_pos, y_pos: creatures[i].y_pos});
                    creatures.push(newLotl);
                    break;
                }
            }
        }
    }

    findLastLotl()
    {
        let lastLotl = false;
        for(let i = 0; i < creatures.length; i++)
        {
            if(!lastLotl || creatures[i].lotlNumber > lastLotl)
            {
                lastLotl = creatures[i].lotlNumber;
            }
        }

        return lastLotl;
    }

    metabolismTick(timeControl)
    {
        let storageManager = new StorageManager();
        let metabolismRate = storageManager.ReadSS('metabolismRate');        

        if(metabolismRate != 0 && timeControl.miniTime != 0 && timeControl.miniTime % (10 - metabolismRate) == 0)
        {
            this.energy -= 1;
            updateEnergy(this);
            if(this.energy <= 0)
            {
                this.die();
            }
        }
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
        
        if(!this.mating && this.genderValue == 1 && this.age >= 5)
        {
            this.seekForMate();
        }
        else if(this.mating)
        {
            this.updateMatePosition();
        }

        if(!this.mating && (timeControl.miniTime % ((turnLength + this.randomTurnLength) * 10) == 0 || this.destinationPoint == null))
        {
            
            if(food_list.length > 0 && food_list.some(element => element.exists))
            {
                this.destinationPoint = this.calculateNearestFood();
                this.destinationIsFood = true;
            }
            else
            {
                this.destinationPoint = this.getRandomPoint();
                this.destinationIsFood = false;
            }

            // Updating the knowledge of the game container's size.
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
        let dx = this.destinationPoint.x_pos - this.x_pos;
        let dy = this.destinationPoint.y_pos - this.y_pos;        

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
        dx = this.destinationPoint.x_pos - this.x_pos;
        dy = this.destinationPoint.y_pos - this.y_pos;
        let distanceToDestination = Math.sqrt(dx * dx + dy * dy);

        // ----------------------
        // Changing the body's orientation and position
        // ----------------------
        this.body.style.top = `${this.y_pos}px`;
        this.body.style.left = `${this.x_pos}px`;        
    
        // Calculate the new angle towards the food
        //let targetAngleRadians = Math.atan2(dy, dx);
        let targetAngleDegrees = Math.round((targetAngleRadians * (180 / Math.PI)) / 3);
        this.rotate(targetAngleDegrees);

        // ----------------------
        // ARRIVAL
        // ----------------------

        // EAAAAAAAAATTT!! ÑAM!!
        if(distanceToDestination <= foodSize - 20 && !this.dying)
        {
            if(this.destinationIsFood)
            {
                let foodConsumed = this.consumeFood(this.destinationPoint);
                if(foodConsumed)
                {                    
                    this.energy += nutrition;
                    if(this.activePlate)
                    {
                        updateEnergy(this);
                    }                    
                }
            }
            else if(this.mating && this.genderValue == 1)
            {
                this.mate();
            }
            this.destinationPoint = null;
        }        
    }

    calculateNearestFood()
    {
        let nearestFood = null;
        let nearestDistance = false;
        if(food_list.length > 0)
        {
            for(let i = 0; i < food_list.length; i++)
            {
                if(food_list[i].exists)
                {
                    let dx = food_list[i].x_pos - this.x_pos;        
                    let dy = food_list[i].y_pos - this.y_pos;        
                    let distance = Math.round(Math.sqrt(dx * dx + dy * dy));
        
                    if(nearestDistance == false || nearestDistance > distance)
                    {
                        nearestDistance = distance;
                        nearestFood = {x_pos: food_list[i].x_pos, y_pos: food_list[i].y_pos};
                    }
                }
            }
        }

        return nearestFood;
    }

    consumeFood(nearestFood)
    {
        for(let i = 0; i < food_list.length; i++)
        {
            if(food_list[i].x_pos == nearestFood.x_pos && food_list[i].y_pos == nearestFood.y_pos && food_list[i].exists)
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

        let pointX = Math.floor(Math.random() * (maxX - minX) + minX);
        let pointY = Math.floor(Math.random() * (maxY - minY) + minY);

        return {x_pos: pointX, y_pos: pointY};
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
        
        if(timeControl.miniTime != 0 && timeControl.miniTime % (agingTime * 10) == 0 && !this.dying)
        {
            this.age += 1;

            if(this.age >= this.maxAge)
            {
                this.die();
            }
            
            if(this.activePlate)
            {
                updateAge(this);                
            }
        }
    }

    die()
    {
        let storageManager = new StorageManager();
        let males = storageManager.ReadSS('males');
        let females = storageManager.ReadSS('females');

        if(this.genderValue == 0)
        {
            storageManager.WriteSS('females', females-1);
        }
        else
        {
            storageManager.WriteSS('males', males-1);
        }

        this.body.classList.add('dying-creature');
        this.dying = true;
        removeCreaturePlate(this);
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
        }, 1000);
    }

    setGender()
    {
        let storageManager = new StorageManager();
        let males = storageManager.ReadSS('males');
        let females = storageManager.ReadSS('females');

        if(females == 0 || males == 0)
        {
            if(females == 0)
            {
                storageManager.WriteSS('females', females+1);
                this.gender = 'female ♀';            
                this.genderValue = 0;
            }
            else
            {
                storageManager.WriteSS('males', males+1);
                this.gender = 'male ♂';
                this.genderValue = 1;
            }
        }
        else
        {
            let gender = Math.floor(Math.random() * 2);
            if(gender == 0)
            {
                storageManager.WriteSS('males', males+1);
                this.gender = 'male ♂';
                this.genderValue = 1;
            }
            else
            {
                storageManager.WriteSS('females', females+1);
                this.gender = 'female ♀';
                this.genderValue = 0;                
            }
            this.mating = false;
        }
    }
}