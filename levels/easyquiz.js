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
    question: 'It is a venture or any establishment with the purpose of earning points, improve economic standards, and provide economic stability?',
    answers: [
      { text: 'Law', correct: false },
      { text: 'Business', correct: true },
      { text: 'Accounting', correct: false },
      { text: 'Engineering', correct: false }

    ]
  },
  {
    question: 'A type of business that buys and sells products in the same form',
    answers: [
      { text: 'Service Business', correct: false },
      { text: 'Trading Business', correct: true },
      { text: 'Manufacturing Business', correct: false },
      { text: 'Investment Business', correct: false }
    ]
  },
  {
    question: 'A type of business that invests, lends, and collects money with interes',
    answers: [
      { text: 'Service Business', correct: false },
      { text: 'Trading Business', correct: false },
      { text: 'Manufacturing Business', correct: false },
      { text: 'Investment Business', correct: true }
    ]
  },
  {
    question: 'A type of business which principal undertaking is the selling one’s expertise or skill for a fee',
    answers: [
      { text: 'Trading Business', correct: false },
      { text: 'Service Business', correct: true },
      { text: 'Manufacturing Business', correct: false },
      { text: 'Investment Business', correct: false }
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
    question: 'A business organization owned by two or more persons who contribute property or service into a common fund',
    answers: [
      { text: 'Single Proprietorship', correct: false },
      { text: 'Partnership', correct: true },
      { text: 'Corporation', correct: false },
      { text: 'None of the Above', correct: false }
    ]
  },
  {
    question: 'A business organization whose common fund or capital is divided into shares or stocks',
    answers: [
      { text: 'Single Proprietorship', correct: false },
      { text: 'Partnership', correct: false },
      { text: 'Corporation', correct: true },
      { text: 'None of the Above', correct: false }
    ]
  },
  {
    question: 'Rely on companies financial statements in negotiating higher wages and better benefits',
    answers: [
      { text: 'Creditors', correct: false},
      { text: 'Labor Unions', correct: true},
      { text: 'Goverment Agencies', correct: false},
      { text: 'Customers', correct: false}
    ]
  },
  {
    question: 'adjusting entries to take up used cost as asset and unused asset as expenese',
    answers: [
      { text: 'Deferrals', correct: false}, 
      { text: 'Unearned Income', correct: false}, 
      { text: 'Prepaid Expense', correct: true}, 
      { text: 'Accrued Income', correct: false}
    ]
  },
  {
    question:'adjusting entries to take up income already earned but not yet recorded',
    answers: [
    { text: 'Prepaid Expense', correct: false},
    { text: 'Unearned Income', correct: false},
    { text: 'Deferrals', correct: false},
    { text: 'Accrued Income', correct: true}
    ]
  },
  {
    question:'an entry which could have two or more debits and credits',
    answers: [
    { text: 'Posting Entry', correct: false},
    { text: 'Adjusting Entry', correct: false},
    { text: 'Single Entry', correct: false},
    { text: 'Compound Entry', correct: true}
    ]
  },
  {
    question:'are accounts that affect assets, liabilities, and owners capital.',
    answers: [
    { text: 'Mixed Accounts', correct: false},
    { text: 'Nominal Acccounts', correct: false},
    { text: 'Real Accounts', correct: true},
    { text: 'None of the Above', correct: false}
    ]
  },
  {
    question:'are accounts that affect income and expenses.',
    answers: [
    { text: 'Mixed Accounts', correct: false},
    { text: 'Nominal Acccounts', correct: true},
    { text: 'Real Accounts', correct: false},
    { text: 'None of the Above', correct: false}
    ]
  },
  {
    question:'These are the advantages of Single Proprietorship except one:',
    answers: [
    { text: 'Easy to Organizae', correct: false},
    { text: 'Limited ability to raise funds', correct: true},
    { text: 'Easy decision making', correct: false},
    { text: 'All profits goes to sole owner', correct: false}
    ]
  },

  
]