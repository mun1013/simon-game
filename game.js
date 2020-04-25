var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

$(".simon-btn").click(function () {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }
});

$("body").keypress(function (event) {
    if (!started) {
        startGame();
    }
});

$(".start-btn").click(function() {
    if (!started) {
        startGame();
    }
    else {
        startOver();
        startGame();
    }
});

function startGame () {
    // if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".start-btn").text("RESTART");
    // }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randonNumber = Math.floor(Math.random() * 4);
    //console.log(randonNumber);

    var randomChosenColour = buttonColours[randonNumber];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    });
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").text("Game Over, Press RESTART Button or Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(".start-btn").text("RESTART");
}