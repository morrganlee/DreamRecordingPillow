/*******************************************************************************************************************
    Dream Recording Pillow
    by Morgan Lee

    Uses the p5.ComplexStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.complexStateManager.js"></script>
*********************************************************************************************************************/

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;                    // an array of clickable objects

var currentStateName = "";
var iconImage;

// colors
var navyColor = '#02144F';
var yellowColor = '#F8F2C9';
var blueColor = '#C9E4F8';
var greenColor = '#D5E3CA';
var purpleColor = '#D5CAE2';
var pinkColor = '#F7CECA';

var buttonFont;

// icons
var dreamIcon;
var socialIcon;
var dayIcon;
var paraIcon;
var publicIcon;

// button images
var buttonIcon;
var hoverButtonIcon;

// button icons
const nextIndex = 0;
const tryAgainIndex = 18;

// scoring variables
  // initialize all scores at 0:
var researchScore = 1; // begins at one
var socialScore = 0;
var dayScore = 0;
var paraScore = 0;
var publicScore = 0;
  // star image and x coordinates
var yStar;
var star;
var firstStarX = 153;
  // returns selectionIndex
var selectionIndex;

function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");

  // buttonFont = textFont("swear-display");

  // load icons
  dreamIcon = loadImage('assets/research.png');
  socialIcon = loadImage('assets/social.png');
  dayIcon = loadImage('assets/daydream.png');
  paraIcon = loadImage('assets/nightmare.png');
  publicIcon = loadImage('assets/public.png');

  star = loadImage('assets/star.png');
  yStar = loadImage('assets/star-yellow.png');

  buttonIcon = loadImage('assets/selection.png');
  hoverButtonIcon = loadImage('assets/select_hover.png');
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CORNER);
  rectMode(CORNER);

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
  drawUI();

  //star follows mouse
  mouseStar();

  if( currentStateName === "players"){
    drawPlayersInfo();
  }

  if( currentStateName !== 'intro' && currentStateName !== 'instructions' && currentStateName !== 'players' && currentStateName !== 'endScene'){
    drawScore();
    hoverPlayersName();
  }
}

function setupClickables() {
  // text clickables
  for( let i = 0; i <= 2; i++ ) {
    clickables[i].onHover = clickableButtonHoverText;
    clickables[i].onOutside = clickableButtonOnOutsideText;
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].textFont = "swear-display-cilati";
    clickables[i].textColor = navyColor;
    clickables[i].textSize = 30;
    clickables[i].width = 100;
  }
  // selection clickables
  for ( let j = 2; j <= 19; j++){
    clickables[j].drawImageOnly = true;
    clickables[j].onHover = clickableButtonHoverImg;
    clickables[j].onOutside = clickableButtonOnOutsideImg;
    clickables[j].onPress = clickableButtonPressed;
  }
}

// text clickables
clickableButtonHoverText = function () {
  this.color = blueColor;
  this.noTint = false;
  this.tint = yellowColor;
}

clickableButtonOnOutsideText = function () {
  this.color = yellowColor;
}

// image clickables
clickableButtonHoverImg = function() {
  this.setImage(hoverButtonIcon);
}

clickableButtonOnOutsideImg = function() {
  this.setImage(buttonIcon);
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
  // print('index is ' + this.id); debugging
  keepScore(this.id);
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

function drawBackground() {
  background(color(navyColor));
}

function drawImage() {
  if( iconImage !== undefined ) {
    image(iconImage, 0, 0, 1280, 720);
  }  
}

function drawUI() {
  clickablesManager.draw();
}

function drawPlayersInfo() {
  if(mouseX > 80 && mouseX < 320){
      if(mouseY > 198 && mouseY < 285){ // dream researcher
        image(dreamIcon, 390, 213, 115, 115);
        fill(yellowColor);
        noStroke();
        textSize(62);
        textFont('swear-display-cilati');
        text('The Dream', 530, 260);
        text('Researcher', 530, 315);
        stroke(yellowColor);
        strokeWeight(2);
        line(528, 333, 790, 333);
        textSize(25);
        textFont('swear-display');
        noStroke();
        text("They are a recent medical school graduate who just moved to New York for a job with a focus on studying dreams. They have a strong ethics system, which helps their job: objectively watching dreams to analyze societal trends. Still, they don’t want to overstep any boundaries while knowing that anything they do will set a precedent for the future.", 406, 355, 566);
    }
    else if(mouseY > 289 && mouseY < 379){ // social dreamer
        image(socialIcon, 390, 213, 115, 115);
        fill(pinkColor);
        noStroke();
        textSize(62);
        textFont('swear-display-cilati');
        text('The Social', 530, 260);
        text('Dreamer', 530, 315);
        stroke(pinkColor);
        strokeWeight(2);
        line(528, 333, 780, 333);
        textSize(25);
        textFont('swear-display');
        noStroke();
        text("As a social media manager for a startup in Brooklyn, they know the ins and outs of the internet and are incredibly social. They over-share everything from their life on the internet and to the barista making their latte. They just moved in with their partner, and haven’t had eyes for anyone else… at least seriously.", 406, 355, 566);
    }
    else if(mouseY > 383 && mouseY < 473){ // daydreamer
        image(dayIcon, 390, 213, 115, 115);
        fill(blueColor);
        noStroke();
        textSize(62);
        textFont('swear-display-cilati');
        text('The Day-', 530, 260);
        text('Dreamer', 530, 315);
        stroke(blueColor);
        strokeWeight(2);
        line(528, 333, 765, 333);
        textSize(25);
        textFont('swear-display');
        noStroke();
        text('They come from a long line of addicts and was officially diagnosed with depression and OCD a month ago. Now  in their fourth year working as the publicist for an actor, the constant stress and intrusive thoughts drive them into daily headaches at the end of the day. All they want to do is hibernate for a week, or month, or year, or two.', 406, 355, 566);
    }
    else if(mouseY > 477 && mouseY < 567){ // parasomniac
        image(paraIcon, 390, 213, 115, 115);
        fill(purpleColor);
        noStroke();
        textSize(62);
        textFont('swear-display-cilati');
        text('The', 530, 260);
        text('Parasomniac', 530, 315);
        stroke(purpleColor);
        strokeWeight(2);
        line(528, 333, 830, 333);
        textSize(25);
        textFont('swear-display');
        noStroke();
        text("A grad student at Columbia, they just found a therapist to help with their nightmares, anxiety, and lack of sleep because of that. However, sleeping an average of 4 hours a night is starting to affect them as they’re balancing their thesis, a full time job, classes, and moving in with their partner in Brooklyn.", 406, 355, 566);
    }
    else if(mouseY > 569 && mouseY < 661){ // the public figure
        image(publicIcon, 390, 213, 115, 115);
        fill(greenColor);
        noStroke();
        textSize(62);
        textFont('swear-display-cilati');
        text('The Public', 530, 260);
        text('Figure', 530, 315);
        stroke(greenColor);
        strokeWeight(2);
        line(528, 333, 780, 333);
        textSize(25);
        textFont('swear-display');
        noStroke();
        text('Best known for roles on the golden screen and speaking up for justice online, they have been in the spotlight for years. They know how to avoid the paparazzi and have a (somewhat) healthy relationship with fans on the internet. There have been a iCloud hack or two, but the general public forgot about that by now.', 406, 355, 566);
    }
  }
}

function hoverPlayersName() {
  push();
  textFont('swear-display-cilati');
  textSize(25);
  fill(navyColor);
  if(mouseX > 48 && mouseX < 139){
    if(mouseY > 60 && mouseY < 151){
      text("The Dream Researcher", mouseX + 15, mouseY + 5);
    }
    else if(mouseY > 187 && mouseY < 272){
      text("The Social Dreamer", mouseX + 15, mouseY + 5);
    }
    else if(mouseY > 315 && mouseY < 406){
      text("The Day-Dreamer", mouseX + 15, mouseY + 5);
    }
    else if(mouseY > 442 && mouseY < 533){
      text("The Parasomniac",mouseX + 15, mouseY + 5);
    }
    else if(mouseY > 569 && mouseY < 660){
      text("The Public Figure", mouseX + 15, mouseY + 5);
    }
  }
  pop();
}

function keepScore(selectionIndex) {
  if(selectionIndex === 2){ // include day dreamer
    dayScore += 1;
  }
  if(selectionIndex === 3){ // expose dream
    researchScore += 1;
    publicScore += 1;
  }
  if(selectionIndex === 4){ // sleep affects social
    socialScore = 2;
  }
  if(selectionIndex === 5){ // send warning
    researchScore += 1;
    dayScore = 3;
  }
  if(selectionIndex === 6){ // publicist affects daydreamer
    dayScore = 1;
  }
  if(selectionIndex === 7){ // tweet rant
    publicScore = 3;
    dayScore += 1;
    socialScore = 2;
  }
  if(selectionIndex === 8){ // go back to sleep
    if(socialScore === 2){
      socialScore -= 1;
    }
    if(socialScore === 0){
      socialScore = 1;
    }
    if(publicScore === 0){
      publicScore = 1;
    }
  }
  if(selectionIndex === 9){ // work
    dayScore += 1
  }
  if(selectionIndex === 10){ // share dream
    socialScore -= 1;
    paraScore += 1;
  }
  if(selectionIndex === 11 || selectionIndex === 15){ // therapy
    paraScore = 3;
  }
  if(selectionIndex === 12){ // write letter
    paraScore += 1;
    researchScore -=1;
  }
  if(selectionIndex === 13){ // tweet bad dream
    if(socialScore === 2){
      socialScore += 1;
    }
    paraScore += 1;
    publicScore = 2;
  }
  if(selectionIndex === 14){ // text
    if(socialScore > 1){
      socialScore = 3;
    }
    else if(socialScore === 1){
      socialScore += 1;
    }
    paraScore = 3;
  }
  if(selectionIndex === 17){ // joke
    if(publicScore < 1){
      publicScore -= 1;
    }
    socialScore += 1;
  }
  if(selectionIndex === 18){ // condem
    if(publicScore === 2){
      publicScore = 3;
    }
    else if(publicScore === 1){
      publicScore += 1;
    }
    if(socialScore < 1){
      socialScore -= 1;
    }
  }
  if(selectionIndex === 1){ // reset scores
    researchScore = 1; // begins at one
    socialScore = 0;
    dayScore = 0;
    paraScore = 0;
    publicScore = 0;
  }
}

function drawScore(){
  for( let k = 0; k < researchScore; k++ ) {
    image(star, firstStarX + (k * 42), 83);
  }
  for( let l = 0; l < socialScore; l++ ){
    image(star, firstStarX + (l * 42), 210);
  }
  for( let m = 0; m < dayScore; m++ ){
    image(star, firstStarX + (m * 42), 337);
  }
  for( let n = 0; n < paraScore; n++ ){
    image(star, firstStarX + (n * 42), 464);
  }
  for( let o = 0; o < publicScore; o++){
    image(star, firstStarX + (o * 42), 591);
  }
}

function mouseStar(){
  push();
  imageMode(CENTER);
  if( currentStateName === 'intro' || currentStateName === 'instructions' || currentStateName === 'players' || currentStateName === 'endScene'){
    image(yStar, mouseX - 5, mouseY - 5);
  }
  else{
    image(star, mouseX - 5, mouseY - 5);
  }  
  pop();
}
