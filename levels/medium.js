//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "the heading or the name of the account",
    options: ["Title","Account Number","Date","Posting Reference"],
    correct: "Title",
  },
  {
    id: "1",
    question: "it is written at the top right hand of the ledger",
    options: ["Title","Account Number","Date","Posting Reference"],
   correct:"Account Number",
},
{
    id: "2",
    question: "What is recorded when goods are provided to a customer to an account?",
    options: ["A debit to 2 asset accounts and a credit to 2 revenue accounts.", "Credits to an asset and a revenue, debit to an asset and a debit to an expense.", "A credit liability and revenue accounts, credit an asset and a debit an expense.","A debit to an asset and credit to a  revenue only."],
   correct:"Credits to an asset and a revenue, debit to an asset and a debit to an expense.",
},
{
  id: "3",
  question: "Cost of goods sold is debited when",
  options: ["Inventory is purchased and paid for", "Inventory is provide to a customer", "A service is provide  to a customer","A service is provide to a company"],
 correct:"Inventory is provide to a customer",
},
{
  id: "4",
  question: "The accounts of receivable account is credited when",
  options: ["Goods are provided to customers", "The customer pays for goods provided", "The customer does not pay for goods provided","Both a and c"],
 correct:"The customer pays for goods provided",
},
{
  id: "5",
  question: "Retained earnings will decrease when",
  options: ["common stock is credited", "cash is debited from a customer", "the company pays an accounts payable and notes receivable","the accounts dividends paid is debited"],
 correct:"the accounts dividends paid is debited",
},
{
  id: "6",
  question: "what is recorded when insurance for the next six months is paid for this period?",
  options: ["a debit to prepaid insurance", " a credit to accrued insurance", " a debit to accounts payable","a debit to insurance payable"],
 correct:"a debit to prepaid insurance",
},
{
  id: "7",
  question: "which of the following is never recorded in the same transaction?",
  options: ["a debit to cash and a debit to owner’s equity", " a credit to cash and a debit to different asset", "a debit to an asset and a credit to liability"," a credit to an asset and a debit to liability"],
 correct:"a debit to cash and a debit to owner’s equity",
},
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
