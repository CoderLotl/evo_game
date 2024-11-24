import { TimeControl } from "../Model/Classes/TimeControl.js";
import { Creature } from "../Model/Classes/Creature.js";
import { Food } from "../Model/Classes/Food.js";
import { StorageManager } from "../Model/Utilities/StorageManager.js";
import { creatures, food_list } from "./Stores.js";
import { feedingFrequency, foodToSpawn, gameOnline } from "./config.js";
import { drawTimer, drawGameContainer, drawPlaceHolder, drawVariablesPanel } from "../View/ViewDrawing.js";

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
        drawPlaceHolder();
    }
});

////////////////////////////////
// - - - - - - - - - - FUNCTIONS
////////////////////////////////

function gameLoop(timeControl, game_container)
{
    let storageManager = new StorageManager();    

    let creaturesControl = ()=>
    {
        for(let i = 0; i < creatures.length; i++)
        {
            creatures[i].move();
        }
    }

    let foodControl = ()=>
    {
        let foodToSpawn = storageManager.ReadSS('foodToSpawn');
        console.log(foodToSpawn);
        
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
            let feedingFrequency_ = storageManager.ReadLS('feedingFrequency');
            creaturesControl();
            
            if(checkFeedingTime(timeControl))
            {
                foodControl();
                storageManager.WriteSS('lastFed', timeControl.time);
            }
        }
    }, 100);
}

// ----------------------------------------------------

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
    loadVariables();
    drawTimer();
    drawVariablesPanel();
    drawGameContainer();    
}

function loadVariables()
{
    let storageManager = new StorageManager();

    storageManager.WriteSS('foodToSpawn', foodToSpawn);
    storageManager.WriteSS('feedingFrequency', feedingFrequency);
    storageManager.WriteSS('lastFed', 0);
}

function checkFeedingTime(timeControl)
{
    let storageManager = new StorageManager();
    let lastFed = parseInt(storageManager.ReadSS('lastFed'));
    let feedingFrequency = parseInt(storageManager.ReadSS('feedingFrequency'));
    let time = parseInt(timeControl.time);

    return ((lastFed + feedingFrequency) < time);
}