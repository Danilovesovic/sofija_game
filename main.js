$("#startBtn").on("click", function () {
    $(".main-holder").fadeOut(600, function () {
        startGame();
    });
});

function startGame() {
    let gameHolder = $(".gameHolder");
    let textPitanja = $("#textPitanja");
    let answersHolder = $(".answersHolder");
    let options = $(".option");
    if (quiz.isEnd()) {
        $(".gameHolder").fadeOut(500, function () {
            displayEnd();
        });
    } else {
        $(".gameHolder").show();
        let currentQuestion = quiz.getCurrentQuestion();

        textPitanja.html(currentQuestion.text);

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            option.onclick = checkAnswer;
            option.innerHTML = currentQuestion.options[i];
        }
    }
}

function checkAnswer() {
    let answer = quiz.checkAnswer(this.innerHTML);
    let options = $(".option");

    if (answer) {
        document.querySelector("#win_sound").play();
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            option.style.background = "tomato";
        }

        $("#points").animate(
            {
                "line-height": 78,
            },
            400,
            function () {
                $("#points").html(quiz.score);
                $("#points").animate({
                    "line-height": 24,
                });
            }
        );
        this.style.background = "green";
        this.style.color = "white";
    } else {
        document.querySelector("#error_sound").play();
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.innerHTML === quiz.getCurrentQuestion().answer) {
                option.style.background = "green";
                option.style.color = "white";
            } else {
                option.style.background = "tomato";
                option.style.color = "white";
            }
        }
        this.style.background = "tomato";
        this.style.color = "white";
        this.innerHTML += "<div class='error'></div>";
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            option.onclick = "";
        }
    }

    setTimeout(function () {
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            option.style.background = "#ecd450";
            option.style.color = "black";
        }
        quiz.update();
        startGame();
    }, 3000);
}

function displayEnd() {
    $(".display-points").html(quiz.score);
    $(".the-end").fadeIn(500);
}
