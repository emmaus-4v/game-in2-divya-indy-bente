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

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var offset = 0;

var wolk = 50;
var onderX = 50;
var bovenX = 50;

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

  fill("white");
  for (var wolkX = 50; wolkX < 5000; wolkX += 290) {
      for (var wolkY = 50; wolkY < 5000; wolkY += 270) {
          ellipse(offset+wolkX+100, wolkY+100, wolk, wolk); //linker bolletje
          ellipse(offset+wolkX+130, wolkY+120, wolk, wolk); //onderste bolletje
          ellipse(offset+wolkX+130, wolkY+90, wolk, wolk); //onderste bolletje
          ellipse(offset+wolkX+160, wolkY+100, wolk, wolk); //rechter bolletje 
          ellipse(offset+wolkX+130, wolkY+85, wolk, wolk); //midden bolletje 
      }
    
  }

 
};

var tekenVeld2 = function() {
    fill("red");

};

var tekenVeld3 = function() {
    fill("black");
   
};

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    
    fill("green");
    var bovenX = 50; /* bovenX zijn de bovenste buizen */
    while (bovenX < 2560) {
    rect(vijandX+offset+bovenX, y, 45, 270);
    bovenX += 350;
    }

    var onderX = 50; /* onderX zijn de onderste buizen */
    while (onderX < 2560) {
    rect(vijandX+offset+onderX, 450, 45, 400);
    onderX += 350;
    }

    if (vijandX < 0) {
        vijandX = random (1250, 1500);
    }

    

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
 * Het startscherm van het spel dat je moet zien aan het begin en als je dood gaat in het spel (uitlegscherm?)
 */


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
   if (spelerY < 230 || spelerY > 400) { 
       score++
       return true;
   }
   if (abs((spelerX + 25) - onderX && bovenX)< 50) {
       score++
       return true;
   }   
   else {
       return false;
   }

  
      
   

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
   if (spelerY > 450) { // vogel op de grond
     return true;
   } else {
    return false;
   }
};

var checkStartGame = function() {
    if (spelerX === 0) {
        return true;
    } else {
        return false;
    }
}

var beginGame = function() {
    tekenVeld3();
    textSize(70);
    text("Klik op ENTER om te starten", 200, 200 , 1200, 500);
};

var eindGame = function() {
    tekenVeld2();
    textSize(70);
    text("Score: " + score, 450, 360, 1200, 500);
    textSize(80);
    text("Game Over", 400, 270, 1200, 500);
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
        case UITLEG:
            tekenVeld3();
            beweegSpeler();
            beweegVijand();
    }
};


function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegSpeler();
      beweegVeld();
      

      

      if (checkVijandGeraakt()){

        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
      case GAMEOVER:
        eindGame();
      break;
  }
};