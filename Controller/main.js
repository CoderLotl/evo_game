import { TimeControl } from "../Model/Classes/TimeControl.js";
import { Creature } from "../Model/Classes/Creature.js";
import { Food } from "../Model/Classes/Food.js";
import { creatures, food_list } from "./Stores.js";

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

    let func = ()=>
    {
        for(let i = 0; i < creatures.length; i++)
        {
            creatures[i].move();
        }
    }
    
    //creatures[0].move();
    //console.log(creatures);
    gameLoop(func, timeControl);
});

////////////////////////////////
// - - - - - - - - - - FUNCTIONS
////////////////////////////////

function gameLoop(func, timeControl)
{
    let loop = setInterval(() =>
    {
        if(timeControl.isPaused != true)
        {
            func();
        }
    }, 100);
}

function Init(container)
{
    for(let i = 0; i < 1; i++)
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