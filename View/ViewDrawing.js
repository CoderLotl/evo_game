import { foodToSpawn } from "../Controller/config.js";
import { StorageManager } from "../Model/Utilities/StorageManager.js";

export function drawTimer()
{
    let timerControlContainer = document.createElement('div');
    timerControlContainer.classList = 'bg-slate-500 top-0 p-3 rounded-xl';
    document.getElementById('game_bar').append(timerControlContainer);

    let timerControl = document.createElement('div');
    timerControl.id = 'time-control';
    timerControlContainer.append(timerControl);

    let btn_pause = document.createElement('button');
    timerControl.append(btn_pause);
    btn_pause.classList = 'rounded-3xl border border-black w-10';
    btn_pause.id = 'btn_pause';
    btn_pause.textContent = '||';

    let btn_play = document.createElement('button');
    timerControl.append(btn_play);
    btn_play.id = 'btn_play';
    btn_play.classList = 'rounded-3xl border border-black w-10';
    btn_play.textContent = '>';

    let time_counter_panel = document.createElement('div');
    timerControlContainer.append(time_counter_panel);
    time_counter_panel.id = 'time_counter_panel';
    time_counter_panel.classList = 'mt-2 pl-2 text-amber-400';
    time_counter_panel.innerHTML = 'Time: <span id="time_counter" class="text-slate-200"></span>';
}

export function drawVariablesPanel()
{
    let storageManager = new StorageManager();

    // Variables container
    let variablesPanel = document.createElement('div');
    document.getElementById('game_bar').append(variablesPanel);
    variablesPanel.id = 'variables_panel';
    variablesPanel.classList = 'ml-5 mb-2';

    //Food Spawn container
    let foodContainer_Spawn = document.createElement('div');
    variablesPanel.append(foodContainer_Spawn);
    foodContainer_Spawn.classList = 'flex flex-col justify-center';

    //Food Spawn Label
    let food_label = document.createElement('label');
    foodContainer_Spawn.append(food_label);
    food_label.htmlFor = 'food_to_spawn';
    food_label.textContent = 'Food to spawn';
    food_label.classList = 'text-slate-200';

    //Food Spawn Input
    let nud_food = document.createElement('input');
    foodContainer_Spawn.append(nud_food);
    nud_food.type = 'number';
    nud_food.min = '0';
    nud_food.max = '100';
    nud_food.value = storageManager.ReadLS('foodToSpawn');
    nud_food.id = 'food_to_spawn';
    nud_food.name = 'food_to_spawn';

    nud_food.addEventListener('change', ()=>
    {
        storageManager.WriteLS('foodToSpawn', nud_food.value);
    });

    //Food Quantity container
    let foodContainer_Frequency = document.createElement('div');
    variablesPanel.append(foodContainer_Frequency);
    foodContainer_Frequency.classList = 'flex flex-col justify-center';

    //Food Frequency Label
    let food_label_fr = document.createElement('label');
    foodContainer_Frequency.append(food_label_fr);
    food_label_fr.htmlFor = 'food_frequency';
    food_label_fr.textContent = 'Food frequency';
    food_label_fr.classList = 'text-slate-200';

    //Food Frequency Input
    let nud_food_fr = document.createElement('input');
    foodContainer_Frequency.append(nud_food_fr);
    nud_food_fr.type = 'number';
    nud_food_fr.min = '0';
    nud_food_fr.max = '100';
    nud_food_fr.value = storageManager.ReadLS('feedingFrequency');
    nud_food_fr.id = 'food_frequency';
    nud_food_fr.name = 'food_frequency';

    nud_food_fr.addEventListener('change', ()=>
    {
        storageManager.WriteLS('feedingFrequency', nud_food_fr.value);
    });
}

export function drawGameContainer()
{
        // GAME CONTAINER
        let bottomBar = document.getElementById('bottom_bar');
        let container = document.createElement('div');
        container.classList += "w-full h-full bg-slate-300 p-2";
    
        document.body.insertBefore(container, bottomBar);
    
        container.innerHTML = `    
        <!-- GAME HERE -->
        <div id="game_container" class="w-full h-full bg-gray-800 rounded-md p-2">
            
        </div>`;
}

export function drawPlaceHolder()
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