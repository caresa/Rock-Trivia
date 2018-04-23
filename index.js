
'use strict';


const appData = {
	img: document.getElementById('js-player'),
	question: document.getElementById('js-question'),
	displayAnswer: document.getElementById('js-answer'),
	answer: document.getElementById('answer'),
	increment: document.getElementById('js-counter'),
	quizNumber: document.getElementById('js-quizNumber'),
	quizCounter: document.getElementById('js-quizCounter'),
	nextButton: document.getElementById('next'),
	startButton: document.getElementById('nav-forward'),
	finalScreen: document.getElementById('final-screen'),
	alertText: document.getElementById('dialog'),
	questionNumber: 0,
	correct: 0,
	wrong: 0,
	ansImg: 0
}

$(function() {
	$(appData.quizNumber).hide();
	$(appData.quizCounter).hide();
	$(appData.nextButton).hide();
	$(appData.alertText).hide();
	$(appData.finalScreen).hide();
});

$(appData.startButton).on('click', function(event){
	event.preventDefault();

	if ($(this).hasClass('js-start')) {
		startQuiz(this);
	} else if($(this).hasClass('js-next') && questions.length > appData.questionNumber) {
		const correctIndex = questions[appData.questionNumber].correctIndex;
		const correctAnswer = questions[appData.questionNumber].answers[correctIndex];
		let playerAnswer = $('input[name=question-radio]:checked').val();
		$('input[type=radio]').prop('checked', false);

		console.log(playerAnswer);

		if (typeof playerAnswer !== 'undefined') {
			displayAnswerText(correctAnswer, playerAnswer);
			appData.questionNumber ++;
			keepScore(appData.correct);		
		} else if (typeof playerAnswer === 'undefined' && $(appData.startButton).text() !== 'Continue') {
			$(appData.alertText).show();
		} else {	
			displayQuestion(appData.questionNumber);
		}
	
	}	else {
		finishQuiz(quizCounter);
	} 
});

$('#next').on('click', function(event) {
	$('.showQuestion').detach();
	displayQuestion(appData.questionNumber);

	$(appData.question).show();
	$(appData.displayAnswer).hide();

	$(appData.nextButton).hide();
	$(appData.startButton).show();
});

function startQuiz () {
	displayQuestion(appData.questionNumber);
	$(quizNumber).show();
	$(quizCounter).show();

	$(appData.startButton).removeClass('js-start');
	$(appData.startButton).addClass('js-next');
}

function showQuestionState() {
	$(appData.displayAnswer).hide();
	$(appData.startButton).text('Submit');
	$(appData.startButton).show();
	$(appData.nextButton).hide();
	$(appData.question).show();
	$(appData.img).hide();
	$(appData.alertText).hide();
}

//add text here re question number

function displayQuestion(questionNumber) {
	$(quizNumber).text((appData.questionNumber + 1)+ " out of " +questions.length);
	const quizQuestion = questions[appData.questionNumber];

	$('.showQuestion').remove();

	quizQuestion.answers.forEach(function (answer, i){
		const choice = 
		`<p class='showQuestion'><input type='radio' id='radio-0${i+1}' name='question-radio' value='${answer}'>
		<label for='radio-0${i+1}' id='question-0${i+1}'>${answer}</label></p>`
		$('#js-question').append(choice);		
	});

	$('.question-number').text(quizQuestion.questionNumber);
	$('.question-text').text(quizQuestion.question);

	showQuestionState();
}

function showAnswerState() {
	$(appData.startButton).text('Continue');
	$(appData.alertText).hide();
	$(appData.question).hide();
	$(appData.displayAnswer).show();
}

function displayAnswerText(correctAnswer, playerAnswer) {
	let answerImg = questions[appData.questionNumber].answersImg;
	let answerText;
	if (correctAnswer === playerAnswer){
		answerText = `correct! the answer is ${correctAnswer}`;
		appData.correct ++;
	}
	else{
		answerText= `sorry! the answer is ${correctAnswer}`;			
	}
	$(appData.displayAnswer).html(`${answerText} ${answerImg}`);
	showAnswerState();
}



function resetQuiz (button) {
    $(button).addClass('js-start');
    $(button).removeClass('js-next');
    $(button).removeClass('js-complete');
    $(button).text('Start Quiz');
}

function showNext (button) {
    $(button).addClass('js-start');
    $(button).removeClass('js-next');
    $(button).removeClass('js-complete');
    $(button).text('Start Quiz');
    $(button).click (function (event){
    	displayQuestion(appData.questionNumber);
    });
}
	
function keepScore(correct){
	let confirmAnswer = "answer";
	if (correct > 1 || correct === 0 ){
		confirmAnswer += "s";
	}
	$(quizCounter).html(`${correct} correct ${confirmAnswer}`);
	
}

function finishQuiz(quizCounter) {
	$(appData.finalScreen).show();
	$(quizNumber).hide();
	$(quizCounter).hide();
	$(appData.nextButton).hide();
	$(appData.alertText).hide();
	$(appData.question).hide();
	$(appData.displayAnswer).hide();
	$(appData.startButton).html('Retake Quiz');
	$(appData.finalScreen).append(`You got ${appData.correct} out of 10`);
	$(appData.startButton).unbind().on('click', function(event){
		window.location.reload(true);
	});
}