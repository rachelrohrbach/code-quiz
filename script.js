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

$(document).ready(function () {
    $("#content").show();
    $("#questiondiv").hide();
    $("#scorediv").hide();

    var currentQuestionIndex = 0;
    var timerEl = document.getElementById('timer');
    var secondsLeft = 70;
    var secondsOnQuestion = 15;

    $('#start').on('click', function () {
        $("#content").hide();
        $("#questiondiv").show();
        $("#scorediv").hide();

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
            $("#content").hide();
            $("#questiondiv").hide();
            $("#scorediv").show();
        } else {
            populateQuestion(currentQuestionIndex);
        }

    });
    

    function setTime() {
        var timerInterval = setInterval(function () {
            --secondsLeft;
            timerEl.textContent = 'Time:' + ' ' + secondsLeft;

            --secondsOnQuestion;

            // if secondsOnQuestion === 0 then go to next question
            if (secondsOnQuestion === 0) {
                currentQuestionIndex++;
                populateQuestion(currentQuestionIndex);
                secondsOnQuestion = 15;
            }

            // once last question is answered, stop interval and save time left as high score
            if (secondsLeft === 0 || currentQuestionIndex === questions.length) {
                var timeScore = secondsLeft;
                clearInterval(timerInterval);
            }

            var finalScore = $('#score');
            finalScore.text('Your final score is ' + timeScore + '.');
            $('#score').append(finalScore);


        }, 1000);

        var scoreBtn = $('<button />');
        scoreBtn.text('Submit');
        $('#score-button').append(scoreBtn);
        $('#score-button').click(function () { window.location = 'scores.html' });


        // Store finalScore & user-initals as an object locally 

    }

});