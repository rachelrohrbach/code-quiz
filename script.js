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
                currentQuestionIndex++;
                populateQuestion(currentQuestionIndex);
                secondsOnQuestion = 15;
            }

            // once last question is answered, stop interval and save time left as high score
            if (secondsLeft === 0 || currentQuestionIndex === questions.length) {
                var timeScore = secondsLeft;
                clearInterval(timerInterval);
            }
        
            var finalScore =$('#score');
            finalScore.text('Your final score is ' + timeScore + '.');
            $('#score').append(finalScore);
    

        }, 1000);

       



        // after the final question OR if the time runs out replace the questionDiv with a new div 
        // Print  All done!
        // Print 'your final score is' +  clearTimeOut()
        // Enter intials into form with a submit button, store score locally 
        // When submit button is clicked navigate to the highscores page

    }

});