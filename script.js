// I get it! -> when I'm on thoughts.html and klick on "home-thougts-button" he'll find it GREAT!
// BUT!!! -> at the same time on thoughts.html he CAN'T find "home-button" and "thought-button" because it's on "index.html"
// SOOO... -> the first line of code doesen't work when I'm on "thoughts.html" -> returns null -> CRASH -> code below will never happen
// consequently: click on home-thoughts-button nothing will happen!!!
// solution: I have to check first -> is it there? (YES)-> then do... / (NO)-> skip that part move to next code below 

// index.html
const homeButton = document.getElementById("home-button");
if (homeButton) {
  // function() {...} (shorter way)-> () => {...}
  homeButton.addEventListener("click", () => {
    // klicked -> go to index.html
    window.location.href = "index.html";
  });
}
// doesen't exist? -> just skip 

const thoughtsButton = document.getElementById("thoughts-button");
if (thoughtsButton) {
  thoughtsButton.addEventListener("click", () => {
    window.location.href = "thoughts.html";
  });
}

// thoughts.html buttons
const homeThoughtButton = document.querySelector(".home-purple-button");
if (homeThoughtButton) {
  homeThoughtButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// cointainer to collect all thought-inputs
const thoughtsContainer = document.getElementById("thoughts-container");
// Thoughts from input
const thoughtInput = document.querySelector("#thought-input-box");
const thoughtCounter = document.getElementById("thought-counter");
const readyButton = document.getElementById("ready-button");

// when thoughtInput -> this code can run, not? -> skip
if (thoughtInput) {

  inputCounter = 0;
  
  // "=" -> sets value | "===" is this equal to...?"
  // listen for "keydown"
  // I GET IT ---> "hey thoughtInput, whenever a key goes down, give me info about that event, and if the key was Enter → run this code"

  // set color of thoughtCounter -> WHY DOES IT ONYL WORK AT THAT PLAY WITH COLOR AT BEGINNING???
  thoughtCounter.style.color = "rgba(204, 73, 255, 0.5)";
  thoughtCounter.style.filter = "saturate(1)";
  thoughtInput.addEventListener("keydown", (event) => {
    
  // when browser gives me Enter -> div, img, span
  if (event.key === "Enter" && inputCounter < 4) {
    inputCounter++;

    // thoughtCounter raises every cycle
    thoughtCounter.textContent = inputCounter.toString() + "/4";
    
    // thoughtCounter will wobble and goes green when 4/4
    if (inputCounter > 3) {
     thoughtCounter.style.color = "rgba(204, 73, 255, 0.5)";
     thoughtCounter.style.filter = "saturate(9)";
     thoughtCounter.classList.add("wobble");
    }
    else if (inputCounter > 2){
     thoughtCounter.style.color = "rgba(204, 73, 255, 0.5)";
     thoughtCounter.style.filter = "saturate(7)";
    }
    else if (inputCounter > 1) {
     thoughtCounter.style.color = "rgba(204, 73, 255, 0.5)";
     thoughtCounter.style.filter = "saturate(5)";
    }
    else {
     thoughtCounter.style.color = "rgba(204, 73, 255, 0.5)";
     thoughtCounter.style.filter = "saturate(3)";
    }

    // Container for all Clouds
    const divClouds = document.createElement("div");
    divClouds.classList.add("thought-cloud");

    // Cloud image create
    const imgCloud = document.createElement("img");
    imgCloud.src = "assets/images/ai-generated/thought.png";

    // Text create
    const thoughtTextCloud = document.createElement("span");
    thoughtTextCloud.classList.add("thought-text-cloud");
    thoughtTextCloud.textContent = thoughtInput.value;
    // clearing the text-field
    thoughtInput.value = "";

    // put created img, text into Container
    divClouds.appendChild(imgCloud);
    divClouds.appendChild(thoughtTextCloud);
    thoughtsContainer.appendChild(divClouds); 
  }
  if (inputCounter === 4) {
      readyButton.style.visibility="visible";
  }
  
});
}

if (thoughtInput) {
// creating the Text inside the textbox letter by letter
const fullText = "What's on your mind?";
let letters = 0;

// runs every 120ms
const typing = setInterval(() => {
  // from position 0, cut letters -> (0,3) = "Wha"
  thoughtInput.placeholder = fullText.slice(0, letters);
  letters++

  // cut letters more than the whole Text?
  if (letters > fullText.length) {
    clearInterval(typing);
  }
}, 120);
}

// creats sparcle effect for readyButton
const sparcleEffect = document.getElementById("sparcle-effect");

if(sparcleEffect) {
  let sparcleIntervall = null;

  sparcleEffect.addEventListener("mouseenter", () => {
    sparcleIntervall = setInterval(() => {
      const particleDot = document.createElement("div");
      // give particleDot the class: "particle" used in style.css
      particleDot.classList.add("particle")
      // create position of particles randomly 0-100% -> horizontal 
      particleDot.style.left = Math.random() * 100 + "%";
      // particles rise from bottom
      particleDot.style.bottom = "0px";
      particleDot.style.background = "rgb(204, 73, 255)";
      // ad it to stage
      sparcleEffect.appendChild(particleDot);
      setTimeout(() => particleDot.remove(), 1000);
    }, 100);
  });

  sparcleEffect.addEventListener("mouseleave", () => {
    clearInterval(sparcleIntervall);
  })
}

// move from readyButton -> emotions.html
if (readyButton) {
  readyButton.addEventListener("click", () => {
  window.location.href = "emotions.html";
  })
}

