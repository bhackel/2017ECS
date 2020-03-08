//Bryce Hackel 
//Mr. Cozort's Comp Sci Class
//Rock Paper Scissors
//end of october 2017

//alert("syntax");
//set up three global variables that have string values which will create img elements in my html source code
var theRock = '<img src="../../_images/cobblestone.png">';
var thePaper = '<img src="../../_images/paper.png">';
var theScissors = '<img src="../../_images/scissor.jpg">';
var result = '';
var gamemode = '';
var score = 0;
var computer = '';
var timesclicked = 0;



//gets a random int, either 0,1,2, and returns either rock, paper, or scissors depending on that number,
function computerChose() { 
	"use strict";
	var randChoice = Math.floor(Math.random()*3);
	if (randChoice === 0){
		return "rock"; }
	else if (randChoice === 1){
		return "paper"; }
	else {
		return "scissors"; }
}

//### takes two inputs, each either rock, paper, or scissors, and returns a win or loss ###//
function compare(player, computer) {
	"use strict";
    console.log(player+" vs "+computer);
	if (player === computer){
		result = "tie";
	}
	if (player === "rock"){
		if (computer === "paper"){
			result = "lose";
		}
		else if (computer === "scissors"){
			result = "win";
		}
	}
	else if (player === "paper"){
		if (computer === "rock"){
			result = "win";
		}
		else if (computer === "scissors"){
			result = "lose";
		}
	}
	else if (player === "scissors"){
		if (computer === "rock"){
			result = "lose";
		}
		else if (computer === "paper"){
			result = "win";
		}
	}
	console.log(result);
	document.getElementById("result").innerHTML = result;
	return result;
}
//--- compare ---//

//### timer ###//
var mil = 0;
var sec = 0;
var min = 0;
var hrs = 0;
var stop = false;
	
var score2 = 0;

var timedsec = 0;

function myTimer() {
	"use strict";
	if (stop === false) {
		mil++;
		if (mil >  99) {
			mil = 0;
			sec++;
			if (gamemode === "endless" || gamemode === "timed") {
				document.getElementById("pointspersecond").innerHTML = (score-score2)+" points in the last second";
				score2 = score;
			}
			if (sec > 59) {
				sec = 0;
				min++;
				if (min > 59) {
					min = 0;
					hrs++;
				}
			}
		}
		if (gamemode === "endless") {
			document.getElementById("timer").innerHTML = hrs+":"+min+":"+sec+":"+mil;
		}
		if (gamemode === "timed"){
			document.getElementById("timer").innerHTML = (timedsec-sec);
			if ((timedsec-sec) === -1) {
				timedEnd();
			}
		}
	}
	else {
		clearInterval(myVar);
	}
}
//--- timer ---//

//### displays either rock, paper, or scissors, and the user clicks a button that would win against it ###//
function endlessStart() {
	"use strict";
	gamemode = "endless";
	var myVar = setInterval(function(){ myTimer() }, 10);
	document.getElementById("startbutton").innerHTML = "<p>What beats... </p>";
	document.getElementById("result").innerHTML = "Click a button";
	computer = computerChose();
	if (computer === "rock") {
		document.getElementById("computerChoice").innerHTML = theRock;
	}
	else if (computer === "paper") {
		document.getElementById("computerChoice").innerHTML = thePaper;
	}
	else { document.getElementById("computerChoice").innerHTML = theScissors; }
}


function endless(player) {
	"use strict";
	if (gamemode === "endless") {
		timesclicked++;
		document.getElementById("timesclicked").innerHTML = timesclicked + " button presses";
		console.log(player+" : "+computer);
		if (compare(player, computer) === "win") {
			score++;
			var audio = new Audio('../../_audio/ding.mp3');
			audio.play();
		}
		else if (compare(player, computer) === "lose") {
			score--;
			var audio2 = new Audio('../../_audio/buzzer.mp3');
			audio2.play();
		}
		else {
			var audio3 = new Audio('../../_audio/crash.mp3');
			audio3.play();
		}
		document.getElementById("score").innerHTML = "<p>Score: "+score+"</p>";
		computer = computerChose();
		if (computer === "rock") {
			document.getElementById("computerChoice").innerHTML = theRock;
		}
		else if (computer === "paper") {
			document.getElementById("computerChoice").innerHTML = thePaper;
		}
		else { document.getElementById("computerChoice").innerHTML = theScissors; }
	}
}

//--- endless ---//


//### timed ###//
function timedStart() {
	"use strict";
	gamemode = "timed";
	var myVar = setInterval(function(){ myTimer() }, 10);
	document.getElementById("startbutton").innerHTML = "<p>What beats... </p>";
	document.getElementById("result").innerHTML = "Click a button";
	var i = document.getElementById("timedselect");
	if (i.selectedIndex === 0) {
		timedsec = 5;
	}
	if (i.selectedIndex === 1) {
		timedsec = 10;
	}
	if (i.selectedIndex === 2) {
		timedsec = 15;
	}
	if (i.selectedIndex === 3) {
		timedsec = 20;
	}
	if (i.selectedIndex === 4) {
		timedsec = 25;
	}
	if (i.selectedIndex === 5) {
		timedsec = 30;
	}
	if (i.selectedIndex === 6) {
		timedsec = 35;
	}
	if (i.selectedIndex === 7) {
		timedsec = 40;
	}
	if (i.selectedIndex === 8) {
		timedsec = 45;
	}
	if (i.selectedIndex === 9) {
		timedsec = 50;
	}
	if (i.selectedIndex === 10) {
		timedsec = 55;
	}
	if (i.selectedIndex === 11) {
		timedsec = 60;
	}
	document.getElementById("timedselect").innerHTML = "";
	computer = computerChose();
	if (computer === "rock") {
		document.getElementById("computerChoice").innerHTML = theRock;
	}
	else if (computer === "paper") {
		document.getElementById("computerChoice").innerHTML = thePaper;
	}
	else { document.getElementById("computerChoice").innerHTML = theScissors; }
}

function timed(player) {
	"use strict";
	if (gamemode === "timed") {
		timesclicked++;
		document.getElementById("timesclicked").innerHTML = timesclicked + " button presses";
		console.log(player+" : "+computer);
		if (compare(player, computer) === "win") {
			score++;
			var audio = new Audio('../../_audio/ding.mp3');
			audio.play();
		}
		else if (compare(player, computer) === "lose") {
			score--;
			var audio2 = new Audio('../../_audio/buzzer.mp3');
			audio2.play();
		}
		else {
			var audio3 = new Audio('../../_audio/crash.mp3');
			audio3.play();
		}
		document.getElementById("score").innerHTML = "<p>Score: "+score+"</p>";
		computer = computerChose();
		if (computer === "rock") {
			document.getElementById("computerChoice").innerHTML = theRock;
		}
		else if (computer === "paper") {
			document.getElementById("computerChoice").innerHTML = thePaper;
		}
		else { document.getElementById("computerChoice").innerHTML = theScissors; }
	}
}

function timedEnd() {
	"use strict";
	document.getElementById("playerSelect").innerHTML = "";
	document.getElementById("timer").innerHTML = "";
	document.getElementById("computerChoice").innerHTML = "";
	document.getElementById("result").innerHTML = "";
	document.getElementById("startbutton").innerHTML = "";
	stop = true;
}