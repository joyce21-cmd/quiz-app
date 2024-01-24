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
    question: "It is a venture or any establishment with the purpose of earning points, improve economic standards, and provide economic stability",
    options: ["Accounting","Business","Engineering","Law"],
    correct: "Business",
  },
  {
    id: "1",
    question: "A type of business that buys and sells products in the same form",
    options: ["Service Business", "Trading Business", "Manufacturing Business","Investment Business"],
   correct:"Trading Business",
},
{
    id: "2",
    question: "A type of business that invests, lends, and collects money with interest",
    options: ["Service Business", "Trading Business", "Manufacturing Business","Investment Business"],
   correct:"Investment Business",
},
{
  id: "3",
  question: "A type of business which principal undertaking is the selling one’s expertise or skill for a fee.",
  options: ["Service Business", "Trading Business", "Manufacturing Business","Investment Business"],
 correct:"Service Business",
},
{
  id: "4",
  question: "A type of business that buys raw materials and products to the market",
  options: ["Service Business", "Trading Business", "Manufacturing Business","Investment Business"],
 correct:"Manufacturing Business",
},
{
  id: "5",
  question: "A business organization owned by only one person",
  options: ["Single Proprietorship", "Partnership", "Corporation","None of the Above"],
 correct:"Single Proprietorship",
},
{
  id: "6",
  question: "A business organization owned by two or more persons who contribute property or service into a common fund.",
  options: ["Single Proprietorship", "Partnership", "Corporation","None of the Above"],
 correct:"Partnership",
},
{
  id: "7",
  question: "A business organization whose common fund or capital is divided into shares or stocks.",
  options:  ["Single Proprietorship", "Partnership", "Corporation","None of the Above"],
 correct:"Corporation",
},
{
  id: "8",
  question: "Rely on companies financial statements in negotiating higher wages and better benefits.",
  options: ["Creditors", "Labor Unions", "Government Agencies","Customers"],
 correct:"Labor Unions",
},
{
  id: "9",
  question: "adjusting entries to take up used cost as asset and unused asset as expenese.",
  options:["Prepaid Expense", "Unearned Income", "Deferrals","Accrued Income"],
  correct:"Prepaid Expense",
},
{
  id: "10",
  question: "adjusting entries to take up income already earned but not yet recorded",
  options:["Prepaid Expense", "Unearned Income", "Deferrals","Accrued Income"],
  correct:"Accrued Income",
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
