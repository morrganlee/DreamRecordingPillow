/*******************************************************************************************************************
    Dream Recording Pillow
    by Morgan Lee
 
  Color Palette Values:

  blue: #C9E4F8
  red: #F7CECA
  purple: #D5CAE2
  green: #D5E3CA
  yellow: #F8F2C9
  navy: #02144F


    Uses the p5.ComplexStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.complexStateManager.js"></script>
*********************************************************************************************************************/

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;                    // an array of clickable objects

var currentStateName = "";
var iconImage;

var navyColor = '#02144F';
var yellowColor = '#F8F2C9';
var blueColor = '#C9E4F8';
var greenColor = '#D5E3CA';
var purpleColor = '#D5CAE2';

var buttonFont;

function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");

  // buttonFont = textFont("swear-display");
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // setup the state machine with callbacks
  complexStateMachine.setup(clickablesManager, setImage, stateChanged);

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // load adobe font
  textFont('swear-display')
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawOther();
  drawUI();
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].textFont = "swear-display";
    clickables[i].width = 150;
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = purpleColor;
  this.noTint = false;
  this.tint = yellowColor;
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = yellowColor;
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  iconImage = loadImage(imageFilename);
} 

// this is a callback, which we can use for different effects
function stateChanged(newStateName) {
    currentStateName = newStateName;
    console.log(currentStateName);
} 


//==== KEYPRESSED ====/
function mousePressed() {
  // if( currentStateName === "Splash" ) {
  //   complexStateMachine.newState("Instructions");
  // }
}

//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(color(navyColor));
}

function drawImage() {
  if( iconImage !== undefined ) {
    image(iconImage, width/2, height/2, 500, 500);
  }  
}

function drawOther() {
  push();

   // Draw mood — if not on Splash or Instructions screen  
   if( currentStateName !== "intro" && currentStateName !== "instructions") {
    fill(color(yellowColor));
    // textFont(buttonFont);
    textSize(50);
    text(currentStateName, width/6, 150);
  }

  pop();
}

//-- right now, it is just the clickables
function drawUI() {
  clickablesManager.draw();
}
