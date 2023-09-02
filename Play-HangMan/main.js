// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories

let myRequest = new XMLHttpRequest();

myRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const allLettres = JSON.parse(this.responseText);
    const allLettresObject = Object.keys(allLettres[0]);
    allThingsDoIt(allLettresObject, allLettres);
  }
};
myRequest.open("GET", "letters.json", true);
myRequest.send();

function allThingsDoIt(letters, secondLetters) {
  // Random Number Depend On Keys Length
  let randomPropNumber = Math.floor(Math.random() * letters.length);

  // Category
  let randomPropName = letters[randomPropNumber];

  // Category Words
  let randomPropValue = secondLetters[0][randomPropName];

  // Random Number Depend On Words
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

  // The Chosen Word
  let randomValueValue = randomPropValue[randomValueNumber];

  // Set Category Info
  document.querySelector(".game-info .category span").innerHTML =
    randomPropName;

  // Select Letters Guess Element
  let lettersGuessContainer = document.querySelector(".letters-guess");

  // Convert Chosen Word To Array
  let lettersAndSpace = Array.from(randomValueValue);
  lettersAndSpace.forEach((letter) => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === " ") {
      // Add Class To The Span
      emptySpan.className = "with-space";
    }

    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
  });
  // Select Guess Spans
  let guessSpans = document.querySelectorAll(".letters-guess span");

  // Set Wrong Attempts
  let wrongAttempts = 0;

  // Select The Draw Element
  let theDraw = document.querySelector(".hangman-draw");

  // Handle Clicking On Letters
  document.addEventListener("click", (e) => {
    // Set The Choose Status
    let theStatus = false;
    let endCount = 0;
    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");

      // Get Clicked Letter
      let theClickedLetter = e.target.innerHTML.toLowerCase();
      // The Chosen Word
      let theChosenWord = Array.from(randomValueValue.toLowerCase());
      let count = theChosenWord.join("").length;
      console.log(count);
      theChosenWord.forEach((wordLetter, WordIndex) => {
        // If The Clicked Letter Equal To One Of The Chosen Word Letter
        endCount++;
        if (theClickedLetter == wordLetter) {
          // Set Status To Correct
          theStatus = true;
          // Loop On All Guess Spans
          guessSpans.forEach((span, spanIndex) => {
            if (WordIndex === spanIndex) {
              span.innerHTML = theClickedLetter;
              if (endCount === count) {
                playerWin();
              }
            }
          });
        }
      });

      // Outside Loop

      // If Letter Is Wrong
      if (theStatus !== true) {
        // Increase The Wrong Attempts
        wrongAttempts++;

        // Add Class Wrong On The Draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        // Play Fail Sound
        document.getElementById("fail").play();

        if (wrongAttempts === 8) {
          endGame();

          lettersContainer.classList.add("finished");
        }
      } else {
        // Play Success Sound
        document.getElementById("success").play();
      }
    }
  });
  function endGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(
      `Game Over, The Word Is ${randomValueValue}`
    );

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";

    // Append To The Body
    document.body.appendChild(div);
  }

  function playerWin() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(
      `Good Game, The Word Is ${randomValueValue} And Your Mistake ${wrongAttempts}`
    );

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";

    // Append To The Body
    document.body.appendChild(div);
  }
}
