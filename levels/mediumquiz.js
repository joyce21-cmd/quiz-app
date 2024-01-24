const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is Value Parted of Increase Expense?',
    answers: [
      { text: 'Increase Income', correct: false },
      { text: 'Decrease Asset', correct: true },
      { text: 'Increase Owners Capital', correct: false },
      { text: 'Increase Liabilities', correct: false }

    ]
  },
  {
    question: 'What is Value Parted of Decrease Owners Capital?',
    answers: [
      { text: 'Increase Income', correct: false },
      { text: 'Decrease Asset', correct: true },
      { text: 'Increase Owners Capital', correct: false },
      { text: 'Increase Liabilities', correct: false }

    ]
  },
  {
    question: 'What is the normal balance of Asset?',
    answers: [
      { text: 'Debit', correct: true },
      { text: 'Credit', correct: false },
      { text: 'Decrease', correct: false },
      { text: 'Increase', correct: false }

    ]
  },
  {
    question: 'What is the normal balance of Capital?',
    answers: [
      { text: 'Debit', correct: false },
      { text: 'Credit', correct: true },
      { text: 'Decrease', correct: false },
      { text: 'Increase', correct: false }

    ]
  },
  {
    question: 'What is the normal balance of Income?',
    answers: [
      { text: 'Debit', correct: false },
      { text: 'Credit', correct: true },
      { text: 'Decrease', correct: false },
      { text: 'Increase', correct: false }

    ]
  },
  {
    question: 'What is the normal balance of Expenses?',
    answers: [
      { text: 'Debit', correct: true },
      { text: 'Credit', correct: false },
      { text: 'Decrease', correct: false },
      { text: 'Increase', correct: false }

    ]
  },
  {
    question: 'Accounts Debit are to be written at the ________ at the Description Column',
    answers: [
      { text: 'Extreme Right', correct: false },
      { text: 'Extreme Left', correct: true },
      { text: 'Extreme Upper', correct: false },
      { text: 'Extreme Lower', correct: false }
    ]
  },
  {
    question: '________ is used for posting only.',
    answers: [
      { text: 'Description Column', correct: false },
      { text: 'Explanation', correct: false },
      { text: 'General Ledger', correct: false },
      { text: 'PR Column', correct: true }
    ]
  },
  {
    question: 'Currency sign is placed only on the _____________.',
    answers: [
      { text: '1st Transaction', correct: true },
      { text: '2nd Transaction', correct: false },
      { text: '3rd Transaction', correct: false },
      { text: '4th Transaction', correct: false }
    ]
  },
  {
    question: 'A business organization owned by only one person',
    answers: [
      { text: 'Partnership', correct: false },
      { text: 'Corporation', correct: false },
      { text: 'Single Propietorship', correct: true },
      { text: 'None of the Above', correct: false }
    ]
  },
  {
    question: 'For the ________ write the proper Account Number on the PR Column for every account posted.',
    answers: [
      { text: 'General Ledger', correct: false },
      { text: 'Journals', correct: true },
      { text: 'Posting Reference', correct: false },
      { text: 'Description Column', correct: false }
    ]
  },
  
]