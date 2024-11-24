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
    variablesPanel.classList = 'ml-5';

    //Food container
    let foodContainer = document.createElement('div');
    variablesPanel.append(foodContainer);
    foodContainer.classList = 'flex flex-col justify-center';

    let food_label = document.createElement('label');
    foodContainer.append(food_label);
    food_label.htmlFor = 'food_to_spawn';
    food_label.textContent = 'Food to spawn';
    food_label.classList = 'text-slate-200';

    let nud_food = document.createElement('input');
    foodContainer.append(nud_food);
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