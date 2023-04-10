const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#idNum');
const inputDiv = document.getElementById("input-div");
const quizStart = document.getElementById("h5");
const userName = document.getElementById("user-name");
const userID = document.getElementById("user-id");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 30; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

startButton.addEventListener("click", function() {
  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    quizStart.textContent='Enter your name and ID.'
    return;
  }
  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#fff", "#36A2EB"],
      },
    ],
  },
});



      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {

nameField.style.display = 'none';
idField.style.display = 'none';
userName.textContent= `Name:${nameField.value}`
userID.textContent= `ID:${idField.value}`
quizStart.style.display = "none"

  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Otawwa", correct: true },
      { text: "Vancouver", correct: false },
    ],
  },
  {
    question: 'Largest River in the world is"?',
    answers: [
      { text: "River Nile", correct: true },
      { text: "Amazon River", correct: false },
      { text: "River Prah", correct: false },
      { text: "River Jordan", correct: false },
    ],
  },
  {
    question: "Which country is at the center of the world",
    answers: [
      { text: " Ghana", correct: true },
      { text: "Mexico", correct: false },
      { text: "Tunisia", correct: false },
      { text: "Maldives", correct: false },
    ],
  },
  {
    question: 'What is the capital of Britain',
    answers: [
      { text: "Bristol", correct: false },
      { text: "Manchester", correct: false },
      { text: "London", correct: true },
      { text: "Newcastle", correct: false },
    ],
  },
  {
    question: ' Which organization publishes ‘World Development Report’?  ',
    answers: [
      { text: "United Nations Development Programme (UNDP)", correct: false },
      { text: "World Economic Forum", correct: false },
      { text: "International Monetary Fund (IMF)", correct: false },
      { text: " World Bank", correct: true },
    ],
  },
  {
    question: "Who is the perfect man according to science?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Kofi Brymo", correct: false },
      { text:"Regé-Jean Page", correct: true },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "Main memory works in coordination with …………….",
    answers: [
      { text: " CPU", correct: true },
      { text: "Ram", correct: false },
    ],
  },
  {
    question: "Who controls the movement of signals between the CPU and I/O?",
    answers: [
      { text: "ALU", correct: false },
      { text: "Control Unit", correct: true },
    ],
  },
  {
    question: "What purpose was the famous computer named Pacman made for?",
    answers: [
      { text: " Sports", correct: true },
      { text: " Book publishing", correct: false },
      { text: " Bank", correct: false },
    ],
  },
  {
    question: "Which of the following is the fastest?",
    answers: [
      { text: "Cache", correct: false },
      { text: "CD-ROM", correct: false },
      { text: "RAM", correct: false },
      { text: "Registers", correct: true },
    ],
  },
];
