let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');

let currentQuestionIndex, shuffledQuestions, score;

startGame();

function startGame() {
    score = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    for (let i = 1; i <= 4; i++) {
        const button = document.createElement('button');
        button.innerText = question['choice' + i];
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = shuffledQuestions[currentQuestionIndex].answer;
    if (selectedButton.innerText === shuffledQuestions[currentQuestionIndex]['choice' + correct]) {
        selectedButton.classList.add('correct');
        score++;
        scoreText.innerText = `Score: ${score}`;
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            setNextQuestion();
        } else {
            localStorage.setItem('finalScore', score);
            window.location.href = 'end.html';
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateFinalScore();
});

function updateFinalScore() {
    if (window.location.pathname.endsWith('end.html')) {
        const finalScore = localStorage.getItem('finalScore');
        document.getElementById('final-score').innerText = `Your Score: ${finalScore}`;
    }
}