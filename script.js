/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var offset = 0;

var wolk = 50;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function() {
  // wolken
  fill("skyblue");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  noStroke();
  fill("white");//wolk 1
  ellipse(offset+wolk+100, wolk+100, wolk, wolk); 
  ellipse(offset+wolk+130, wolk+130, wolk, wolk);
  ellipse(offset+wolk+130, wolk+90, wolk, wolk);
  ellipse(offset+wolk+160, wolk+100, wolk, wolk);
  ellipse(offset+wolk+130, wolk+85, wolk, wolk);
  // wolk 2
  ellipse(offset+250, 250, 50, 50); //linker bolletje 
  ellipse(offset+280, 266, 50, 50); //onderste bolletje
  ellipse(offset+280, 220, 50, 50); //bovenste bolletje
  ellipse(offset+315, 250, 50, 50); //rechter bolletje 
  ellipse(offset+285, 235, 50, 50); //midden bolletje 
  //wolk 3
  ellipse(offset+350, 550, 50, 50);
  ellipse(offset+380, 566, 50, 50);
  ellipse(offset+380, 520, 50, 50);
  ellipse(offset+410, 550, 50, 50);
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    
    fill("green");
    var x = 50;
    while (x < 1280) {
    rect(vijandX+offset+x, y, 45, 270);
    x += 200;
    }

    var x = 50;
    while (x < 1280) {
    rect(vijandX+offset+x, 450, 45, 400);
    x += 200;
    }

    if (vijandX < 0) {
        vijandX = random (1250, 1500);
    }

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} spelerX x-coördinaat
 * @param {number} spelerY y-coördinaat
 */


var tekenSpeler = function(spelerX, spelerY) {
    fill("darkorange");
    ellipse(spelerX, spelerY+285, 95, 50); // lijf
    fill("chocolate");
    triangle(spelerX-100, 310+spelerY, 100+spelerX-200, 360+spelerY-100, 156+spelerX-200, 386+spelerY-100);
    fill("chocolate");
    triangle(spelerX, 390+spelerY-100, 190+spelerX-200, 420+spelerY-100, 180+spelerX-200, 390+spelerY-100);
    fill('white');
    ellipse(spelerX + 25, spelerY + 285, 18, 18);
    fill('black');
    ellipse(spelerX + 25, spelerY + 285, 10, 10);
    
};

var beweegVeld = function () {

    offset= offset - 1;
    if (offset > 1280) {
        offset = 0;
    };
}
/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    vijandX = vijandX - 1;
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {


};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
if (mouseIsPressed) {
    spelerY -= 10;
}
else {
    spelerY += 2;
}
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('skyblue');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      beweegVeld();

      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
