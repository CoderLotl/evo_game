export class TimeControl
{
    constructor(btn_pause, btn_play, time_counter_display)
    {
        this.time = 0;
        this.isPaused = false;
        this.btn_pause = btn_pause;
        this.btn_play = btn_play;
        this.timer = null;
        this.time_counter_display = time_counter_display;

        
        this.btn_pause.addEventListener('click', ()=>
        {
            this.pause();
        });

        this.btn_play.addEventListener('click', ()=>
        {
            this.play();
        });
    }

    pause()
    {
        this.isPaused = true;
        clearInterval(this.timer);
        this.btn_pause.classList.add('active');
        this.btn_play.classList.remove('active');
    }

    play()
    {
        this.isPaused = false;
        this.run();
    }

    run(func = null)
    {        
        this.timer = setInterval(()=>
        {            
            this.time_counter_display.textContent = this.time;
            this.time++;

            if(func)
            {
                func();
            }
        }, 1000);
        this.btn_play.classList.add('active');
        this.btn_pause.classList.remove('active');
    }
}