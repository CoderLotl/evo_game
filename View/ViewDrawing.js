import { foodToSpawn } from "../Controller/config.js";
import { StorageManager } from "../Model/Utilities/StorageManager.js";
import { creatures } from "../Controller/Stores.js";

export function drawTimer()
{
    let timerControlContainer = document.createElement('div');
    timerControlContainer.classList = 'bg-slate-500 top-0 p-3 rounded-xl ml-2';
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

export function drawVariablesPanel3()
{
    let storageManager = new StorageManager();

    let variablesPanel3 = document.createElement('div');
    document.getElementById('game_bar').append(variablesPanel3);
    variablesPanel3.id = 'variables_panel3';
    variablesPanel3.classList = 'ml-5 mb-2 flex flex-col';

    let specialContainer = document.createElement('div');
    variablesPanel3.append(specialContainer);
    specialContainer.classList = 'flex justify-center items-center grow';

    let resetButton = document.createElement('button');
    specialContainer.append(resetButton);
    resetButton.textContent = 'RESET';
    resetButton.classList = 'bg-red-700 hover:bg-red-500 duration-300 p-2 rounded-md self-start mt-3';

    resetButton.addEventListener('click', ()=>
    {
        storageManager.RemoveSS('foodToSpawn');
        storageManager.RemoveSS('feedingFrequency');
        storageManager.RemoveSS('baseLotlSpeed');
        storageManager.RemoveSS('creaturesToSpawn');
        storageManager.RemoveSS('agingTime');
        storageManager.RemoveSS('maxAge');
        location.reload();            
    });
}

export function drawVariablesPanel2()
{
    let storageManager = new StorageManager();

    let variablesPanel2 = document.createElement('div');
    document.getElementById('game_bar').append(variablesPanel2);
    variablesPanel2.id = 'variables_panel2';
    variablesPanel2.classList = 'ml-5';

    let lotlsContainer = document.createElement('div');
    variablesPanel2.append(lotlsContainer);
    lotlsContainer.classList = 'flex flex-col justify-center';

    let lotlsSpeed_label = document.createElement('label');
    lotlsContainer.append(lotlsSpeed_label);
    lotlsSpeed_label.htmlFor = 'lotls_speed';
    lotlsSpeed_label.textContent = 'Lotls base speed';
    lotlsSpeed_label.classList = 'text-slate-200';

    let nud_lotlsSpeed = document.createElement('input');
    lotlsContainer.append(nud_lotlsSpeed);
    nud_lotlsSpeed.type = 'number';
    nud_lotlsSpeed.min = '0';
    nud_lotlsSpeed.max = '25';
    nud_lotlsSpeed.value = storageManager.ReadSS('baseLotlSpeed');
    nud_lotlsSpeed.id = 'lotls_speed'
    nud_lotlsSpeed.name = 'lotls_speed';

    nud_lotlsSpeed.addEventListener('change', ()=>
    {
        storageManager.WriteSS('baseLotlSpeed', nud_lotlsSpeed.value);
    });
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
    nud_food.value = storageManager.ReadSS('foodToSpawn');
    nud_food.id = 'food_to_spawn';
    nud_food.name = 'food_to_spawn';

    nud_food.addEventListener('change', ()=>
    {
        storageManager.WriteSS('foodToSpawn', nud_food.value);
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
    nud_food_fr.value = storageManager.ReadSS('feedingFrequency');
    nud_food_fr.id = 'food_frequency';
    nud_food_fr.name = 'food_frequency';

    nud_food_fr.addEventListener('change', ()=>
    {
        storageManager.WriteSS('feedingFrequency', nud_food_fr.value);
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

export function drawCreaturePlate(container, creature)
{
    if(document.getElementById('creature_plate'))
    {
        document.getElementById('creature_plate').remove();
    }

    let plate = document.createElement('span');
    container.append(plate);
    plate.classList = 'min-w-[100px] min-h-[100px] bg-slate-300 absolute rounded-md flex flex-col p-2 italic z-40';
    plate.id = 'creature_plate';
    plate.dataset.creature = creature.name;

    let nameSpan = document.createElement('span');
    plate.append(nameSpan);
    nameSpan.textContent = 'Name: ';
    let pName = document.createElement('span');
    nameSpan.append(pName);
    pName.classList = 'font-semibold cursor-pointer';
    pName.textContent = creature.name;

    let ageSpan = document.createElement('span');
    plate.append(ageSpan);
    ageSpan.textContent = 'Age: ';
    let pAge = document.createElement('span');
    ageSpan.append(pAge);
    pAge.classList = 'font-semibold';
    pAge.textContent = creature.age;
    pAge.id = 'creature-age';

    let genderSpan = document.createElement('span');
    plate.append(genderSpan);
    genderSpan.textContent = 'Gender: ';
    let pGender = document.createElement('span');
    genderSpan.append(pGender);
    pGender.classList = 'font-semibold';
    pGender.textContent = creature.gender;

    let energySpan = document.createElement('span');
    plate.append(energySpan);
    energySpan.textContent = 'Energy: ';
    let pEnergy = document.createElement('span');
    energySpan.append(pEnergy);
    pEnergy.classList = 'font-semibold';
    pEnergy.textContent = creature.energy;
    pEnergy.id = 'creature-energy';

    let matingSpan = document.createElement('span');
    plate.append(matingSpan);
    matingSpan.textContent = 'Mating: ';
    let pMating = document.createElement('span');
    matingSpan.append(pMating);
    pMating.classList = 'font-semibold';
    pMating.textContent = creature.mating? 'Yes' : 'No';
    pMating.id = 'creature-mating';

    let mateSpan = document.createElement('span');
    plate.append(mateSpan);
    mateSpan.textContent = 'Mate: ';
    let pMate = document.createElement('span');
    mateSpan.append(pMate);
    pMate.classList = 'font-semibold cursor-pointer';
    pMate.textContent = creature.mateName ? creature.mateName : 'None';
    pMate.id = 'creature-mate';

    if(creature.genderValue == 0)
    {
        let mateCooldownSpan = document.createElement('span');
        plate.append(mateCooldownSpan);
        mateCooldownSpan.textContent = 'Mating Cooldown: ';
        let pMateCooldown = document.createElement('span');
        mateCooldownSpan.append(pMateCooldown);
        pMateCooldown.classList = 'font-semibold';
        pMateCooldown.textContent = creature.matingCooldown;
        pMateCooldown.id = 'mating-cooldown';
    }

    pName.addEventListener('mouseover', ()=>
    {
        for(let i = 0; i < creatures.length; i++)
        {
            if(creatures[i].name == creature.name)
            {
                creatures[i].body.classList.add('drop-shadow-[0_0_35px_rgba(255,102,102,1)]');
                break;
            }
        }
    });

    pName.addEventListener('mouseout', ()=>
    {
        for(let i = 0; i < creatures.length; i++)
        {
            if(creatures[i].name == creature.name)
            {
                creatures[i].body.classList.remove('drop-shadow-[0_0_35px_rgba(255,102,102,1)]');
                break;
            }
        }
    });

    if(creature.mateName)
    {
        pMate.addEventListener('mouseover', ()=>
        {
            if(creature.mateName)
            {
                for(let i = 0; i < creatures.length; i++)
                {
                    if(creatures[i].name == creature.mateName)
                    {
                        creatures[i].body.classList.add('drop-shadow-[0_0_35px_rgba(100,235,52,1)]');
                        break;
                    }
                }
            }
        });
    
        pMate.addEventListener('mouseout', ()=>
        {
            if(creature.mateName)
            {
                for(let i = 0; i < creatures.length; i++)
                {
                    if(creatures[i].name == creature.mateName)
                    {
                        creatures[i].body.classList.remove('drop-shadow-[0_0_35px_rgba(100,235,52,1)]');
                        break;
                    }
                }
            }
        });
    }
}

export function removeCreaturePlate(creature)
{
    let plate = document.querySelectorAll(`[data-creature="${creature.name}"]`);

    if(plate.length > 0)
    {
        plate[0].remove();
    }
}

export function updateEnergy(creature)
{
    let plate = document.querySelectorAll(`[data-creature="${creature.name}"]`);
    
    if(plate.length > 0)
    {        
        let creature_energy = document.getElementById('creature-energy');
        creature_energy.textContent = creature.energy;
    }
}

export function updateAge(creature)
{
    let plate = document.querySelectorAll(`[data-creature="${creature.name}"]`);
    
    if(plate.length > 0)
    {
        let creature_age = document.getElementById('creature-age');
        creature_age.textContent = creature.age;
    }
}

export function updateMatingCooldown(creature)
{
    let plate = document.querySelectorAll(`[data-creature="${creature.name}"]`);

    if(plate.length > 0)
    {
        let creature_mating_cooldown = document.getElementById('mating-cooldown');
        creature_mating_cooldown.textContent = creature.matingCooldown;
    }
}

export function updateMating(creature)
{
    let plate = document.querySelectorAll(`[data-creature="${creature.name}"]`);

    if(plate.length > 0)
    {
        let creature_mating = document.getElementById('creature-mating');
        creature_mating.textContent = creature.mating? 'Yes' : 'No';

        let creature_mate = document.getElementById('creature-mate');
        creature_mate.textContent = creature.mateName ? creature.mateName : 'None';

        let mouseOver = ()=>
        {
            if(creature.mateName)
            {
                for(let i = 0; i < creatures.length; i++)
                {
                    if(creatures[i].name == creature.mateName)
                    {
                        creatures[i].body.classList.add('drop-shadow-[0_0_35px_rgba(100,235,52,1)]');
                        break;
                    }
                }
            }
        }

        let mouseOut = ()=>
        {
            if(creature.mateName)
            {
                for(let i = 0; i < creatures.length; i++)
                {
                    if(creatures[i].name == creature.mateName)
                    {
                        creatures[i].body.classList.remove('drop-shadow-[0_0_35px_rgba(100,235,52,1)]');
                        break;
                    }
                }
            }
        }

        if(creature.mateName)
        {
            creature_mate.addEventListener('mouseover', mouseOver);
        
            creature_mate.addEventListener('mouseout', mouseOut);
        }
        else
        {
            creature_mate.removeEventListener('mouseover', mouseOver);

            creature_mate.removeEventListener('mouseout', mouseOut);
        }
    }
}