import { QuizQuestions } from './quizQuestions.js';

const startPage = document.querySelector('.container');
const quizPage = document.querySelector('.quiz-container');
const resultPage = document.querySelector('.result-container');
const quizCategory = document.querySelector('#category');
const questionDisplay = document.querySelector('.question-display');
const questionCategory = document.querySelector('.quiz-category');
const questionNo = document.querySelector('.question-no');
const questionText = document.querySelector('.question');
const choiceA = document.querySelector('label[for="choice-a"]');
const choiceB = document.querySelector('label[for="choice-b"]');
const choiceC = document.querySelector('label[for="choice-c"]');
const choiceD = document.querySelector('label[for="choice-d"]');
const allChoices = document.querySelectorAll('input[name="choice"]');
const startBtn = document.querySelector('#start-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const moveToBtns = document.querySelectorAll('.move-to-question-btn');
const submitBtn = document.querySelector('#submit-btn');
const reviewBtn = document.querySelector('#review-btn');
const finishBtn = document.querySelector('#finish-btn');
const resultRing = document.querySelector('.result-ring');

let currentQuestionIndex = 0;

function renderQuizQuestions(){
	const chosenAnswers = getChosenAnswers();
	const selectedCategory = quizCategory.options[quizCategory.selectedIndex].value;
	if(selectedCategory === 'none'){
		return alert('Please select a category to start the quiz');
	}
	startPage.classList.add('hidden');
	quizPage.classList.remove('hidden');
	questionText.textContent = QuizQuestions[selectedCategory][currentQuestionIndex].question;
	questionNo.textContent = QuizQuestions[selectedCategory][currentQuestionIndex].id;
	questionCategory.textContent = selectedCategory;
	choiceA.textContent = QuizQuestions[selectedCategory][currentQuestionIndex].options.a;
	choiceB.textContent = QuizQuestions[selectedCategory][currentQuestionIndex].options.b;
	choiceC.textContent = QuizQuestions[selectedCategory][currentQuestionIndex].options.c;
	choiceD.textContent = QuizQuestions[selectedCategory][currentQuestionIndex].options.d;

}

function getChosenAnswers(){
	  try{
    let chosenAnswers = JSON.parse(localStorage.getItem("chosenAnswers")) || [];
    let validArr = false;
    chosenAnswers.forEach((answer)=>{
    if (answer.questionNo && answer.answer) {
      validArr = true;
    }
  });
  return validArr ? chosenAnswers : []
  }catch(error){return []}
}

function storeChosenAnswers(e){
	const chosenAnswers = getChosenAnswers();
	currentAnswer = {
		id: currentQuestionIndex + 1,
		answer: e.target.value
	};

	chosenAnswers.forEach((answer) => {
		if(answer.id === currentAnswer.id){
			answer.answer = currentAnswer.answer;
		}
	});
	if(!chosenAnswers.some((answer) => answer.id === currentAnswer.id)){
		chosenAnswers.push(currentAnswer);
	}
	localStorage.setItem("chosenAnswers", JSON.stringify(chosenAnswers));
}

function renderQuizResults(){

}

function renderQuizReview(){

}

function finishQuiz(){

}

startBtn.addEventListener('click',renderQuizQuestions);

allChoices.forEach((choice) => {
	choice.addEventListener('click',() => {
		storeChosenAnswers(e);
	});
});

prevBtn.addEventListener('click',() => {
	currentQuestionIndex--;
	if(currentQuestionIndex < 0){
		currentQuestionIndex = 0;
	}
	allChoices.forEach((choice) => {
		choice.checked = false;
	});
	renderQuizQuestions();
});

nextBtn.addEventListener('click',() => {
	currentQuestionIndex++;
	if(currentQuestionIndex > 9){
		currentQuestionIndex = 9;
	}
	allChoices.forEach((choice) => {
		choice.checked = false;
	});
	renderQuizQuestions();
});

moveToBtns.forEach((btn) => {
	btn.addEventListener('click',() => {
		currentQuestionIndex = parseInt(btn.dataset.questionNo) - 1;
		allChoices.forEach((choice) => {
			choice.checked = false;
		});
		renderQuizQuestions();
	});
});	