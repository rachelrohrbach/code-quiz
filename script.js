function populateQuestion(indexOfQuestion) {
    var question = questions[indexOfQuestion].question;

    $("#question").text(question);

    var answers = questions[indexOfQuestion].answers;

    $('#answer').empty();

    for (var i = 0; i < answers.length; i++) {
        $('#answer').append('<a class=" mybtn btn btn-primary" role="button">' + answers[i] + '</a>');
    }
}

$(document).ready(function () {
    $("#content").show();
    $("#questiondiv").hide();
    var currentQuestion = 0;

    $('#start').on('click', function () {
        $("#content").hide();
        $("#questiondiv").show();

        populateQuestion(currentQuestion);
        setTime();
    });
    $('#questiondiv').on('click', '.mybtn', function () {
        var selectedAnswer = $(this).text();

        if (questions[currentQuestion].correctAnswer === selectedAnswer) {
            $('#result').text('Correct!');
        } else {
            $('#result').text('Wrong!');
        }

        currentQuestion++;

        populateQuestion(currentQuestion);

    });
    var timerEl = document.getElementById('timer');

    var secondsLeft = 70;
    var secondsOnQuestion = 15;

    function setTime() {
        var timerInterval = setInterval(function () {
            --secondsLeft;
            timerEl.textContent = 'Time:' + ' ' + secondsLeft;

            --secondsOnQuestion;

            // if secondsOnQuestion === 0 then go to next question
            if (secondsOnQuestion === 0) {
                currentQuestion++;
                populateQuestion(currentQuestion);
                secondsOnQuestion = 15;
            }

            // if (secondsLeft === 15 || questions[currentQuestion].correctAnswer === selectedAnswer) {
            // clearInterval(timerInterval);
            // sendMessage();
            // }

        }, 1000);
    }
    
});