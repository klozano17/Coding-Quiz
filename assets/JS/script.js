var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('choices');
var quizContainer = document.getElementById("quiz");
var endContainer = document.getElementById("end");
var scoreElement = document.getElementById("score");
var submitButton = document.getElementById("submit-btn");
var timerElement = document.getElementById("timer");

var quizTimer = 30; // quiz timer in seconds
var timeLeft = quizTimer;
var shuffledQuestions, currentQuestionIndex = 0;
var score = 0;
var quizStarted = false;
var quizEnded = false;
var timerInterval;

// quiz questions and answers
var questions = [
  {
    question: "What is JavaScript?",
    answers: {
      a: "A programming language",
      b: "A markup language",
      c: "A styling language"
    },
    correctAnswer: "a"
  },
  {
    question: "What is a variable in JavaScript?",
    answers: {
      a: "A way to store data",
      b: "A way to style elements",
      c: "A way to define functions"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the DOM in JavaScript?",
    answers: {
      a: "A way to manipulate HTML and XML documents",
      b: "A way to define variables",
      c: "A way to create functions"
    },
    correctAnswer: "a"
  }
];

// function to start quiz
startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.classList.add('hide');
  quizContainer.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
  quizStarted = true;
}

// function to start timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}


nextButton.addEventListener('click', showNextQuestion);

function showNextQuestion() {
  resetState();
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  for (letter in question.answers) {
    answerButtonsElement.insertAdjacentHTML('beforeend', `
      <label class="choice">
        <input type="radio" name="question" value="${letter}">
        ${letter} : ${question.answers[letter]}
      </label>
    `);
  }
  answerButtonsElement.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', () => {
      if (choice.querySelector('input').value === question.correctAnswer) {
        // correct answer
        score++;
      } else {
        // incorrect answer
        timeLeft -= 10; // subtract 10 seconds from timer
        if (timeLeft < 0) {
          timeLeft = 0; // ensure timer is not negative
        }
      }
    });
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  timerElement.textContent = 0;
  quizContainer.classList.add('hide');
  endContainer.classList.remove('hide');
  scoreElement.textContent = score;
  quizEnded = true;
}

submitButton.addEventListener('click', saveScore);

function saveScore(event) {
  event.preventDefault();
  let initials = initialsInput.value.trim();

  if (initials === '') {
    alert('Please enter your initials.');
    return;
  }

  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  let newScore = {
    initials: initials,
    score: score
  };
  highScores.push(newScore);
  localStorage.setItem('highScores', JSON.stringify(highScores));

  window.location.href = 'highscores.html';
}