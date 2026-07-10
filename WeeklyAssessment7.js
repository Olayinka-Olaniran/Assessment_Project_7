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
const resultPercent = document.querySelector('.result-percent');
const correctAnswerCount = document.querySelector('.correct-count');
const startBtn = document.querySelector('#start-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const moveToBtns = document.querySelectorAll('.move-to-question-btn');
const submitBtn = document.querySelector('#submit-btn');
const navBtns = document.querySelector('.nav-btns');
const resultBtn = document.querySelector('#result-btn');
const reviewBtn = document.querySelector('#review-btn');
const finishBtns = document.querySelectorAll('.finish-btn');
const resultRing = document.querySelector('.result-ring');

let currentQuestionIndex = 0;

function renderQuizQuestions(){
	const chosenAnswers = getChosenAnswers();
	const selectedCategory = chosenAnswers[0];
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

	const allRadioInputs = document.querySelectorAll('input[type="radio"]');
    allRadioInputs.forEach(input => {
        input.checked = false;
        input.style.accentColor = ''; // Clears color overrides from previous questions
    });


	if (chosenAnswers[1].some((answer) => answer.id === currentQuestionIndex + 1)) {
		const selectedAnswer = chosenAnswers[1].find((answer) => answer.id === currentQuestionIndex + 1);
		const selectedChoice = document.querySelector(`input[value="${selectedAnswer.answer}"]`);
		if (selectedChoice) {
			selectedChoice.checked = true;
		}
	}

	chosenAnswers[1].forEach((answer) => {
		moveToBtns.forEach((btn) => {
			if (answer.id === parseInt(btn.dataset.questionNo)) {
				btn.classList.add('answered');
			}
		});
	});

	if(chosenAnswers[2]){
		const correctAnswers = QuizQuestions[`${chosenAnswers[0]}Answers`];
		chosenAnswers[1].forEach((answer) => {
		if(answer.answer == correctAnswers[answer.id - 1]){
			moveToBtns.forEach((btn) => {
			if (answer.id === parseInt(btn.dataset.questionNo) && answer.answer === correctAnswers[answer.id - 1]) {
				btn.classList.remove('answered');
				btn.classList.add('correct');
			}
		});
		}
	})
	}

if(chosenAnswers[2]){ 
	const correctAnswers = QuizQuestions[`${chosenAnswers[0]}Answers`];
	const selectedAnswer = chosenAnswers[1].find((answer) => answer.id === currentQuestionIndex + 1);
	const selectedChoice = document.querySelector(`input[value="${selectedAnswer.answer}"]`);
	const correctInputChoice = document.querySelector(`input[value="${correctAnswers[currentQuestionIndex]}"]`)
	
	const correctMsgElement = document.createElement('div');
    correctMsgElement.className = 'review-correct-msg-text';
    correctMsgElement.style.marginTop = '0.5rem';
    correctMsgElement.style.fontSize = '0.85rem';
    correctMsgElement.style.fontWeight = 'normal';
    correctMsgElement.textContent = QuizQuestions[chosenAnswers[0]][currentQuestionIndex].correctMsg;

    

	const wrongMsgElement = document.createElement('div');
    wrongMsgElement.className = 'review-wrong-msg-text';
    wrongMsgElement.style.marginTop = '0.5rem';
    wrongMsgElement.style.fontSize = '0.85rem';
    wrongMsgElement.style.fontWeight = 'normal';
    wrongMsgElement.textContent = QuizQuestions[chosenAnswers[0]][currentQuestionIndex].incorrectMsg;

    

    if(selectedChoice) {
        // Grab the actual styled label next to the input
        const associatedLabel = selectedChoice.nextElementSibling;
        const correctInputChoiceLabel = correctInputChoice.nextElementSibling;
        if (associatedLabel) {
			if(selectedAnswer == undefined){
				correctInputChoiceLabel.style.borderColor = '#4caf50';
                correctInputChoiceLabel.style.backgroundColor = 'rgba(76, 175, 80, 0.12)';
                correctInputChoiceLabel.style.color = '#4caf50';
				correctInputChoiceLabel.appendChild(correctMsgElement);
			}else if(selectedAnswer.answer == correctAnswers[currentQuestionIndex]){
                // Correct styling overrides
                associatedLabel.style.borderColor = '#4caf50';
                associatedLabel.style.backgroundColor = 'rgba(76, 175, 80, 0.12)';
                associatedLabel.style.color = '#4caf50';
				associatedLabel.appendChild(correctMsgElement);
            } else if(selectedAnswer.answer != correctAnswers[currentQuestionIndex]){
                // Incorrect styling overrides
                associatedLabel.style.borderColor = '#f44336';
                associatedLabel.style.backgroundColor = 'rgba(244, 67, 54, 0.12)';
                associatedLabel.style.color = '#f44336';
				associatedLabel.appendChild(wrongMsgElement);
				correctInputChoiceLabel.style.borderColor = '#4caf50';
                correctInputChoiceLabel.style.backgroundColor = 'rgba(76, 175, 80, 0.12)';
                correctInputChoiceLabel.style.color = '#4caf50';
				correctInputChoiceLabel.appendChild(correctMsgElement);
            }
        }
    }
}
}

function getChosenAnswers(){
	  try{
    let chosenAnswers = JSON.parse(localStorage.getItem("chosenAnswers")) || [];
    let validArr = false;
    chosenAnswers[1].forEach((answer)=>{
    if (answer.id && answer.answer) {
      validArr = true;
    }
  });
  return validArr ? chosenAnswers : [quizCategory.options[quizCategory.selectedIndex].value, []];
  }catch(error){return [quizCategory.options[quizCategory.selectedIndex].value, []]}
}

function storeChosenAnswers(e){
	const chosenAnswers = getChosenAnswers();
	const currentAnswer = {
		id: currentQuestionIndex + 1,
		answer: e.target.value
	};

	chosenAnswers[1].forEach((answer) => {
		if(answer.id === currentAnswer.id){
			answer.answer = currentAnswer.answer;
		}
	});
	if(!chosenAnswers[1].some((answer) => answer.id === currentAnswer.id)){
		chosenAnswers[1].push(currentAnswer);
	}
	localStorage.setItem("chosenAnswers", JSON.stringify(chosenAnswers));
}

function renderQuizResults(){
	const chosenAnswers = getChosenAnswers();
	chosenAnswers[2] = true;
	const correctAnswers = QuizQuestions[`${chosenAnswers[0]}Answers`];
	const correctCount = chosenAnswers[1].filter((answer) => {
		answer.answer == correctAnswers[answer.id - 1];
		return answer.answer == correctAnswers[answer.id - 1];
	}).length;
	resultPercent.textContent = `${Math.round((correctCount / 10) * 100)}%`;
	correctAnswerCount.textContent = correctCount;
	resultRing.style.setProperty('--percent', Math.round((correctCount / 10) * 100));
	resultPage.classList.remove('hidden');
	quizPage.classList.add('hidden');
	localStorage.setItem("chosenAnswers", JSON.stringify(chosenAnswers));
}

function renderQuizReview(){
	submitBtn.classList.add('hidden');
	navBtns.classList.remove('hidden');
	resultPage.classList.add('hidden');
	allChoices.forEach((choice) => {
		choice.disabled = true;
	});
	renderQuizQuestions();
}

startBtn.addEventListener('click',renderQuizQuestions);

allChoices.forEach((choice) => {
	choice.addEventListener('click',(e) => {
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
		const associatedLabel = choice.nextElementSibling;
        if (associatedLabel) {
			associatedLabel.style.borderColor = '';
            associatedLabel.style.backgroundColor = '';
        	associatedLabel.style.color = '';
		};
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
		const associatedLabel = choice.nextElementSibling;
        if (associatedLabel) {
			associatedLabel.style.borderColor = '';
            associatedLabel.style.backgroundColor = '';
        	associatedLabel.style.color = '';
		};
	});
	renderQuizQuestions();
});

moveToBtns.forEach((btn) => {
	btn.addEventListener('click',() => {
		currentQuestionIndex = parseInt(btn.dataset.questionNo) - 1;
		allChoices.forEach((choice) => {
			choice.checked = false;
        const associatedLabel = choice.nextElementSibling;
        if (associatedLabel) {
			associatedLabel.style.borderColor = '';
            associatedLabel.style.backgroundColor = '';
        	associatedLabel.style.color = '';
		}});
		renderQuizQuestions();
	});
});	

submitBtn.addEventListener('click',() => {
	const userDecision= confirm('Are you sure you want to submit the quiz?');
	if(userDecision){
		renderQuizResults();
	}else{
		return
	}

});

reviewBtn.addEventListener('click', () => {
	currentQuestionIndex = 0
	renderQuizReview();
});

resultBtn.addEventListener('click', () => {
	renderQuizResults();
});

finishBtns.forEach((finishBtn)=>finishBtn.addEventListener('click', () => {
	localStorage.removeItem("chosenAnswers");
	location.reload();
}));

document.addEventListener('DOMContentLoaded', () => {
	const chosenAnswers = getChosenAnswers();
	if (chosenAnswers[0] !== 'none' && chosenAnswers[1].length > 0 && !chosenAnswers[2]) {
		renderQuizQuestions();
	}else if (chosenAnswers[0] !== 'none' && chosenAnswers[1].length > 0 && chosenAnswers[2]) {
		renderQuizReview();
	}
});

