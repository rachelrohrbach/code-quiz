$(document).ready(function () {

    var questionsEl = [
        {
            question: 'JQuery is a ___ Library',
            answers: ['1. JavaScript', '2. HTML', '3. Java', '4. CSS'],
            correctAnswer: '1. JavaScript'
        },
        {
            question: 'Arrays in JavaScript can be used to store',
            answers: ['1. other arrays', '2. booleans', '3. numbers and strings', '4. all of the above'],
            correctAnswer: '4. all of the above'
        },
        // { question: 'Inside which HTML element does one put the JavaScript?', answers: { a: '1. <div>', b: '2. <script>', c: '3. <hr>', d: '4. <javascript>' }, correctAnswer: 'b' },
        // { question: 'Javascript uses the ___ keyword to declare a variable', answers: { a: '1. variable', b: '2. vari', c: '3. var', d: '4. Variable' }, correctAnswer: 'c' },
        // { question: 'Which of the following is NOT a Javascript logical operator?', answers: { a: '1. &&', b: '2. ||', c: '3. !', d: '4. +=' }, correctAnswer: 'd' }
    ];

    $('#start').on('click', function () {
        $( "#content" ).replaceWith( "<div class=\"jumbotron mx-auto\"></div><h3 class=\"text-center\" id=\"question\"></h3><div class=\"text-center\" id=\"answer\"></div><div id=\"result\"></div></div>" );

    });
});