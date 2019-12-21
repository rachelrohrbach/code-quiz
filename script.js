function populateQuestion(indexOfQuestion) {
    var question = questions[indexOfQuestion].question;

    $("#question").text(question);

    var answers = questions[indexOfQuestion].answers;

    $('#answer').empty();

    for (var i = 0; i < answers.length; i++) {
        var answerBtn = $('<button>' + answers[i] + '</button>');
        $('#answer').append(answerBtn);
        answerBtn.addClass("answer-button");
    }
}
// display quiz description and start button, hide other divs
function showStartQuiz() {
    $("#content").show();
    $("#questiondiv").hide();
    $("#scorediv").hide();
    $('#highscoresdiv').hide();
}
// display the question(s) and answers, hide other divs
function showQuestion() {
    $("#content").hide();
    $("#questiondiv").show();
    $("#scorediv").hide();
    $('#highscoresdiv').hide();
}
// display your score with input for your initials, hide other divs
function showSubmitScore(timeScore) {
    $("#content").hide();
    $("#questiondiv").hide();
    $("#scorediv").show();
    $('#highscoresdiv').hide();

    $('#score').text(timeScore);
}

$(document).ready(function () {
    showStartQuiz();

    var currentQuestionIndex = 0;
    var secondsLeft = 75;
    var secondsOnQuestion = 15;
    var timerInterval;

    $('#start').on('click', function () {
        showQuestion();
        populateQuestion(currentQuestionIndex);
        setTime();
    });

    $('#questiondiv').on('click', 'button.answer-button', function () {
        var selectedAnswer = $(this).text();

        if (questions[currentQuestionIndex].correctAnswer === selectedAnswer) {
            $('#result').text('Correct!');
        } else {
            secondsLeft -= 10;
            $('#result').text('Wrong!');
        }

        currentQuestionIndex++;

        if (currentQuestionIndex > questions.length - 1) {
            $('#timer').text(secondsLeft);
            clearInterval(timerInterval);
            showSubmitScore(secondsLeft);
        } else {
            populateQuestion(currentQuestionIndex);
        }
    });

    // restrict submit button click until something is entered in input field
    $('.submit-button').on('click', function () {
        var initials = $('#user-initals').val();
        if (initials != null &&
            initials != undefined &&
            initials.length != 0) {

            var localHighScores = JSON.parse(localStorage.getItem('localHighScores'));
        
        // first check if there are any existing entries on highscore list
            if (localHighScores == null) {
                localHighScores = [
                    {
                        initials: initials,
                        score: secondsLeft
                    }
                ];
            } else {
                if (localHighScores.length < 10) {
                    var scoreEntry = {
                        initials: initials,
                        score: secondsLeft
                    };

                    localHighScores.push(scoreEntry);

                    localHighScores.sort(function (a, b) { return b.score - a.score });
                } else {
                    var minScore = localHighScores[0].score;
                    for (var i = 1; i < localHighScores.length; i++) {
                        if (localHighScores[i].score < minScore) {
                            minScore = localHighScores[i].score;
                        }
                    }
                    if (secondsLeft > minScore) {
                        var scoreEntry = {
                            initials: initials,
                            score: secondsLeft
                        };

                        localHighScores.push(scoreEntry);
                        localHighScores.sort(function (a, b) { return b.score - a.score });
                        localHighScores.pop();
                    }
                }
            }

            localStorage.setItem('localHighScores', JSON.stringify(localHighScores));

            showHighScores();
        }
    });
    
    $('#back-button').on('click', function () {
        currentQuestionIndex = 0;
        secondsLeft = 75;
        secondsOnQuestion = 15;
        $('#result').text('');
        showStartQuiz();
    });

    $('#clear-button').on('click', function () {
        localStorage.removeItem('localHighScores');
        $('#recorded-score').empty();
    });

    
    $('.highscore').on('click', function () {
        showHighScores();
    })

    function setTime() {
        timerInterval = setInterval(function () {
            --secondsLeft;
            $('#timer').text(secondsLeft);

            --secondsOnQuestion;

            // if secondsOnQuestion === 0 then go to next question
            if (secondsOnQuestion === 0) {
                currentQuestionIndex++;
                populateQuestion(currentQuestionIndex);
                secondsOnQuestion = 15;
            }

            // if no time remains, score 0 and stop interval
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                showSubmitScore(0);
            }
        }, 1000);


    }
    // display highscores list 
    function showHighScores() {
        var localHighScores = JSON.parse(localStorage.getItem('localHighScores'));

        $('#recorded-score').empty();

        if (localHighScores != null) {
            for (var i = 0; i < localHighScores.length; i++) {
                var initials = localHighScores[i].initials;
                var score = localHighScores[i].score;

                $('#recorded-score').append("<li>" + initials + ": " + score + "</li>");
            }
        }

        $("#content").hide();
        $("#questiondiv").hide();
        $("#scorediv").hide();
        $('#highscoresdiv').show();
    }
});