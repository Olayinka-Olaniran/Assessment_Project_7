import { QuizData } from './quizData.js';

const startPage = document.querySelector('.container');
const quizPage = document.querySelector('.quiz-container');
const resultPage = document.querySelector('.result-container');
const quizCategory = document.querySelector('#category');
const questionDisplay = document.querySelector('.question-display');
const questionCategory = document.querySelector('.quiz-category');
const allotedTimeDisplay = document.querySelector('.alloted-time');
const allotedTimerDisplay = document.querySelector('.alloted-timer');
const totalQuestionsDisplays = document.querySelectorAll('.total-no-of-questions');
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
const moveToWrapper = document.querySelector('#move-to-question-btns-wrap');
const submitBtn = document.querySelector('#submit-btn');
const navBtns = document.querySelector('.nav-btns');
const resultBtn = document.querySelector('#result-btn');
const reviewBtn = document.querySelector('#review-btn');
const finishBtns = document.querySelectorAll('.finish-btn');
const resultRing = document.querySelector('.result-ring');
const confirmDialog = document.getElementById('submit-confirm-dialog');
const dialogConfirmBtn = document.getElementById('dialog-confirm-btn');
const dialogCancelBtn = document.getElementById('dialog-cancel-btn');
const alertDialog = document.getElementById('alert-dialog');
const dialogP = document.querySelector('.dialog-body p')
const alertCloseX = document.getElementById('alert-close-x');
const alertCloseBtn = document.getElementById('alert-close-btn');
const timer = document.querySelector('.timer')

let currentQuestionIndex = 0;

function getQuestionCount() {
    const chosenAnswers = getChosenAnswers();
    return QuizData[chosenAnswers[0]]?.questions?.length ?? 0;
}

let moveToBtns = document.querySelectorAll('.move-to-question-btn'); // empty NodeList until generated

function generateMoveToButtons(count) {
    if (moveToWrapper.children.length === count) return; // already built for this category, skip
    moveToWrapper.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const btn = document.createElement('button');
        btn.id = `q-${i}`;
        btn.dataset.questionNo = i;
        btn.className = 'move-to-question-btn';
        btn.textContent = i;
        moveToWrapper.appendChild(btn);
    }
    moveToBtns = document.querySelectorAll('.move-to-question-btn');
    attachMoveToListeners();
}

function attachMoveToListeners() {
    moveToBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentQuestionIndex = parseInt(btn.dataset.questionNo) - 1;
            allChoices.forEach((choice) => {
                choice.checked = false;
                const associatedLabel = choice.nextElementSibling;
                if (associatedLabel) {
                    associatedLabel.style.borderColor = '';
                    associatedLabel.style.backgroundColor = '';
                    associatedLabel.style.color = '';
                }
            });
            renderQuizQuestions();
        });
    });
}

function updateTotalQuestionsDisplay() {
	const chosenAnswers = getChosenAnswers();
    const category = chosenAnswers[0]
    const count = (category !== 'none' && QuizData[category]) ? (QuizData[category].questions?.length ?? '--') : '--';
    totalQuestionsDisplays.forEach((el) => {
        el.textContent = count;
    });
}

function populateCategoryDropdown() {
    (QuizData.categories ?? []).forEach((key) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = QuizData[key]?.label ?? key;
        quizCategory.appendChild(option);
    });
}

function renderQuizQuestions(){
	const chosenAnswers = getChosenAnswers();
	const selectedCategory = chosenAnswers[0];
	if(selectedCategory === 'none'){
	dialogP.textContent = 'Please select a category to start the quiz!'
    alertDialog.showModal();
    return;
	}
	if(!QuizData[selectedCategory]){
	dialogP.textContent = 'Please select a valid category to start the quiz!'
    alertDialog.showModal();
	return;
	}
    updateTotalQuestionsDisplay();
	generateMoveToButtons(QuizData[selectedCategory]?.questions?.length ?? 0);
	if (!chosenAnswers[2]) {
        quizTimer();
    } else {
        // Optional: If you want the timer UI element to show "00:00" or be hidden during review
        timer.textContent = "00:00"; 
    }
	startPage.classList.add('hidden');
	quizPage.classList.remove('hidden');

	const currentQ = QuizData[selectedCategory]?.questions?.[currentQuestionIndex];

	if (!currentQ) {
		questionText.textContent = 'This question is unavailable.';
		questionNo.textContent = currentQuestionIndex + 1;
		choiceA.textContent = choiceB.textContent = choiceC.textContent = choiceD.textContent = '';
		return;
	}

	questionText.textContent = currentQ?.question ?? 'This question is unavailable.';
	questionNo.textContent = currentQ?.id ?? currentQuestionIndex + 1;;
	questionCategory.textContent = selectedCategory;
	choiceA.textContent = currentQ?.options?.a ?? '';
	choiceB.textContent = currentQ?.options?.b ?? '';
	choiceC.textContent = currentQ?.options?.c ?? '';
	choiceD.textContent = currentQ?.options?.d ?? '';

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
		
		const correctAnswers = QuizData[chosenAnswers[0]]?.answers ?? [];
if (chosenAnswers[2]) {
    moveToBtns.forEach((btn) => {
        const qNo = parseInt(btn.dataset.questionNo);
        const userAnswer = chosenAnswers[1].find((answer) => answer.id === qNo);

        btn.classList.remove('answered', 'correct', 'wrong', 'missed');

        if (!userAnswer) {
            btn.classList.add('missed');
        } else if (userAnswer.answer === correctAnswers[qNo - 1]) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
    });
}
	}

if(chosenAnswers[2]){ 
	let selectedAnswer;
	let selectedChoice;
	let associatedLabel;
	let correctInputChoiceLabel;
	const correctAnswers = QuizData[chosenAnswers[0]]?.answers ?? [];
	
	selectedAnswer = chosenAnswers[1].find((answer) => answer.id === currentQuestionIndex + 1)
	
	if(selectedAnswer != undefined){
	selectedChoice = document.querySelector(`input[value="${selectedAnswer.answer}"]`);
	}
	
	const correctInputChoice = document.querySelector(`input[value="${correctAnswers[currentQuestionIndex]}"]`)

	const correctMsgElement = document.createElement('div');
    correctMsgElement.className = 'review-correct-msg-text';
    correctMsgElement.style.marginTop = '0.5rem';
    correctMsgElement.style.fontSize = '0.85rem';
    correctMsgElement.style.fontWeight = 'normal';
    correctMsgElement.textContent = QuizData[chosenAnswers[0]]?.questions?.[currentQuestionIndex]?.correctMsg ?? 'Correct!';

	const wrongMsgElement = document.createElement('div');
    wrongMsgElement.className = 'review-wrong-msg-text';
    wrongMsgElement.style.marginTop = '0.5rem';
    wrongMsgElement.style.fontSize = '0.85rem';
    wrongMsgElement.style.fontWeight = 'normal';
    wrongMsgElement.textContent = QuizData[chosenAnswers[0]]?.questions?.[currentQuestionIndex]?.incorrectMsg ?? 'Incorrect!';

    

    if(selectedChoice) {
        // Grab the actual styled label next to the input
        associatedLabel = selectedChoice.nextElementSibling;
	}

		if(correctInputChoice){
        correctInputChoiceLabel = correctInputChoice.nextElementSibling;
		}
        

		if (selectedAnswer == undefined) {
			if (correctInputChoice) {
				correctInputChoiceLabel.style.borderColor = '#4caf50';
				correctInputChoiceLabel.style.backgroundColor = 'rgba(76, 175, 80, 0.12)';
				correctInputChoiceLabel.style.color = '#4caf50';
				correctInputChoiceLabel.appendChild(correctMsgElement);
			}}else if(selectedAnswer.answer == correctAnswers[currentQuestionIndex]){
                // Correct styling overrides
                associatedLabel.style.borderColor = '#4caf50';
                associatedLabel.style.backgroundColor = 'rgba(76, 175, 80, 0.12)';
                associatedLabel.style.color = '#4caf50';
				associatedLabel.appendChild(correctMsgElement);
            } else if(selectedAnswer.answer != correctAnswers[currentQuestionIndex] && correctInputChoice){
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

function updateAllotedTimeDisplay() {
    const category = quizCategory.options[quizCategory.selectedIndex].value;
	if(category==='none'){
		allotedTimeDisplay.textContent = `-- minutes`;
		return
	}
    const ms = QuizData[category]?.timerInMs ?? 300000;
    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let display;
    if (seconds === 0) {
        display = `${minutes} minute${minutes === 1 ? '' : 's'}`;
		
    } else {
        display = `${minutes}m ${seconds}s`;
    }

    allotedTimeDisplay.textContent = display;
	allotedTimerDisplay.textContent =`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function quizTimer(){
    const chosenAnswers = getChosenAnswers()
    let quizEndTime;
    if(chosenAnswers[3]){
        quizEndTime = chosenAnswers[3]
    }else{
		const quizTimeLimit = QuizData[chosenAnswers[0]]?.timerInMs || 300000
        quizEndTime = Date.now() + Number(quizTimeLimit)
        chosenAnswers[3] = quizEndTime
        localStorage.setItem("chosenAnswers", JSON.stringify(chosenAnswers));
    }
    
    // Clear any existing window tracker to prevent stacking
    if (window.timeDisplayInterval) {
        clearInterval(window.timeDisplayInterval);
    }

    // 1. Group the tick logic into a single nested function
    function tick() {
        const timeLeft = quizEndTime - Date.now()

        // 2. MOVED INSIDE: This now catches the expiration on every single second tick
        if (timeLeft <= 0) {
            clearInterval(window.timeDisplayInterval);
            window.timeDisplayInterval = null;
            timer.textContent = "00:00"; // Lock display cleanly at zero
            renderQuizResults(); 
            return;
        }

        const timeObject = new Date(timeLeft);
        const minutes = timeObject.getUTCMinutes().toString().padStart(2, '0');
        const seconds = timeObject.getUTCSeconds().toString().padStart(2, '0');
        
        timer.textContent = `${minutes}:${seconds}`
    }

    // 3. RUN IMMEDIATELY: Fixes the 1-second default text flash on refresh
    tick();

    // 4. START THE LOOP
    window.timeDisplayInterval = setInterval(tick, 1000)
}

function getChosenAnswers(){
	  try{
    let chosenAnswers = JSON.parse(localStorage.getItem("chosenAnswers"));

	if(!chosenAnswers){
		chosenAnswers = [quizCategory.options[quizCategory.selectedIndex].value, [], null, null]
	}

    let validArr = false;
	if(Array.isArray(chosenAnswers[1])){
		if(chosenAnswers[1].length == 0){
			validArr = true;
		}else{
			validArr = chosenAnswers[1].every(answer => answer && answer.id && answer.answer);
		}
	}

	if (!validArr) {
            const currentCat = chosenAnswers[0] || quizCategory.options[quizCategory.selectedIndex].value;
            const timerVal = chosenAnswers[2] !== undefined ? chosenAnswers[2] : null;
            const submitVal = chosenAnswers[3] !== undefined ? chosenAnswers[3] : null;
            
            return [currentCat, [], timerVal, submitVal];
        }

        return chosenAnswers;

  }catch(error){
    console.error("Storage parse failure:", error);
    return [quizCategory.options[quizCategory.selectedIndex].value, [], null, null];
}}

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
	const correctAnswers = QuizData[chosenAnswers[0]]?.answers ?? [];
	const correctCount = chosenAnswers[1].filter((answer) => {
		answer.answer == correctAnswers[answer.id - 1];
		return answer.answer == correctAnswers[answer.id - 1];
	}).length;
	
	const questionCount = getQuestionCount() || 1;
	resultPercent.textContent = `${Math.round((correctCount / questionCount) * 100)}%`;
	correctAnswerCount.textContent = correctCount;
	resultRing.style.setProperty('--percent', Math.round((correctCount / questionCount) * 100));
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
	const maxIndex = Math.max(getQuestionCount() - 1, 0);
	if(currentQuestionIndex > maxIndex){
		currentQuestionIndex = maxIndex;
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

submitBtn.addEventListener('click',() => {
    confirmDialog.showModal(); 
});

// Follow-up Action: User confirms submission
dialogConfirmBtn.addEventListener('click', () => {
	clearInterval(window.timeDisplayInterval);
	window.timeDisplayInterval = null;
	timer.textContent = "00:00";
    confirmDialog.close();
    renderQuizResults(); // Executes your calculations dashboard view
});

// Follow-up Action: User cancels submission
dialogCancelBtn.addEventListener('click', () => {
    confirmDialog.close(); // Simply tucks the dialog window back away
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

// Click the X or Got It! button to close the modal window
alertCloseX.addEventListener('click', () => {
    alertDialog.close();
});
alertCloseBtn.addEventListener('click', () => {
    alertDialog.close();
});

// Recommended Click-Outside Auto Close Logic
alertDialog.addEventListener('click', (event) => {
    const dialogDimensions = alertDialog.getBoundingClientRect();
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        alertDialog.close();
    }
});

// Recommended Click-Outside Auto Close Logic for Submit Confirmation
confirmDialog.addEventListener('click', (event) => {
    const dialogDimensions = confirmDialog.getBoundingClientRect();
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        confirmDialog.close(); // Closes safely if user clicks the backdrop area
    }
});

quizCategory.addEventListener('change', ()=>{
	updateAllotedTimeDisplay() 
	updateTotalQuestionsDisplay()
});

document.addEventListener('DOMContentLoaded', () => {
	populateCategoryDropdown()
	updateAllotedTimeDisplay() 
    updateTotalQuestionsDisplay();
	const chosenAnswers = getChosenAnswers();
	if (chosenAnswers[0] !== 'none' && !chosenAnswers[2]) {
		renderQuizQuestions();
	}else if(chosenAnswers[3] && !chosenAnswers[2]){
		renderQuizQuestions();
	}else if (chosenAnswers[0] !== 'none' && chosenAnswers[2]) {
		renderQuizReview();
	}else if(chosenAnswers[3]){
		renderQuizQuestions();
	}
});