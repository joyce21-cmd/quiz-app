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
    question: 'Purchased inventory,30,000 to be paid in 30 days',
    answers: [
      { text: 'Debit: Inventory 30,000 and Credit: Accounts payable 30,000', correct: true },
      { text: 'Debit: Cash 30,000 and Credit: Accounts payable 30,000', correct: false },
      { text: 'Debit: Inventory 30,000 and Credit: Accounts receivable 30,000', correct: false },
      { text: 'Debit: Rent expense 30,000 and Credit: Accounts payable 30,000', correct: false }

    ]
  },
  {
    question: 'Rented warehouse space, 2,000 was paid for this month',
    answers: [
      { text: 'Debit: Rent Expense 2,000 and Credit: Cash 2,000', correct: true },
      { text: 'Debit: Prepaid Expense 2,000 and Credit: Cash 2,000', correct: false },
      { text: 'Debit: Rent Expense 2,000 and Credit: Accounts Receivable  2,000', correct: false },
      { text: 'Debit: Utilities Expense 2,000 and Credit: Cash 2,000', correct: false }

    ]
  },
  {
    question: 'Purchased 500 of office supplies on account, not yet used.',
    answers: [
      { text: 'Debit: Supplies Expense and Credit: Cash 500', correct: false },
      { text: 'Debit: Office Supplies 500 and Credit: Accounts Payable 500', correct: true },
      { text: 'Debit: Cash 500 and Credit: Accounts Payable 500', correct: false },
      { text: 'Debit: Accounts Receivable 500 and Credit: Cash 500', correct: false }

    ]
  },
  {
    question: 'Loaned a supplier 20,000  to be repaid in 6 months.',
    answers: [
      { text: 'Debit: Account Receivable 30,000 and Credit: Cash 30,000', correct: false },
      { text: 'Debit: Note Receivable 30,000 and Credit: Cash 30,000', correct: true },
      { text: 'Debit: Office Supplies 30,000 and Credit: Accounts Payable 30,000', correct: false },
      { text: 'Debit: Supplies Expense 30,000 and Credit: Cash 30,000', correct: false }

    ]
  },
  {
    question: 'Paid 240 to rent equipment this month.',
    answers: [
      { text: 'Debit: Rent Expense 240 and Credit: Cash 240', correct: true },
      { text: 'Debit: Prepaid Expense 240 and Credit: Cash 240', correct: false },
      { text: 'Debit: Rent Expense 240 and Credit: Accounts Receivable  240', correct: false },
      { text: 'Debit: Utilities Expense 240 and Credit: Cash 240', correct: false }

    ]
  },
  {
    question: 'Collected 5,000 from the supplier who borrowed from the company.',
    answers: [
      { text: 'Debit: Account Receivable 5,000 and Credit: Cash 5,000', correct: false },
      { text: 'Debit: Cash 5,000 and Credit: Note Receivable 5,000', correct: true },
      { text: 'Debit: Supplies Expense 5,000 and Credit: Cash 5,000', correct: false },
      { text: 'Debit: Cash 5,000 and Credit: Accounts Payable 5,000', correct: false }

    ]
  },
  
  
]