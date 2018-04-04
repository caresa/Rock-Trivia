
'use strict';

const img = document.getElementById('js-player');
const question = document.getElementById('js-question');
const displayAnswer = document.getElementById('js-answer');
const answer = document.getElementById('answer');
const increment = document.getElementById('js-counter');
const quizNumber = document.getElementById("js-quizNumber");
const quizCounter = document.getElementById("js-quizCounter");
const nextButton = document.getElementById("next");
const startButton = document.getElementById("nav-forward");
const finalScreen = document.getElementById("final-screen");
let alertText = document.getElementById("dialog");
let questionNumber = 0;
let correct = 0;
let wrong = 0;

$(quizNumber).hide();
$(quizCounter).hide();
$(nextButton).hide();
$(alertText).hide();
$(finalScreen).hide();

//hide question#/question# on answer screen
//final screen print out totals


$("#nav-forward").on('click', function(event){
	if ($(this).hasClass('js-start')) {
		startQuiz(this);
		displayQuestion(questionNumber);
		$(quizNumber).show();
		$(quizCounter).show();
	} else if($(this).hasClass('js-next')) {
		let playerAnswer = $('input[name=question-radio]:checked').val();
		$('input[type=radio]').prop('checked', false);

		console.log(typeof playerAnswer);
		console.log(playerAnswer);

		if (typeof playerAnswer !== 'undefined') {
			const correctAnswer = questions[questionNumber].correctAnswer;
			let answerImg = `<img src="./imageFiles/question1.jpeg" alt= "${correctAnswer}">`;
			let answerText;

			$(alertText).hide();
			$(question).hide();

			if (correctAnswer === playerAnswer){
				answerText= `correct! the answer is ${correctAnswer}`;
				correct ++;

				//make div for number of correct answers
			}
			else{
				answerText= `sorry! the answer is ${correctAnswer}`;			
			}

			questionNumber ++;
			keepScore(correct);
			if( questionNumber <= 9 ){
				$(displayAnswer).html(`${answerText} ${answerImg}`)
					//$(question).hide();
				$(displayAnswer).show();
				$(nextButton).show();
				$(startButton).hide();
				displayQuestion(questionNumber);

			
			}else{
				$(finalScreen).show();
				$(quizNumber).hide();
				$(quizCounter).hide();
				$(nextButton).hide();
				$(alertText).hide();
				$(question).hide();
				$(startButton).html('Retake Quiz');
				debugger
				//reload page
				$(startButton).unbind().on("click", function(event){
					debugger
					window.location.reload(true);
				});
			}
				
		} else {	
			$(alertText).show();
			console.log(questionNumber);
			}
		
		}	
	
});

$("#next").on('click', function(event) {
	displayQuestion(questionNumber);

	$(question).show();
	$(displayAnswer).hide();

	$(nextButton).hide();
	$(startButton).show();
});

function startQuiz (button) {
    img.style.display = 'none';
    question.style.display = "block";
    $(button).removeClass('js-start');
    $(button).addClass('js-next');
    $(button).text('Submit');

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
    	displayQuestion(questionNumber);
    });
}

function displayQuestion(questionNumber) {
	console.log(questionNumber);
	$(quizNumber).text((questionNumber+1)+'/'+questions.length);
	// make sure valid question.
	// if not finishQuiz()
	const nextQuestion = [];
	var question = questions[questionNumber];
	console.log(question);

	$('.question-number').text(question.questionNumber);
	$('.question-text').text(question.question);

	$('#radio-01').val(question.answerOne);
	$('#question-01').text(question.answerOne);
	$('#radio-02').val(question.answerTwo);
	$('#question-02').text(question.answerTwo);
	$('#radio-03').val(question.answerThree);
	$('#question-03').text(question.answerThree);
	$('#radio-04').val(question.answerFour);
	$('#question-04').text(question.answerFour);
	
};
	
function keepScore(correct){
	$(quizCounter).text(correct);
	
	console.log(questions.length)
	
}

function finishQuiz() {

}



