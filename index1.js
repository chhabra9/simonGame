var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var level = -1;
var index=-1;
var keypressed = false;
var userClickedPattern = new Array();
function nextSequence() {
    level++;
$("#header").text("LEVEL " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColors[randomNumber];
    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);

}
$(".box").click(function() {
    if(keypressed==true){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    index++;
    console.log(userClickedPattern[index]+"  "+gamePattern[index]+" "+index);
    if(index<gamePattern.length){
        var result=checkAnswer(index);
        if(result===true){
    playSound(userChosenColour);
    animatePress(userChosenColour);
}
else{
    playSound("wrong");
    animatePress("body");
    userClickedPattern.length=0;
    gamePattern.length=0;
    keypressed=false;
    index=-1
    level=-1;
    $("#header").text("Wrong answer press any key to continue");
    return;
}
}
if(index===gamePattern.length-1){
    userClickedPattern.length=0;
    index=-1;

    nextSequence();
    console.log(gamePattern)
}
}
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(colorPressed) {
    if(colorPressed=="body"){
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
    }else{
    $("#" + colorPressed).addClass("pressed");
    setTimeout(function() {
        $("#" + colorPressed).removeClass("pressed");
    }, 100);}
}
$(document).keypress(function() {
    if(!keypressed){
        nextSequence();
        keypressed = true;
    }
})
function checkAnswer(index){
    if(gamePattern[index]===userClickedPattern[index])
            return true;
        else
            return false;
}
