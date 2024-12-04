import { TimeControl } from "../Model/Classes/TimeControl.js";
import { Creature } from "../Model/Classes/Creature.js";
import { Food } from "../Model/Classes/Food.js";
import { StorageManager } from "../Model/Utilities/StorageManager.js";
import { creatures, food_list } from "./Stores.js";
import { feedingFrequency, foodToSpawn, gameOnline, baseLotlSpeed, turnLength, creaturesToSpawn, agingTime, maxAge, metabolismRate } from "./config.js";
import { drawTimer, drawGameContainer, drawPlaceHolder, drawVariablesPanel, drawVariablesPanel2, drawVariablesPanel3 } from "../View/ViewDrawing.js";

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
        let game_container_data = game_container.getBoundingClientRect();
    
        let timeControl = new TimeControl(btn_pause, btn_play, timeDisplay);
        timeControl.run();
    
        Init(game_container, game_container_data);
    
        gameLoop(timeControl, game_container);

        game_container.addEventListener('click', (event)=>
        {
            if(event.target == game_container)
            {
                let plate = document.getElementById('creature_plate');
                if(plate)
                {
                    plate.remove();
                }
            }
        });
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

    // Creatures control function
    let creaturesControl = (timeControl)=>
    {
        for(let i = 0; i < creatures.length; i++)
        {
            creatures[i].move(timeControl);
        }
    }

    // Food contrl function
    let foodControl = ()=>
    {
        let foodToSpawn = storageManager.ReadSS('foodToSpawn');
        
        for(let i = 0; i < foodToSpawn; i++)
        {            
            let newFood = new Food(game_container);
            food_list.push(newFood);
        }
    };

    //--------------------------------------------------
    // - - - - - - - [ Game Loop ]
    //--------------------------------------------------
    let loop = setInterval(() =>
    {
        if(timeControl.isPaused != true)
        {            
            creaturesControl(timeControl);
            
            if(checkFeedingTime(timeControl) && creatures.length > 0)
            {
                foodControl();
                storageManager.WriteSS('lastFed', timeControl.time);
            }

            timeControl.miniTime += 1;
        }
    }, 100);
}

// ----------------------------------------------------

function Init(container, container_data)
{
    let storageManager = new StorageManager();
    let creaturesToSpawn = storageManager.ReadSS('creaturesToSpawn');
    let foodToSpawn = storageManager.ReadSS('foodToSpawn');
    
    // Spawn creatures
    for(let i = 0; i < creaturesToSpawn; i++)
    {
        let creature = new Creature(container, container_data, i);        
        creatures.push(creature);
    }

    // Spawn food
    for(let i = 0; i < foodToSpawn; i++)
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
    drawVariablesPanel2();
    drawVariablesPanel3();
    drawGameContainer();
}

function loadVariables()
{
    let storageManager = new StorageManager();

    if(!storageManager.ReadSS('foodToSpawn'))
    {
        storageManager.WriteSS('foodToSpawn', foodToSpawn);
    }
    if(!storageManager.ReadSS('feedingFrequency'))
    {
        storageManager.WriteSS('feedingFrequency', feedingFrequency);
    }
    if(!storageManager.ReadSS('baseLotlSpeed'))
    {
        storageManager.WriteSS('baseLotlSpeed', baseLotlSpeed);
    }    
    // if(!storageManager.ReadSS('creaturesToSpawn'))
    // {
    //     storageManager.WriteSS('creaturesToSpawn', creaturesToSpawn);
    // }
    storageManager.WriteSS('creaturesToSpawn', creaturesToSpawn);
    if(!storageManager.ReadSS('agingTime'))
    {
        storageManager.WriteSS('agingTime', agingTime);
    }
    if(!storageManager.ReadSS('maxAge'))
    {
        storageManager.WriteSS('maxAge', maxAge);
    }

    storageManager.WriteSS('metabolismRate', metabolismRate);    
    storageManager.WriteSS('turnLength', turnLength);
    storageManager.WriteSS('lastFed', 0);

    storageManager.WriteSS('females', 0);
    storageManager.WriteSS('males', 0);
}

function checkFeedingTime(timeControl)
{    
    let storageManager = new StorageManager();
    let lastFed = parseInt(storageManager.ReadSS('lastFed'));
    let feedingFrequency = parseInt(storageManager.ReadSS('feedingFrequency'));
    let time = parseInt(timeControl.time);

    return ((lastFed + feedingFrequency) < time);
}