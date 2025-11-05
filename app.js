import {paragraphs} from './paragraphs.js';
    
    let countdown = null;
    async function _SetTimer(){
        countdown = null;
             countdown = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerElement.textContent = "Time's up!";
      }
    }, 1000); // runs every 1 second
    }
    const TIMER = 10;
    let current_t = 10;
    let timeLeft = TIMER;
    const timerElement = document.getElementById("timer");
    
       const text = document.getElementById("text");
    const senElement = document.getElementById("sentence");
    let target = senElement.textContent; // original sentence
    const lcount = document.getElementById("lcount");
    const shuffle = document.getElementById("shuffle");
     const reset = document.getElementById("reset");
    shuffle.addEventListener("click",async ()=>{
     
        const randomIndex = Math.floor(Math.random() * paragraphs.length);

// Get the random element
        const randomItem = paragraphs[randomIndex];


        target = randomItem.text;
         senElement.innerHTML =
          `<span class="remaining">${target}</span>`;
          lcount.textContent = `0/${target.length}`;
         clearInterval(countdown);
      
         
        timeLeft = randomItem.timer +1;
        current_t = randomItem.timer;
          await _SetTimer();
        text.value ="";
        startTime = Date.now();

      
    });
    reset.addEventListener("click",async ()=>{
             
         senElement.innerHTML =
          `<span class="remaining">${target}</span>`;
          lcount.textContent = `0/${target.length}`;
         clearInterval(countdown);
        await _SetTimer();
          text.value ="";
        timeLeft = current_t+1;
       
        
       
        startTime = Date.now();
    });


    window.addEventListener("DOMContentLoaded",()=>{
        senElement.innerHTML =
          `<span class="remaining">${target}</span>`;
          lcount.textContent = `0/${target.length}`;
          _SetTimer();

    });
    
    const result = document.getElementById("result");

    let startTime = null;

    text.addEventListener("input", async () => {
      const typed = text.value;

      if (target.startsWith(typed)) {

        

        // Correct so far
        const correctPart = typed;
        const remainingPart = target.slice(typed.length);

        senElement.innerHTML =
          `<span class="correct">${correctPart}</span><span class="remaining">${remainingPart}</span>`;

        text.style.color = "black";
         lcount.textContent = `${typed.length}/${target.length}`;

          if (!startTime) {
        startTime = Date.now();
      }

      // If user finished typing the sentence
      if (text.value === document.getElementById("sentence").textContent) {
        const endTime = Date.now();
        const elapsedSeconds = (endTime - startTime) / 1000;

        // Count words
        const wordCount = text.value.trim().split(/\s+/).length;

        // Calculate words per second
        const wps = (wordCount / elapsedSeconds).toFixed(2);

     

        if(confirm(`You typed ${wordCount} words in ${elapsedSeconds.toFixed(2)} seconds → ${wps} words per second.
Do you want to start new round?`)){
            
            senElement.innerHTML =
          `<span class="remaining">${target}</span>`;
          lcount.textContent = `0/${target.length}`;


        clearInterval(countdown);
        timeLeft =current_t+1;
        await _SetTimer();
        text.value ="";

        startTime = null;
        if (!startTime) {
        startTime = Date.now();

      }

        }
        else{
               result.textContent = `You typed ${wordCount} words in ${elapsedSeconds.toFixed(2)} seconds → ${wps} words per second`;
              
               clearInterval(countdown);
        }
        
      }
      } else {
        // Mistake
        senElement.innerHTML =
          `<span class="error">${target}</span>`;
        text.style.color = "red";
      }

      
    });
 
 