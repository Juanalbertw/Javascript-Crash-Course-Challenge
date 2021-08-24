// Challenge 1: Days Until Your Birthday

function findDaysUntilBirthday() {
  let birthdayMonth = Number(prompt("你几月生日？(1-12)"));
  let birthdayDate = Number(prompt("你几号生日？"));

  let dateInMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  // Find useful information regarding date and month
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();
  let dateInThisMonth = dateInMonth[todayMonth];

  let birthdayHasPassed =
    birthdayMonth < todayMonth ||
    (birthdayMonth === todayMonth && birthdayDate < todayDate);

  let monthsToGo, daysToGo;

  // In this year, has birthday passed?
  if (birthdayHasPassed) {
    monthsToGo = 12 - todayMonth + birthdayMonth - 1;
    daysToGo = dateInThisMonth - todayDate + birthdayDate;
  } else if (birthdayMonth === todayMonth) {
    monthsToGo = 0;
    daysToGo = birthdayDate - todayDate;
  } else {
    monthsToGo = birthdayMonth - todayMonth - 1;
    daysToGo = dateInThisMonth - todayDate + birthdayDate;
  }

  // Display result in flex-box-result div
  let h1 = document.createElement("h1");
  let textAnswer = document.createTextNode(
    `${monthsToGo} Months and ${daysToGo} Days to Your Birthday!!`
  );
  h1.setAttribute("id", "daysUntilBirthday");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);

  // If today is your birthday, display an additional surprise button
  let todayIsYourBirthday = monthsToGo === 0 && daysToGo === 0;

  if (todayIsYourBirthday) {
    let button = document.createElement("button");
    let buttonText = document.createTextNode("CLICK THIS BUTTON");
    button.classList.add("btn", "btn-warning");
    button.setAttribute("id", "surprise");
    button.appendChild(buttonText);
    document.getElementById("flex-box-result").appendChild(button);
    button.setAttribute("onClick", "surprise(this)");
  }
}

function surprise(thisButton) {
  // Surprise button will be removed once pressed
  alert("祝你生日快乐！O(∩_∩)O");
  thisButton.remove();
}

function reset() {
  // Removes all text and buttons in flex-box-result div
  let allText = document.querySelectorAll("#daysUntilBirthday");
  let allSurpriseButton = document.querySelectorAll("#surprise");

  for (let i = 0; i < allText.length; i++) {
    allText[i].remove();
  }

  for (let i = 0; i < allSurpriseButton.length; i++) {
    allSurpriseButton[i].remove();
  }
}

// Challenge 2: Cat Generator
function generateCat() {
  // Get chosen image size from radio button
  let sizeOptions = document.getElementsByName("catImageSize");
  let imageSize;
  for (i = 0; i < sizeOptions.length; i++) {
    if (sizeOptions[i].checked) {
      imageSize = sizeOptions[i].value;
    }
  }

  // Generate cat images inside flex-cat-gen div
  let image = document.createElement("img");
  let div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  image.setAttribute("id", "cat-image");

  // Add image size class if size is not default
  if (imageSize !== "default") {
    image.classList.add(`${imageSize}`);
  }

  div.appendChild(image);
}

function resizeCatImages() {
  // Get chosen image size from radio button
  let sizeOptions = document.getElementsByName("catImageSize");
  let imageSize;
  for (i = 0; i < sizeOptions.length; i++) {
    if (sizeOptions[i].checked) {
      imageSize = sizeOptions[i].value;
    }
  }

  let allImage = document.querySelectorAll("#cat-image");

  // Resize image to default size
  if (imageSize === "default") {
    for (let i = 0; i < allImage.length; i++) {
      allImage[i].removeAttribute("class");
    }

    // Resize image to chosen size (small, medium or large)
  } else {
    for (let i = 0; i < allImage.length; i++) {
      allImage[i].removeAttribute("class");
      allImage[i].classList.add(`${imageSize}`);
    }
  }
}

function removeImages() {
  // Removes all images in flex-cat-gen div
  let allImage = document.querySelectorAll("#cat-image");
  for (let i = 0; i < allImage.length; i++) {
    allImage[i].remove();
  }
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results);
  rpsFrontEnd(humanChoice, botChoice, message);
}

function randToRpsInt() {
  // Returns a pseudorandom number from set {0, 1, 2}
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  // Returns a rock, paper, scissors choice corresponding to a number
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  // Returns user score:
  // Score 1 represents win
  // Score 0.5 represents draw
  // Score 0 represents lost

  let rpsDatabase = {
    // Inner value is the score of outer key when opponent gives inner key
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  let yourScore = rpsDatabase[yourChoice][computerChoice];

  return yourScore;
}

function finalMessage(yourScore) {
  // Returns object containing message and color
  if (yourScore === 0) {
    return { message: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tied!", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  // Removes all images in flex-box-rps div and changes it into only user choice, computer choice and message
  let imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  // Remove all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  // Create new elements
  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  humanDiv.setAttribute("id", "humanDiv");
  botDiv.setAttribute("id", "botDiv");
  messageDiv.setAttribute("id", "messageDiv");

  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; cursor: pointer;'>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

  // Append new elements
  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);

  let delayInMilliseconds = 1000; // 1 seconds

  setTimeout(function () {
    document
      .getElementById("flex-box-rps-div")
      .addEventListener("click", rpsReset);
  }, delayInMilliseconds);
}

function rpsReset() {
  // Resets flex-box-rps div after game is played
  document.getElementById("humanDiv").remove();
  document.getElementById("messageDiv").remove();
  document.getElementById("botDiv").remove();

  let div = document.getElementById("flex-box-rps-div");

  let rockImage = document.createElement("img");
  rockImage.src =
    "https://www.nicepng.com/png/detail/6-61708_rock-rock-paper-scissors-clipart.png";
  rockImage.setAttribute("id", "rock");
  rockImage.setAttribute("height", 150);
  rockImage.setAttribute("width", 150);
  rockImage.setAttribute("onClick", "rpsGame(this)");

  let paperImage = document.createElement("img");
  paperImage.src =
    "https://www.pngitem.com/pimgs/m/266-2667252_transparent-rock-paper-scissors-clipart-rock-paper-scissors.png";
  paperImage.setAttribute("id", "paper");
  paperImage.setAttribute("height", 150);
  paperImage.setAttribute("width", 150);
  paperImage.setAttribute("onClick", "rpsGame(this)");

  let scissorsImage = document.createElement("img");
  scissorsImage.src =
    "https://www.kindpng.com/picc/m/502-5025794_rock-paper-scissors-clipart-hd-png-download.png";
  scissorsImage.setAttribute("id", "scissors");
  scissorsImage.setAttribute("height", 150);
  scissorsImage.setAttribute("width", 150);
  scissorsImage.setAttribute("onClick", "rpsGame(this)");

  div.appendChild(rockImage);
  div.appendChild(paperImage);
  div.appendChild(scissorsImage);

  document
    .getElementById("flex-box-rps-div")
    .removeEventListener("click", rpsReset);
}

// Challenge 4: Change the COlor of All Buttons

// An array with second class of all button elements on page
let all_buttons = document.getElementsByTagName("button");
let copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(button) {
  // Remove pre-existing special colors
  for (let i = 0; i < all_buttons.length; i++) {
    if (all_buttons[i].removeAttribute("style")) {
      all_buttons[i].removeAttribute("style");
    }

    // This method below removes specific properties of inline style:
    // if (all_buttons[i].style.removeProperty) {
    //   all_buttons[i].style.removeProperty("background-color");
    // } else {
    //   all_buttons[i].style.removeAttribute("background-color");
    // }
  }

  // Call function to change buttons color according to chosen value
  if (button.value === "red") {
    turnButtonsRed();
  } else if (button.value === "green") {
    turnButtonsGreen();
  } else if (button.value === "reset") {
    resetButtonsColor();
  } else if (button.value === "random") {
    randomColors();
  } else if (button.value === "special") {
    specialColors();
  }
}

function turnButtonsRed() {
  // Turns all buttons color to red
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function turnButtonsGreen() {
  // Turns all buttons color to green
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function resetButtonsColor() {
  // Reset all buttons color
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  // Turns random colors to all buttons
  let colorChoice = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(colorChoice[randomNumber]);
  }
}

function specialColors() {
  // Change all buttons color according to color picker's color
  let colorPicker = document.getElementById("color");
  let color = colorPicker.value;
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].setAttribute("style", `background-color:${color}`);
  }
}

// Challenge 5: Blackjack
let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  // Blackjack hit when stand button hasn't been clicked
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  // Return a random card
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  // Show card on screen if player isn't busted (score <= 21)
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  // Blackjack deal when turn is over
  if (blackjackGame["turnsOver"] === true) {
    // Change stand status
    blackjackGame["isStand"] = false;

    // Delete all images on screen
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    // Reset score to 0
    YOU["score"] = 0;
    DEALER["score"] = 0;

    // Reset texts
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "#fff";
    document.querySelector("#dealer-blackjack-result").style.color = "#fff";

    document.querySelector("#blackjack-result").textContent = "Let's play!";
    document.querySelector("#blackjack-result").style.color = "black";

    // Change turnsOver status
    blackjackGame["turnsOver"] = false;
  }
}

function updateScore(card, activePlayer) {
  // Updates activePlayer's score
  if (card === "A") {
    // If adding 11 keeps me below 21, add 11. Otherwise, add 1
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  // Show activePlayer's score
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  // Returns a Promise object that delays resolve for ms miliseconds
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  // Asynchronous function when stand button is clicked

  // Stand status becomes true
  blackjackGame["isStand"] = true;

  // Continue to add dealer's cards on dealer's turn while dealer's score is below 16
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  // Change turnsOver status
  blackjackGame["turnsOver"] = true;

  // Compute winner and show result
  let winner = computeWinner();
  showResult(winner);
}

function computeWinner() {
  // Compute winner and return who just won
  // Update the wins, draws and losses

  let winner;

  if (YOU["score"] <= 21) {
    // Condition: higher score than dealer or when dealer busts but you're 21 or under
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }

    // Condition: user busts but dealer doesn't
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;

    // Condition: user and dealer busts
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }

  return winner;
}

function showResult(winner) {
  // Show result of game

  // Set message and messageColor
  let message, messageColor;

  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You won!";
      messageColor = "#d2ff52";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost!";
      messageColor = "#ff1a00";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You drew!";
      messageColor = "#b7deed";
    }

    // Show message with color messageColor
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
