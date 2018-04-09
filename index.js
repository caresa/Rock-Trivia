
'use strict';

const img = document.getElementById('js-player');
const question = document.getElementById('js-question');
const displayAnswer = document.getElementById('js-answer');
const answer = document.getElementById('answer');
const increment = document.getElementById('js-counter');
const quizNumber = document.getElementById('js-quizNumber');
const quizCounter = document.getElementById('js-quizCounter');
const nextButton = document.getElementById('next');
const startButton = document.getElementById('nav-forward');
const finalScreen = document.getElementById('final-screen');
let alertText = document.getElementById('dialog');
let questionNumber = 0;
let correct = 0;
let wrong = 0;
let ansImg = 0;

$(quizNumber).hide();
$(quizCounter).hide();
$(nextButton).hide();
$(alertText).hide();
$(finalScreen).hide();


//hide question#/question# on answer screen
//final screen print out totals


$('#nav-forward').on('click', function(event){
	if ($(this).hasClass('js-start')) {
		startQuiz(this);
		displayQuestion(questionNumber);
		$(quizNumber).show();
		$(quizCounter).show();
	} else if($(this).hasClass('js-next')) {
		const correctIndex = questions[questionNumber].correctIndex;
		const correctAnswer = questions[questionNumber].answers[correctIndex];
		let playerAnswer = $('input[name=question-radio]:checked').val();
		$('input[type=radio]').prop('checked', false);
		if (typeof playerAnswer !== 'undefined') {

			
			let answerText;
			let answerImg = questions[questionNumber].answersImg;
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
			finishQuiz(quizCounter);
			
			//reload page
			$(startButton).unbind().on('click', function(event){
				
			window.location.reload(true);
			});
		}
			
	} else {	
		$(alertText).show();
		}
	
	}	
	
});

$('#next').on('click', function(event) {
	$('.showQuestion').detach();
	displayQuestion(questionNumber);

	$(question).show();
	$(displayAnswer).hide();

	$(nextButton).hide();
	$(startButton).show();
});

function startQuiz (button) {
    img.style.display = 'none';
    question.style.display = 'block';
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
	$(quizNumber).text((questionNumber)+'/'+questions.length);
	const quizQuestion = questions[questionNumber];

	quizQuestion.answers.forEach(function (answer, i){
		const choice = 
		`<p class='showQuestion'><input type='radio' id='radio-0${i+1}' name='question-radio' value='${answer}'>
		<label for='radio-0${i+1}' id='question-0${i+1}'>${answer}</label></p>`
		
		//$(quizQuestion).append($(choice);
		//$('.question').appendTo(choice);
		$('#js-question').append(choice);
		//console.log(quizQuestion[i].correctAnswer);
		
	});
	$('.question-number').text(quizQuestion.questionNumber);
	$('.question-text').text(quizQuestion.question);

	
	
	
};
	
function keepScore(correct){
	$(quizCounter).text(correct);
	
}

function finishQuiz(quizCounter) {
	//console.log(quizCounter);
	$(finalScreen).append(`You got ${correct} out of 10`);

}



