/*global window, document, setInterval, display*/
var imageArray;  // var for the images to be displayed
var current = 0;  // var for the image currently being viewed
var playPause;  // var for the timer interval

// function to display the following image
function nextImage() {
    "use strict";
    current = current + 1;  // increment counter by 1
    display();
}// end function nextImage

// function to display the previous image, checks to make sure number is not negative or 0
function previousImage() {
    "use strict";
    if (current > 0) {  // if it is a valid number
        current = current - 1;
    } else { // else go to the last image in the array
        current = imageArray.length - 1;
    }
    display();
}// end function previousImage

// function to create an interval to display the images
function play() {
    "use strict";
    /*global myVar*/
    playPause = setInterval(function () {current = current + 1; display(); }, 3000);
}// end function play

// function to clear the image interval
function pause() {
    "use strict";
    /*global clearInterval*/
    clearInterval(playPause);
}// end function pause

// function to sto the interval and then resume it normally after ten seconds
function delay() {
    "use strict";
    /*global setTimeout*/
    pause();
    setTimeout(function () {play(); }, 10000);
}// end function delay

// function to display buttons and pause the image when the user hovers over the slider
function mouseOver() {
    "use strict";
    pause();
    document.getElementById("controls-right").style.display = "inline";  // display left and right arrows
    document.getElementById("controls-left").style.display = "inline";
}// end function mouseOver

// function to resume normal functions when user hovers away from the slider
function mouseOut() {
    "use strict";
    play();
    document.getElementById("controls-right").style.display = "none";  // hide the arrows
    document.getElementById("controls-left").style.display = "none";
}// end function mouseOut

// function the listen for user in putted events
function events() {
    "use strict";
    var buttonRight = document.getElementById("controls-right"),
        buttonLeft = document.getElementById("controls-left"),
        opusSlider = document.getElementById("opus");

    buttonRight.addEventListener("click", nextImage, false);  // if a button is clicked
    buttonLeft.addEventListener("click", previousImage, false);
    opusSlider.addEventListener("mouseover", mouseOver, false);  // if the user hovers over the slider
    opusSlider.addEventListener("mouseout", mouseOut, false);
}// end function events

// function to display images and wait for user input
function display() {
    "use strict";
    /*global document*/
    document.getElementById("opus").innerHTML = "<div id = 'slides'>" + imageArray[current % imageArray.length] + "<img id='controls-left' width='25' height='25' src='arrow-left.png' /><img id='controls-right' width='25' height='25' src='arrow-right.png' /></div>";  // add the images and the arrows to the dom
    events();  // after images are displayed, activate the event listeners
}// end function display

// loads images using from an external file using ajax
function loadXMLDoc() {
    "use strict";
    /*global XMLHttpRequest*/
    var xmlhttp = new XMLHttpRequest();  // new xml http request
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {  // if images loaded
            imageArray = xmlhttp.responseText.split('\n');  // to create an array of the images
            display();  // display the images
        }
    };
    xmlhttp.open("GET", "opus-images.html", true);
    xmlhttp.send();
}// end function loadXMLDoc

window.onload = function () {
    "use strict";
    loadXMLDoc();  // use ajax to load images
    play();  // start the slider
};
