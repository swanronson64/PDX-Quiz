'use strict';

$(document).ready(function () {

    let questionNumber = 0;
    let score = 0;

    console.log('ready!')


    /**
     * increments questionNumber variable
     */
    function incrementQuestionNumber() {

        questionNumber++

    }

    //This updates the current question number display in the header
    function updateQuestionNumber() {

        $('.question-number').html(questionNumber + 1)

    }

    /**
     * displays positive feedback and GIF, generates next button
     */
    function correctAnswerFeedback() {
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        console.log('correct');
        $('.quiz-page').html(`<div class='correct-feedback'><div><img src="https://i.imgur.com/Ar0sB1Q.gif" alt="Man smiling at you"><p>Well look at you. That was right.</p></div><button type="button" role="button" id='nextQuestion'>Next!</button></div>`)
    }
    /**
     * displays negative feedback and GIF, generates next button
     */
    function incorrectAnswerFeedback() {
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        console.log('incorrect');
        $('.quiz-page').html(`<div class='incorrect-feedback'><div><video autoplay loop><source type="video/mp4" src="//i.imgur.com/1dL0wXa.mp4" alt="Man swinging spatula like baseball bat'" playsinline></video><p>A swing and a miss! The correct answer was ${correctAnswer}.</p></div><button type="button" role="button" id='nextQuestion'>Moving on...</button></div>`)
    }
    /**
     * renders results page in the DOM and hides header
     */
    function displayResults() {

        if (score != 10) {
            $('.quiz-page').html(`<div><div><img src="https://i.imgur.com/OX2HnfS.gif" alt="Man appears proud"></div><p>You scored ${score} out of 10? I am just proud you made it to the end.</p><button type='button' role="button" id='resetButton'>Try Again</button></div>`);

            "https://i.imgur.com/GODm18w.mp4"

        } else {

            $('.quiz-page').html(`<div><div><img src="https://i.imgur.com/ORGLsXd.gif" alt="Excited man"></div><p>Wow! You really are something! You scored ${score} out of 10</p><button type='button' role="button" id='resetButton'>Restart Quiz?</button></div>`);
        }

    };
    /**
     * Increments to the next question, and renders next question html in the DOM.
     * If at the end of the quiz, displays results.
     */
    function nextQuestion() {
        if (questionNumber != STORE.length - 1) {
            incrementQuestionNumber();
            updateQuestionNumber();
            loadQuestion();
        } else {
            displayResults();
        }
    }

    /**
     * Generates HTML for question page and displays results if no more questions exist.
     */
    function createQuestion() {
        console.log("the question has been created!!!");
        if (questionNumber <= STORE.length) {
            return `<div class="question-${questionNumber}">

            <form id='question-form'>
                <fieldset>
                    <legend>${STORE[questionNumber].question}</legend>
                    <div class="answerOptions row">
                        <label  class="answerOption col-4 css-label">
                            <input class="radioButton css-checkbox" role="button" type="radio" value="${STORE[questionNumber].answers[0]}" name="options" required>${STORE[questionNumber].answers[0]}</label>
                        <label  class="answerOption col-4 css-label">
                            <input class="radioButton css-checkbox" role="button" type="radio" value="${STORE[questionNumber].answers[1]}" name="options" required>${STORE[questionNumber].answers[1]}</label>
                        <label  class="answerOption col-4 css-label">
                            <input class="radioButton css-checkbox" role="button" type="radio" value="${STORE[questionNumber].answers[2]}" name="options" required>${STORE[questionNumber].answers[2]}</label>
                        <label  class="answerOption col-4 css-label">
                            <input class="radioButton css-checkbox" role="button" type="radio" value="${STORE[questionNumber].answers[3]}" name="options" required>${STORE[questionNumber].answers[3]}</label>
                    </div>
                    <div class="col-12">
            <button role="button" type="submit" class="submitButton">submit</button>
        </div>
                </fieldset>
            </form>
        </div>
        `;
        }

    }

    function toggleSelected() {
        $('.answerOptions input[type="radio"]:checked').parent('label').toggleClass('selected');

    }

    /** 
     * registers events for button clicks.
     */
    function registerEvents() {

        $('#start-button').on('click', (function (event) {

            startQuiz();
        }));

        $(document).on('click', '.answerOptions input[type="radio"]', function (event) {
            $('.answerOptions input[type="radio"]').parent('label').removeClass('selected');
            toggleSelected();

        });


        $(document).on('submit', '#question-form', function (event) {
            event.preventDefault();
            chooseAnswer();
            return false
        });

        $(document).on('click', '#nextQuestion', function (event) {
            event.preventDefault();
            nextQuestion();
        });
        $(document).on('click', '#resetButton', function (event) {
            startQuiz();
        });
    };

    registerEvents();


    //renders html from createQuestion in the DOM
    function loadQuestion() {
        $('.quiz-page').html(createQuestion());
    }

    //begins quiz and loads first question while hiding the start page
    function startQuiz() {
        score = 0;
        questionNumber = 0;
        $('.number-correct').html(`0`);
        $('#trackingHeader').show();
        loadQuestion();
        updateQuestionNumber();
        $('h1').hide();
        $('.start-page').hide();
        $('.quiz-page').show();

    }

    /**
     *compares selected answer against the correct answer, increments score, and updates score and current question number trackers in header.
     */
    function chooseAnswer() {


        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        let chosen = $('.radioButton:checked');
        let answer = chosen.val();
        let isAnswerCorrect = answer === correctAnswer;

        $('.current-question-number').html(`${questionNumber + 1}`);

        if (answer === correctAnswer) {

            correctAnswerFeedback();
            score++;
            //**********changed monday march 26th*************            
            $('.number-correct').html(`${score}`);

            console.log(score);
        } else {

            incorrectAnswerFeedback();
            console.log(score);
        }
    }


});