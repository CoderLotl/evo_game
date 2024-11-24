import { TimeControl } from "../Model/Classes/TimeControl.js";
import { Creature } from "../Model/Classes/Creature.js";
import { Food } from "../Model/Classes/Food.js";
import { creatures, food_list } from "./Stores.js";
import { feedingFrequency, foodToSpawn, gameOnline } from "./config.js";

////////////////////////////////
// - - - - - - - - - - CORE
////////////////////////////////

document.addEventListener('DOMContentLoaded', ()=>
{
    if(gameOnline)
    {
        setupGame();
        let btn_pause = document.getElementById('btn_pause');
        let btn_play = document.getElementById('btn_play');
        let timeDisplay = document.getElementById('time_counter');
        let game_container = document.getElementById('game_container');    
    
        let timeControl = new TimeControl(btn_pause, btn_play, timeDisplay);
        timeControl.run();
    
        Init(game_container);
    
        gameLoop(timeControl, game_container);
    }
    else
    {
        setupPlaceholder();
    }
});

////////////////////////////////
// - - - - - - - - - - FUNCTIONS
////////////////////////////////

function gameLoop(timeControl, game_container)
{
    //Variables
    let alreadyFeed = true;

    let creaturesControl = ()=>
    {
        for(let i = 0; i < creatures.length; i++)
        {
            creatures[i].move();
        }
    }

    let foodControl = ()=>
    {
        for(let i = 0; i < foodToSpawn; i++)
        {
            let newFood = new Food(game_container);
            food_list.push(newFood);
        }
    };

    let loop = setInterval(() =>
    {
        if(timeControl.isPaused != true)
        {
            creaturesControl();            

            if(timeControl.time % feedingFrequency == 0 && !alreadyFeed)
            {
                foodControl();
                alreadyFeed = true;
            }
            if(timeControl.time % feedingFrequency != 0 && alreadyFeed)
            {
                alreadyFeed = false;
            }
        }
    }, 100);
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

function setupGame()
{
    let bottomBar = document.getElementById('bottom_bar');
    let container = document.createElement('div');
    container.classList += "w-full h-full bg-slate-300 p-2";

    document.body.insertBefore(container, bottomBar);

    container.innerHTML = `<!-- CONTROL PANEL -->
    <div class="bg-slate-500 absolute top-0 p-3 rounded-xl">
        <div id="time-control">
            <button id="btn_pause" class="rounded-3xl border border-black w-10">
                ||
            </button>
            <button id="btn_play" class="rounded-3xl border border-black w-10">
                >
            </button>
        </div>
        <div id="time_counter_panel" class="mt-2 pl-2 text-amber-400">
            Time: <span id="time_counter" class="text-slate-200"></span>
        </div>
    </div>
    
    <!-- GAME HERE -->
    <div id="game_container" class="w-full h-full bg-gray-800 rounded-md p-2">
        
    </div>`;
}

function setupPlaceholder()
{
    let bottomBar = document.getElementById('bottom_bar');
    let container = document.createElement('div');
    container.classList += "w-full h-full bg-slate-300 p-2";

    document.body.insertBefore(container, bottomBar);

    container.innerHTML = `
    
    <div id="game_container" class="w-full h-full bg-gray-800 rounded-md p-2 flex flex-col justify-center items-center">
        <img src="./Resources/ax.webp" class="duration-500 hover:drop-shadow-[0_0_35px_rgba(255,102,102,1)] hover:saturate-150">
        <span class="text-slate-300 italic ">"We'll be back soon..." ™</span>
    </div>

    `;
}