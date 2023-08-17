
var buttonColours = ["red", "blue", "green", "yellow"]; //declaring array of options and colors

var gamePattern = [];   //empty array to store random pattern
var userClickedPattern = [];      //empty array to store user clicked patters

var started = false;//game is stopped
var level = 0; //initianlizing level

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level); //level title(ID)select krk uska inner html change kiya
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //picking user picked colour by click detection and getting id
  userClickedPattern.push(userChosenColour); //pushing user clicekd colour to that declared empty array;

  playSound(userChosenColour); //playing sound of click by calling sound functon
  animatePress(userChosenColour); //animation of clicking by calling animation function

  checkAnswer(userClickedPattern.length-1); //check ans function by pasiing the length
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {                                   //if both the length matches then again calling the next nextSequence functin
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over"); //addiing class to body to show gameover thing
      $("#level-title").text("Game Over, Press Any Key to Restart"); //changing title by(ID)                           //if the user enter wrong pattern;

      setTimeout(function () {
        $("body").removeClass("game-over"); //removing game over screen after 2 sec;
      }, 200);

      startOver(); //again calling the start over functin
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;//increment the level shown to user
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; //selecting random colors by array indexing
  gamePattern.push(randomChosenColour); //pushing the random colorss to the game array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //selecting that random chosen color with ID and giving it fading effect
  playSound(randomChosenColour); //and playing sound once by calling sound function
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");                      //animaton function
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");                      //sound function
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];                                   //reset function
  started = false;
}
