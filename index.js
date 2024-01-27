let questions = [
    {
        question: 'In which country is Lagos located?',
        answers: [
            {text: 'Ghana', look: false},
            {text: 'Canada', look: false},
            {text: 'Nigeria', look: true},
            {text: 'Gabon', look: false},
        ]
    },
    {
        question: 'Which of the following is a grain crop?',
        answers: [
            {text: 'Rice', look: true},
            {text: 'Yam', look: false},
            {text: 'Cassava', look: false},
            {text: 'Mango', look: false},
        ]
    },
    {
        question: 'Another name for baby is?',
        answers: [
            {text: 'Teenager', look: false},
            {text: 'Nursery', look: false},
            {text: 'Factory', look: false},
            {text: 'Infant', look: true},
        ]
    },
    {
        question: 'WHich of these statements rightly describe a degree certificate?',
        answers: [
            {text: 'A document from primary education', look: false},
            {text: 'A document given to certify the successful completion of first tertiary education', look: true},
            {text: 'A document given upon completing a university examination', look: false},
            {text: 'A proof of scholarship', look: false},
        ]
    }
];

const questionElement = document.querySelector('.question h2');
const answerElements = document.querySelector('.answer');
const nextButton = document.querySelector('#next');

let replayButton = document.querySelector('#replay');
let startButton = document.querySelector('#start');
let questionPage = document.querySelector('.question');

let questionIndex = 0;
let score = 0;

startButton.onclick = function start(){
    questionIndex = 0;
    score = 0;
    questionPage.style.display = 'block';
    startButton.style.display = 'none';

    questionnaire();
}

function questionnaire(){

    resetState();

    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(function(answers){
        const answerList = document.createElement('button');
        answerList.innerHTML = answers.text;
        answerList.classList.add('btn');
        answerElements.appendChild(answerList);

        if(answers.look){
            answerList.dataset.look = answers.look;
        }
        answerList.addEventListener('click', selectAnswer)
        
      
    })
}

function resetState(){
    while(answerElements.firstChild){
        answerElements.removeChild(answerElements.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.look === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerElements.children).forEach(answerList =>{
        if(answerList.dataset.look === 'true'){
            answerList.classList.add('correct');
        }
        answerList.disabled = true;
    })
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionPage.innerHTML = `Your score is ${score} out of ${questions.length}.`;
}


function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        questionnaire();
    }else{
        showScore();
    }
}

nextButton.onclick = ()=>{
    if(questionIndex < questions.length){
        handleNextButton();
    }else{
        questionPage.style.display = 'none';
        replayButton.style.display = 'block';
        nextButton.style.display = 'none';
    }
}

replayButton.onclick = function reload(){
    location.reload()
}
    


// startquiz();