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
const homeThoughtButton = document.getElementById("home-thoughts-button");
if (homeThoughtButton) {
  homeThoughtButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// cointainer to collect all thought-inputs
const thoughtsContainer = document.getElementById("thoughts-container");
// Thoughts from input
const thoughtInput = document.querySelector("#thought-input-box");

// when thoughtInput -> this code can run, not? -> skip
if (thoughtInput) {
  inputCounter = 0;
  // "=" -> sets value | "===" is this equal to...?"
  // listen for "keydown"
  // I GET IT ---> "hey thoughtInput, whenever a key goes down, give me info about that event, and if the key was Enter → run this code"
  thoughtInput.addEventListener("keydown", (event) => {
  // when browser gives me Enter -> div, img, span
  if (event.key === "Enter" && inputCounter < 4) {
    inputCounter++;
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
      const doneButton = document.getElementById("done-button");
      doneButton.style.display = "block";    
  }
});
}

// creating the Text inside the textbox letter by letter
const fullText = "What's on your mind?"
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





