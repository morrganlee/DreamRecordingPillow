# Project 1: Dream Recording Pillow
#### by Morgan Lee

## Overview
An exploration of a speculative technology, the dream recording pillow through using complex state machine.

Additional project and technology information in writeup.pdf.

[# AdobeXD Project Link](https://xd.adobe.com/view/7f50b461-e918-4da5-90a3-d55915353f43-2a03/)

## Sketch
### Functions
**Clickables Functions** that are part of the Clickables library including:

*  **setupClickables()**: creates text and selection clickables by going through for loop
* 	**clickableButtonHoverText()**: sets hover state for text only buttons
* 	**clickableButtonOnOutsideText()**: resets from hover state on text only buttons
* 	**clickableButtonHoverImg()**: sets hover state for selection image button
* 	**clickableButtonOnOutsideImg()**: resets from hover state on selection image button
* 	**clickableButtonPressed()**: changes state when clickable clicked, calls **keepScore()** function and sending the clickable's id defined in *clickableLayout.csv*

**setImage():**
	sets image for each state defined in *interactionTable.csv*

**stateChanged():**
	changes state when clicked, prints out *currentStateName* to console log

**drawBackground():**
	draws plain navy background

**drawImage():**
	draws the image degined in *interactionTable.csv* and set in *setImage()*

**drawPlayersInfo():**
	allows for hover interaction on Player menu screen
	
**hoverPlayersName():**
	allows for hover interaction over Player icons while in simulation
	
**keepScore():**
	changes score by using clickable id, called when clickable is clicked
	
**drawScore():**
	uses each player's score variable to loop through and draw stars according to each score
	
**mouseStars():**
	adds a blue or yellow star underneath cursor depending on what state is in use

## License
Adapted from Complex State Machine code by Scott Kidall

### About
The p5.js Complex State Machine allows for clickables and shifts between the different states. The complexStateManager takes information from the .csv files and has functions to be called in a p5 sketch. The clickable function creates the clickables based on the .csv files and also has functions that can be set in the p5 sketch. The complex state machine uses the clickables code to navigate through the states in the state machine code.

**CC BY:** This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use.
