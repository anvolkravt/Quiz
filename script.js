const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const questionContainerElement = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerButtons');
const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      {
        text: '4',
        correct: true,
      },
      {
        text: '22',
        correct: false,
      },
    ],
  },
  {
    question: 'Best meme guy',
    answers: [
      {
        text: 'Pepe',
        correct: true,
      },
      {
        text: 'Stonks',
        correct: false,
      },
      {
        text: 'German',
        correct: false,
      },
    ],
  },
];

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hidden');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hidden');
  setNextQuestion();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hidden');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hidden');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  correct ? element.classList.add('correct') : element.classList.add('wrong');
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
