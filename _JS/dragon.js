// JavaScript Document


var hero = { //object of the hero, gets modified by the class chosen
	type:"hero",
	name:"",
	class:"",
	maxHitpoints:500,
	hitpoints:500,
	attackPower:10,
	defense:500,
	gold:100,
	x:35,
	y:360,
	inbattle:false,
	damage: damage,
	heal: heal,
	cooldown:0,
	maxCooldown:100,
};

var potionHouse = { //potionHouse object
	type:"building",
	name:"Potion House",
	x:10,
	y:10,
	doorx:85,
	doory:130,
};

var zombie = { //zombie object
	type:"enemy",
	name:"zombie",
	hitpoints:300,
	maxHitpoints:300,
	defense:5,
	x:265,
	ymin:0,
	ymax:240,
	damage: damage,
	heal: heal,
	special: special,
};

var vader = { //vader object
	type:"enemy",
	name:"vader",
	hitpoints:500,
	maxHitpoints:500,
	x:495,
	ymin:0,
	ymax:0,
	damage: damage,
	heal: heal,
	special: special,
};

var awp = { //awp object
	type:"enemy",
	name:"awp",
	hitpoints:500,
	maxHitpoints:500,
	x:835,
	ymin:0,
	ymax:0,
	damage: damage,
	heal: heal,
	special: special,
	count:0,
};

var boss = { //boss object
	type:"enemy",
	name:"boss",
	maxHitpoints: 1000,
	hitpoints:1000,
	x:390,
	y:0,
	damage: damage,
	heal: heal,
	special: special,
	timer: 0,
	actionSpeed: 50,
	atkSpeed: 1,
	attackPower: 3,
	toggle: false,
};

var door = { //door object
	type:"building",
	name:"door",
	x:1155,
	ymin:220,
	ymax:0,
};

var kitten = { //kitten object
	x:0,
	y:0,
}


var game = { //game object
	run:false,
};

var framerun; // these 7 vars are for setIntervals
var zombies;
var vaders;
var awps;
var bosss;
var specialAnimate;
var bossAnimate;

var pos = 0; //position animation vars
var maxpos = 0;
var tempx;
var tempy;

console.log("screen size of "+window.innerWidth+"x"+window.innerHeight);

function start() {
	"use strict";
	hero.name = document.getElementById("nameField").value;
	hero.class = document.getElementById("selectClass").value;
	if (hero.name === "") { //doesnt allow blank names
		alert("invalid name");
		return;
	}
	if (hero.class === "wizard") {//for wizard class
		hero.maxHitpoints += 200;
		hero.attackPower += 10;
	}
	else if (hero.class === "warrior") {//for warrior class
		hero.maxHitpoints += 500;
		hero.attackPower += 20;
		hero.maxCooldown = 150;
	}
	else if (hero.class === "thief"){//for thief class
		hero.maxHitpoints += 100;
		hero.attackPower += 5;
		hero.maxCooldown = 50;
	}
	if (hero.name === "God" || hero.name === "god" || hero.name === "gaben" || hero.name === "Gaben") { //secret dev mode/easter egg
		document.getElementById("player").setAttribute('src', '../_images/God.png');
		hero.maxHitpoints += 1000000;
		hero.attackPower += 1000000;
		hero.gold += 999900;
		hero.maxCooldown = 1;
	}
	hero.hitpoints = hero.maxHitpoints;
	hero.cooldown = hero.maxCooldown;
	console.log(hero);
	game.run = true;
	document.getElementById("choose").innerHTML = ''; //clears the staring screen
	document.getElementById("player").style.display = 'inherit';//styling
	document.getElementById("player").style.left = (hero.x-25) + 'px';//positional player stuff
	document.getElementById("player").style.top = (hero.y-25) + 'px';
	document.getElementById("playerStats").style.left = (hero.x-25)+'px';
	document.getElementById("playerStats").style.top = (hero.y-60)+'px';
	document.getElementById("content").innerHTML += '<img id="potionhouse" src="../_images/potionhouse.png">'; // adding content to content
	document.getElementById("content").innerHTML += '<div id="zombieImage"><img id="zombie" src="../_images/zombie.png"></div>';
	document.getElementById("content").innerHTML += '<div id="vaderImage"><img id="vader" src="../_images/vader.png"></div>';
	document.getElementById("content").innerHTML += '<div id="awpImage"><img id="awp" src="../_images/awp.png"></div>';
	document.getElementById("content").innerHTML += '<div id="doorImage"><img id="door" src="../_images/door.png"></div>';
	document.getElementById("content").innerHTML += '<div id="wizardSpecial" style="position: absolute;display: none;"><img id="knife" src="../_images/ball.png"></div>';
	document.getElementById("content").innerHTML += '<div id="warriorSpecial" style="position: absolute;display: none;"><img id="knife" src="../_images/knife.png"></div>';
	document.getElementById("content").innerHTML += '<div id="theifSpecial" style="position: absolute;display: none;"><img id="knife" src="../_images/dagger.png"></div>';
	document.getElementById("content").innerHTML += '<img id="kitten" src="../_images/kitten.jpg" style="position: absolute;display: none;">';
	document.getElementById("potionhouse").style = "left: "+potionHouse.x+"px;top: "+potionHouse.y+"px;position: absolute;display: inherit;";//positioning buildings
	document.getElementById("doorImage").style = "left: "+door.x+"px;top: "+door.ymin+"px;position: absolute;display: inherit;";
	zombie.ymin = hero.y - 120;//enemy positioning and hitbox detection
	zombie.ymax = zombie.ymin + 240;
	vader.ymin = hero.y - 125;
	vader.ymax = vader.ymin + 250;
	awp.ymin = hero.y - 25;
	awp.ymax = awp.ymin + 50;
	door.ymax = door.ymin + 275;
	document.getElementById("zombieImage").style = "left: "+zombie.x+"px;top: "+zombie.ymin+"px;position: absolute;display: inherit;"; //various styling with relation to x and y values
	document.getElementById("vaderImage").style = "left: "+vader.x+"px;top: "+vader.ymin+"px;position: absolute;display: inherit;";
	document.getElementById("awpImage").style = "left: "+awp.x+"px;top: "+awp.ymin+"px;position: absolute;display: inherit;";
	document.getElementById("zombieImage").innerHTML += '<progress id="zombieBar" value="100" max="100"></progress>';
	document.getElementById("vaderImage").innerHTML += '<progress id="vaderBar" value="100" max="100"></progress>';
	document.getElementById("awpImage").innerHTML += '<progress id="awpBar" value="100" max="100"></progress>';
	document.getElementById("playerStats").innerHTML = '<p id="heroGold"></p>';
	document.getElementById("playerStats").innerHTML += '<progress id="health" value="100" max="100"></progress>';
	framerun = setInterval(frame, 100);//runs frame every 1/10 of a second
}


function frame() {
	if (game.run === true) {
		document.onkeydown = checkKey;//see checkKey funciton
		document.getElementById("health").value = ((hero.hitpoints/hero.maxHitpoints)*100);//displays hero health
		document.getElementById("heroGold").innerHTML = hero.gold;//displays hero gold
		if (hero.hitpoints <= 0) {//kills player if health is less than 1
			game.run = false;
		}
		
	}
	else { //displays death message when game ends
		console.log("you died");
		document.getElementById("choose").style.fontSize = '50px';
		document.getElementById("choose").innerHTML = "you died reload to not be dead";
		document.getElementById("interact").innerHTML = '';
		clearInterval(zombies);
		clearInterval(vaders);
		clearInterval(awps);
		clearInterval(framerun);
		clearInterval(bosss);
		
	}
}


function checkKey(e) { //detects the key pressed, checks if it was an arrow key, then changes x/y value accordingly
	if (game.run === true && hero.inbattle === false) {
		e = e || window.event; //idk how this works but it gets the number of the key pressed
		if (e.keyCode == '38') {
			//console.log("up");
			hero.y -= 10;
		}
		if (e.keyCode == '40') {
			//console.log("down");
			hero.y += 10;
		}
		if (e.keyCode == '37') {
			//console.log("left");
			hero.x -= 10;
		}
		if (e.keyCode == '39') {
			//console.log("right");
			hero.x += 10;
		}
		if (hero.y <= 0 || hero.y >= 720 || hero.x <= 0 || hero.x >= 1280) { //checking if player has left the canvas, then kills them
			game.run = false;
		}
		document.getElementById("player").style.left = (hero.x-25) + 'px'; //sets the player image to coordinates
		document.getElementById("player").style.top = (hero.y-25) + 'px';
		document.getElementById("playerStats").style.left = (hero.x-25)+'px';//sets the stats to coordinates
		document.getElementById("playerStats").style.top = (hero.y-60)+'px';
		if (zombie.hitpoints > 0) {//enemy following routine
			zombie.ymin = hero.y - 120;
			zombie.ymax = zombie.ymin + 240; 
		}
		if (vader.hitpoints > 0) {
			vader.ymin = hero.y - 125;
			vader.ymax = zombie.ymin + 250;
		}
		if (awp.hitpoints > 0) {
			awp.ymin = hero.y - 25;
			awp.ymax = awp.ymin + 50;
		}
		document.getElementById("zombieImage").style = "left: "+zombie.x+"px;top: "+zombie.ymin+"px;position: absolute;display: inherit;";//positioning enemies
		document.getElementById("vaderImage").style = "left: "+vader.x+"px;top: "+vader.ymin+"px;position: absolute;display: inherit;";
		document.getElementById("awpImage").style = "left: "+awp.x+"px;top: "+awp.ymin+"px;position: absolute;display: inherit;";
		console.log(hero.name+" moved to "+hero.x+","+hero.y);
		checkInteract(hero.x,hero.y); //see checkInteract
	}
}

function checkInteract(x,y) { //Checks the player's coordinates to see if they are in an area of something, like the health shop
	"use strict";
	if (hero.x === potionHouse.doorx && hero.y === potionHouse.doory) { //coords of the door of the potion house
		document.getElementById("interact").innerHTML = '<button onclick="hero.heal(100)">plus 100 health</button><br><button onclick="hero.heal(hero.maxHitpoints-hero.hitpoints)">max health</button>'; //creates two buttons, see addHitpoints
		document.getElementById("interact").style = "left: "+(potionHouse.x+150)+"px;top: "+(potionHouse.y)+"px;position: absolute;display: inherit;";//Positioning the buttons
		console.log("Entered "+potionHouse.name);
	}
	else if (hero.x === zombie.x && (hero.y >= zombie.ymin && hero.y <= zombie.ymax) && zombie.hitpoints > 0) {//coords of the homer thing
		hero.inbattle = true;
		document.getElementById("interact").innerHTML = '<button onclick="zombie.damage(hero.attackPower)">Attack</button><br><button onclick="zombie.special()">Special</button>';
		document.getElementById("interact").style = "left: "+(zombie.x-65)+"px;top: "+(zombie.ymin)+"px;position: absolute;display: inherit;";
		zombies = setInterval(function(){ zombieAtk(); }, 1000);
	}
	else if (hero.x === vader.x && (hero.y >= vader.ymin && hero.y <= vader.ymax) && vader.hitpoints > 0) {//coords of darth vader
		hero.inbattle = true;
		document.getElementById("interact").innerHTML = '<button onclick="vader.damage(hero.attackPower)">Attack</button><br><button onclick="vader.special()">Special</button>';
		document.getElementById("interact").style = "left: "+(vader.x-65)+"px;top: "+(vader.ymin)+"px;position: absolute;display: inherit;";
		vaders = setInterval(function(){ vaderAtk(); }, 100);
	}
	else if (hero.x === awp.x && (hero.y >= awp.ymin && hero.y <= awp.ymax) && awp.hitpoints > 0) {//coords of the awp
		hero.inbattle = true;
		document.getElementById("interact").innerHTML = '<button onclick="awp.damage(hero.attackPower)">Attack</button><br><button onclick="awp.special()">Special</button>';
		document.getElementById("interact").style = "left: "+(awp.x-65)+"px;top: "+(awp.ymin+50)+"px;position: absolute;display: inherit;";
		awps = setInterval(function(){ awpAtk(); }, 500);
	}
	else if (hero.x === door.x && (hero.y >= door.ymin && hero.y <= door.ymax)) { //coords of the door
		console.log('starting boss');
		awp.x=null;
		vader.x=null;
		zombie.x=null;
		potionHouse.doorx=null;
		door.x=null;
		document.getElementById("zombie").setAttribute('src', '');//clearing stuff to prepare for boss
		document.getElementById("vader").setAttribute('src', '');
		document.getElementById("awp").setAttribute('src', '');
		document.getElementById("potionhouse").setAttribute('src', '');
		document.getElementById("door").setAttribute('src', '');
		document.getElementById("content").innerHTML += '<div id="bossImage" style="left: '+boss.x+'px;top: '+boss.y+'px;position: absolute; display:inherit;"><img id="boss" src=""></div>';//setting up boss
		document.getElementById("bossImage").innerHTML += '<progress id="bossBar" value="100" max="100"></progress>';
		document.getElementById("content").innerHTML += '<img id="kitten" src="../_images/kitten.jpg" style="position: absolute;display: none;"';
		bosss = setInterval(function(){ bossAtk(); }, 100);//initializing boss
		boss.toggle = true;
	}
	else if (boss.toggle === false){
		document.getElementById("interact").innerHTML = '';
	}
}

function heal(amt) { //health method, heals whatever by whatever and subtracts porportional money
	if (this.type === "hero" && hero.gold < amt){
		alert("not enough money");
		console.log(hero.gold+' monies');
		return;	
	}
	console.log(this.name + " healed by " + amt + " to " +this.hitpoints+"/"+this.maxHitpoints+" health");
	if (this.hitpoints < this.maxHitpoints) { //making sure health can be added
		this.hitpoints += amt;
		if (this.type === "hero") {
			this.gold -= amt;
		}
	}
	if (this.hitpoints >= this.maxHitpoints) {//checking if max health
		this.hitpoints = this.maxHitpoints;
		if (this.type === "hero") {
			alert("health max");
		}
	}
}

function damage(power) { //damages stuff and adds gold to player
	this.hitpoints -= power
	console.log(this.name + " lost " + power + " health - " + this.hitpoints + "/" + this.maxHitpoints);
	if (this.type === "enemy") {
		hero.gold += ((power)/2);
	}
}

function special() { //special abilities
	var specialSound;
	if (hero.cooldown >= hero.maxCooldown) {
		hero.cooldown = 0;
		if (hero.class === "wizard") {//launches a magic sphere that reduces enemy by 25% health
			specialSound = new Audio('../_audio/electric.mp3');
			specialSound.play();
			this.hitpoints = this.hitpoints/4;
			specialAnimate = setInterval(function(){ animateFrame('wizardSpecial'); }, 5);
		}
		if (hero.class === "warrior") { //knife thing that does tons of damage
			specialSound = new Audio('../_audio/butterflies.mp3');
			specialSound.play();
			this.hitpoints -= 500;
			specialAnimate = setInterval(function(){ animateFrame('warriorSpecial'); }, 5);
		}
		if (hero.class === "thief") { //life steal by 200
			specialSound = new Audio('../_audio/swords.mp3');
			specialSound.play();
			hero.hitpoints += 200;
			this.hitpoints -= 200;
			specialAnimate = setInterval(function(){ animateFrame('thiefSpecial'); }, 5);
		}
	}
	else {//calculates cooldown for specials
		alert("Cooldown: "+Math.ceil((hero.maxCooldown/10.0)-(hero.cooldown/10.0)));
	}
}


function animateFrame(elem) {//animation for the specials
	if (pos == 100) {
		clearInterval(specialAnimate);
		document.getElementById(elem).style = 'position: absolute;display: none;';
		pos = 0;
	} else {
		pos++; 
		document.getElementById(elem).style = 'position: absolute;display: inherit;top: '+(hero.y)+'px;left: '+(hero.x+pos-25)+'px;';
	}
}
	
setInterval(function(){ hero.cooldown+=1; if (hero.cooldown > hero.maxCooldown) { hero.cooldown = hero.maxCooldown;}},100)//some cooldown thing i forgot about



function zombieAtk() {//attack script for zombie, medium damage normal speed
	document.getElementById("zombieBar").value = ((zombie.hitpoints/zombie.maxHitpoints)*100);
	if (zombie.hitpoints > 0) {
		hero.damage(25);
		zombie.heal(10);
	}
	else {
		hero.inbattle = false;
		document.getElementById("interact").innerHTML = '';
		document.getElementById("zombieImage").innerHTML = '<img id="zombie" src=../_images/zombieDead.png>';
		clearInterval(zombies);
	}
	var homer = new Audio('../_audio/homer.mp3');
	homer.play();
}

function vaderAtk() {//attack script for vader, does small damage fast
	document.getElementById("vaderBar").value = ((vader.hitpoints/vader.maxHitpoints)*100);
	if (vader.hitpoints > 0) {
		hero.damage(5);
		vader.heal(1);
	}
	else {
		hero.inbattle = false;
		document.getElementById("interact").innerHTML = '';
		document.getElementById("vaderImage").innerHTML = '<img id="vader" src=../_images/vaderDead.png>';
		clearInterval(vaders);
	}
	var saber = new Audio('../_audio/saber.mp3');
	saber.play();
}

function awpAtk() {//attack script for awp, does lots of damage every 3 seconds
	document.getElementById("awpBar").value = ((awp.hitpoints/awp.maxHitpoints)*100);
	if (awp.count === 6) {
		if (awp.hitpoints > 0) {
			hero.damage(250);
			awp.heal(100);
		}
		else {
			hero.inbattle = false;
			document.getElementById("interact").innerHTML = '';
			document.getElementById("awpImage").innerHTML = '<img id="awp" src=../_images/awpDead.png>';
			clearInterval(awps);
		}
		var pew = new Audio('../_audio/pew.mp3');
		pew.play();
		awp.count = 0;
	}
	else {
		awp.count += 1;
	}
}

function bossAtk() {//attack script for boss, 
	boss.timer += 1;
	boss.heal(5);
	document.getElementById("bossBar").value = ((boss.hitpoints/boss.maxHitpoints)*100);//boss health bar
	if (boss.hitpoints <= 0) {//boss dead
		console.log("gg ez");
		document.getElementById("choose").style.fontSize = '50px';
		document.getElementById("choose").innerHTML = 'you won great job';
		document.getElementById("interact").innerHTML = '';
		document.getElementById("bossImage").innerHTML = '';
		clearInterval(bosss);
	}
	switch (boss.timer%5) {//boss animation timer
		case 0:
			document.getElementById("boss").setAttribute('src', '../_images/cat1.jpg');
			break;
		case 1:
			document.getElementById("boss").setAttribute('src', '../_images/cat2.jpg');
			break;
		case 2:
			document.getElementById("boss").setAttribute('src', '../_images/cat3.jpg');
			break;
		case 3:
			document.getElementById("boss").setAttribute('src', '../_images/cat4.jpg');
			break;
		case 4:
			document.getElementById("boss").setAttribute('src', '../_images/cat5.jpg');
	}
	if (boss.timer%boss.actionSpeed === 0) { //boss kittycannon launcher animation
		var cat = new Audio('../_audio/cat.mp3');
		cat.play();
		tempx = hero.x; tempy = hero.y;
		bossAnimate = setInterval(function(){ 
			moveAnimate((boss.x+250),(boss.y+200),(tempx),(tempy),'kitten',25,25);
			kitten.x = parseInt(document.getElementById('kitten').style.left);
			kitten.y = parseInt(document.getElementById('kitten').style.top);
			if (kitten.x < hero.x+25 && kitten.x+100 > hero.x-25 && kitten.y < hero.y+25 && kitten.y+100 > hero.y-25) {
				hero.damage(boss.attackPower);
			}
			
		}, 5);
		hero.attackPower += 1;
		document.getElementById("interact").innerHTML = '<button onclick="boss.damage(hero.attackPower)">Attack</button>';//attack button stuff
		document.getElementById("interact").style = "left: "+(Math.floor((Math.random() * 1200) + 1))+"px;top: "+(Math.floor((Math.random() * 640) + 1))+"px;position: absolute;display: inherit;";
	}
}

maxpos = 200;
function moveAnimate(x1,y1,x2,y2,elem,xoff,yoff) { //really cool animation script
	if (pos === maxpos) {
		document.getElementById(elem).style = 'position: absolute;display: none;';
		pos = 0;
		clearInterval(bossAnimate);
	} else {
		pos++;
		document.getElementById(elem).style = 'position: absolute;display: inherit;left: '+(Math.floor(x1+(pos*((x2-x1)*1.0/maxpos)))-xoff)+'px;top: '+(Math.floor(y1+(pos*((y2-y1)*1.0/maxpos)))-yoff)+'px;';//calculates distance to change per tick lol what a great explanation
	}
}

//the end almost 500 lines