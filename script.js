const thoughtButton =
  document.querySelector("#thought-button");

const analyzeButton =
  document.querySelector("#analyze-button");

analyzeButton.addEventListener("click", () => {
  analyzeButton.textContent = "Meowwww"
});

thoughtButton.addEventListener("click", () => {
  thoughtButton.classList.toggle("active")
  if (thoughtButton.classList.contains("active")) {
    thoughtButton.textContent = "Thought";
  } else {
    thoughtButton.textContent = "Meoww";
    alert("Heyyy <3");
  }
});

const homeButton =
  document.querySelector("#home-button");

homeButton.addEventListener("click", () => {
  window.location.href = "index.html"
});


