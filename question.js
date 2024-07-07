// Fetch the quiz data from the JSON file
fetch('./quiz.json')
  .then(response => response.json())
  .then(data => {
    // Store the quiz data in a global variable
    window.quizData = data;
    // Call the function to display the first question
    displayQuestion();
  })
  .catch(error => console.error(error));

  

// Get the necessary DOM elements
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswers');
const backButton = document.getElementById('backButton')

function countTotalQuestions() {
  return window.quizData.length;
}
function updateQuestionCounter() {
  const questionCounter = document.getElementById('questionCounter');
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${window.quizData.length}`;
}

// Function to display the current question
function displayQuestion() {
  // ...

  // Update the question counter
  updateQuestionCounter();
}

// Function to check the selected answer
function checkAnswer() {
  // ...

  // Update the question counter
  updateQuestionCounter();
}


// Function to go back to the previous question
function goBack() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
}



let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];



// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display the current question
function displayQuestion() {
  const questionData = window.quizData[currentQuestion];
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.textContent = questionData.question;
  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);
  shuffledOptions.forEach(option => {
    const optionElement = document.createElement('label');
    optionElement.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = option;
    const optionText = document.createTextNode(option);
    optionElement.appendChild(radio);
    optionElement.appendChild(optionText);
    optionsElement.appendChild(optionElement);
  });
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  updateQuestionCounter();


}

// Function to check the selected answer
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === window.quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: window.quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: window.quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < window.quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

// Function to display the result
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${window.quizData.length}!`;
}

// Function to retry the quiz
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

// Function to show the correct answers
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${window.quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

// Add event listeners to the buttons
backButton.addEventListener('click', goBack);
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

;




