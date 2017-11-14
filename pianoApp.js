var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth*0.7;
ctx.canvas.height = window.innerHeight*0.9;
var canvTop = canvas.offsetTop;
var canvLeft = canvas.offsetLeft;
var whiteKeyWidth = ctx.canvas.width/8;;
var whiteKeyHeight = ctx.canvas.height;
var blackKeyWidth = whiteKeyWidth * 0.6;
var blackKeyHeight = whiteKeyHeight * 0.6;
const keyColors = ["#F71111", "#FFAA00", "#FBFF00", "#73F713", "#11FED6", "#1111EE", "#A41BE0", "#FF00D8"]
var scoreContainer = document.getElementById("scoreContainer");

var sounds = [];
sounds[0] = new Audio("sounds/c5.mp3");
sounds[1] = new Audio("sounds/d5.mp3");
sounds[2] = new Audio("sounds/e5.mp3");
sounds[3] = new Audio("sounds/f5.mp3");
sounds[4] = new Audio("sounds/g5.mp3");
sounds[5] = new Audio("sounds/a5.mp3");
sounds[6] = new Audio("sounds/b5.mp3");
sounds[7] = new Audio("sounds/c6.mp3");

var currentSequence = [];
var playerInputCount = 0;
var playerInput = false;


drawPiano();

window.addEventListener("resize", function(){
    ctx.canvas.width  = window.innerWidth*0.7;
    ctx.canvas.height = window.innerHeight*0.9;
    canvTop = canvas.offsetTop;
    canvLeft = canvas.offsetLeft;
    whiteKeyWidth = ctx.canvas.width/8;;
    whiteKeyHeight = ctx.canvas.height;
    blackKeyWidth = whiteKeyWidth * 0.6;
    blackKeyHeight = whiteKeyHeight * 0.6;
    drawPiano();
})
canvas.addEventListener("click", checkKey);


function playSequence(){    
    var randomKey = Math.floor(Math.random() * 8);
    currentSequence.push(randomKey);
    for(var i = 0; i < currentSequence.length; i++){
        setTimeout(playKey, i*800, currentSequence[i]);
    }
    setTimeout(togglePlayerInput, currentSequence.length*800, true);
    playerInputCount = 0;
}

function newSequence(){
    playerInput = false;
    currentSequence = [];
    scoreContainer.innerHTML = "Sequences completed: 0";
    playSequence();    
}

function checkKey(pos){
    if(playerInput){
        var xPosition = pos.clientX - canvLeft;
        var yPosition = pos.clientY - canvTop;
        var keyNumber = Math.floor(xPosition / whiteKeyWidth);
        if(keyNumber == currentSequence[playerInputCount]){
            playKey(keyNumber);
            playerInputCount++;
        }
        else{
            alert("Wrong!");
            newSequence();
        }
        if(playerInputCount == currentSequence.length){
            playerInput = false;
            recordScore(currentSequence.length);
            setTimeout(playSequence, 1250);
        }
    }
}

function playKey(num){
    sounds[num].play();
    whiteKeys();
    ctx.fillStyle = keyColors[num];
    ctx.fillRect(num*whiteKeyWidth, 0, whiteKeyWidth, whiteKeyHeight);
    blackKeys();
}

function recordScore(num){
    scoreContainer.innerHTML = "Sequences completed: " + currentSequence.length;
}

function whiteKeys(){
    ctx.fillStyle = "#fdffd0";
    ctx.fillRect(0, 0, 8*whiteKeyWidth, whiteKeyHeight);
    for(var i = 0; i < 8; i++){
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.rect(i*whiteKeyWidth, 0, whiteKeyWidth, whiteKeyHeight);
        ctx.stroke();
    }
}

function blackKeys(){
    for(var i = 0; i < 2; i++){
        ctx.fillStyle = "#000000";
        ctx.fillRect(whiteKeyWidth - blackKeyWidth/2 + i*whiteKeyWidth, 0, blackKeyWidth, blackKeyHeight);
    }
    for(var i = 3; i < 6; i++){
        ctx.fillStyle = "#000000";
        ctx.fillRect(whiteKeyWidth - blackKeyWidth/2 + i*whiteKeyWidth, 0, blackKeyWidth, blackKeyHeight);
    }    
}

function drawPiano(){
    whiteKeys();
    blackKeys();
}

function togglePlayerInput(bool){
    playerInput = bool;
}