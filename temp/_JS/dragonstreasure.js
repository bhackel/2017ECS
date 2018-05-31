// JavaScript Document


var hero = { //object of the hero
	type:"hero",
	name:"",
	maxHitpoints:10,
	hitpoints:10,
	attackPower:1,
	changeHP: changeHP,
	level:1,
};

var text1 = ['Punch some trees','Make a hoe','Go left','Make an iron pickaxe','Mine straight down']; //text for button1
var text2 = ['Enter the cave','Make a pickaxe','Go right','Make a gold hoe','Mine diagonally down']; //text for button2
var contexts = ['Would you like to go into the cave or punch some trees?','What tool would you like to make?','Theres a split in the cave...','You found and smelted both gold and iron...','The cave system ends...']; //displayed scenarios
var corrects = [0,1,1,0,1];// determines which button is correct

function start() {
	"use strict";
	hero.name = document.getElementById("nameField").value; //sets name according to input
	if (hero.name === "") { //checks for blank names
		alert("invalid name");
		return;
	}
	if (hero.name === "/op") { //cheaty dev/easter egg
		hero.maxHitpoints += 50;
		hero.hitpoints = hero.maxHitpoints;
	}
	document.getElementById('Start').innerHTML = ''; 
	hero.changeHP(0);
	displayContent('../_images/image'+hero.level+'.png',text1[hero.level-1],text2[hero.level-1],corrects[hero.level-1],contexts[hero.level-1]);
}

function changeHP(change) { //displays the hearts
	var i = 0;
	this.hitpoints += change;
	if (this.hitpoints < 0) {
		this.hitpoints = 0;
	}
	document.getElementById('health').innerHTML = '';
	for (i = 0; i < this.hitpoints; i++) { //displaying living hearts
		document.getElementById('health').innerHTML += '<img src="../_images/heart.png">';
	}
	for (i = 0; i < (this.maxHitpoints-this.hitpoints); i++) { //displaying dead hearts
		document.getElementById('health').innerHTML += '<img src="../_images/deadHeart.png">';
	}
	if (this.hitpoints <= 0) { //if dead
		document.getElementById('display').innerHTML = '<p style="font-size:100px;font-family: Arial;color: red;">'+hero.name+' Died.</p>';
		return;
	}
}

function displayContent(image,text1,text2,correct,contextualization) { //displays everything for the User Interface
	if (correct === 0) {
		document.getElementById('display').innerHTML = '<img src="../_images/'+image+'"><br><button class="button" onclick="check(1)">'+text1+'</button><button class="button" onclick="check(0)">'+text2+'</button>';
	}
	else if (correct === 1) {
		document.getElementById('display').innerHTML = '<img src="../_images/'+image+'"><br><button class="button" onclick="check(0)">'+text1+'</button><button class="button" onclick="check(1)">'+text2+'</button>';
	}
	document.getElementById('context').innerHTML = contextualization;
}

function check(num) {
	if (num === 0) { //different results for each incorrect choice
		console.log('damaging');
		switch (hero.level) {
			case 1:
				hero.changeHP(-(Math.floor(Math.random()*3)+1));
				switch (Math.floor(Math.random()*4)+1) {
				case 1:
					document.getElementById('log').innerHTML = hero.name+' got attacked by a Spider!';
					break;
				case 2:
					document.getElementById('log').innerHTML = hero.name+' got attacked by a Zombie!';
					break;
				case 3:
					document.getElementById('log').innerHTML = hero.name+' got attacked by a Creeper!';
					break;
				case 4:
					document.getElementById('log').innerHTML = hero.name+' got attacked by a Skeleton!';
				}
				break;
			case 2:
				hero.changeHP(-5);
				document.getElementById('log').innerHTML = hero.name+' got struck by lightning!';
				break;
			case 3:
				hero.changeHP(-1);
				document.getElementById('log').innerHTML = hero.name+' fell 5 blocks only to see a deep chasm';
				break;
			case 4:
				hero.changeHP(-2);
				document.getElementById('log').innerHTML = 'lol really?';
				break;
			case 5:
				hero.changeHP(-10);
				document.getElementById('log').innerHTML = hero.name+' fell in lava';
		}
		
	}
	else if (num === 1) { //advances if correct
		hero.level += 1;
		if (hero.level === 6) {
			document.getElementById('context').innerHTML = '<p style="font-size:50px;font-family: Arial;">'+hero.name+' has acquired the treasure.</p>';
			document.getElementById('log').innerHTML = 'Congrats! '+hero.name+' made a diamond hoe!';
			document.getElementById('display').innerHTML = '<img src="../_images/image6.png">';
		}
		else {
			displayContent('../_images/image'+hero.level+'.png',text1[hero.level-1],text2[hero.level-1],corrects[hero.level-1],contexts[hero.level-1]);
		}
	}
}
