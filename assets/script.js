const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('questions')
const answerButtonsElement = document.getElementById('answer-buttons')
const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit-btn");
const timer = document.getElementById("time");
const quizTimer = 30; // quiz timer in seconds
let timeLeft = quizTimer;
let shuffledQuestions, currentQuestionIndex



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

// function to generate quiz questions
function generateQuiz() {
    let output = "";
    questions.forEach((currentQuestion, questionNumber) => {
      let answers = "";
      for (letter in currentQuestion.answers) {
        answers += `
          <label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} : ${currentQuestion.answers[letter]}
          </label>
          <br>
        `;
      }
      output += `
        <div class="question">
          <h3>${currentQuestion.question}</h3>
          <div class="answers">
            ${answers}
          </div>
        </div>
      `;
    });
    quizContainer.innerHTML = output;
  }
  
  // function to handle timer
function startTimer() {
    let countdown = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(countdown);
        submitQuiz();
      }
    }, 1000);
  }
  
  // function to submit quiz
  function submitQuiz() {
    // add code to check answers and calculate score
    // display score or feedback to user
  }
  
  generateQuiz();
  startTimer();