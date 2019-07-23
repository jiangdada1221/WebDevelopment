var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var start=true;
var level = 1;
var userIndex = 0;
function startGame() {
$("body").keypress(function(){
  if(start){
    $("#level-title").text("Level:" + level);
  setTimeout(function(){nextSequence();},200);

  start = false;

}});}

startGame();


function nextSequence() {
  $("#level-title").text("Level:" + level);
  level = level+1;
  var random = Math.random()*4;
  var randomNumber = Math.floor(random);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).animate({"opacity":"0.5"},50).animate({"opacity":"1"},50);



}


// $("#"+randomChosenColour).animate({"opacity":"0.5"},50).animate({"opacity":"1"},50);
$(".btn").click(function(e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  if(!checkAnswer(userIndex))
    gameOver();
  else {
  playSound(e.target.id);
  animatePress(e.target.id);
  userIndex += 1;
  if(userIndex === gamePattern.length){
    setTimeout(function(){userIndex = 0;userClickedPattern=[]; nextSequence();},500);
  }

}});

function playSound(name) {
  var toPlay = "sounds/" + name + ".mp3";
  new Audio(toPlay).play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){$("#" + currentColour).removeClass("pressed");},80);
}
$("#yellow").addClass("pressed").delay(500).removeClass("pressed");

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]!== gamePattern[currentLevel])
    return false;
  return true;
}
function gameOver() {
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver(){
  level = 1;
  gamePattern =[];
  start = true;
  userIndex = 0;
  userClickedPattern=[];
  startGame();
}
