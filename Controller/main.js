import { TimeControl } from "../Model/Classes/TimeControl.js";
import { Creature } from "../Model/Classes/Creature.js";
import { Food } from "../Model/Classes/Food.js";
import { creatures, food_list } from "./Stores.js";

let lastTime = 0;
const desiredFPS = 60;

////////////////////////////////
// - - - - - - - - - - CORE
////////////////////////////////

document.addEventListener('DOMContentLoaded', ()=>
{
    let btn_pause = document.getElementById('btn_pause');
    let btn_play = document.getElementById('btn_play');
    let timeDisplay = document.getElementById('time_counter');
    let game_container = document.getElementById('game_container');    

    let timeControl = new TimeControl(btn_pause, btn_play, timeDisplay);
    timeControl.run();

    Init(game_container);
});

////////////////////////////////
// - - - - - - - - - - FUNCTIONS
////////////////////////////////

function gameLoop(func)
{
    const deltaTime = currentTime - lastTime;
    const interval = 1000 / desiredFPS;

    if(deltaTime >= interval)
    {
        lastTime = currentTime;
    
        // Your code to be executed
        console.log("Iteration!");
        requestAnimationFrame(()=> gameLoop(func));
    }
    else
    {
        requestAnimationFrame(()=> gameLoop(func));
    }
}

function Init(container)
{
    for(let i = 0; i < 5; i++)
    {
        let creature = new Creature(container);
        creatures.push(creature);
    }
    for(let i = 0; i < 5; i++)
    {
        let food = new Food(container);
        food_list.push(food);
    }
}