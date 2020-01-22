/* app.js */

// qwerty variable
const qwerty = $('#qwerty');
// phrase variable
const phrase = $('#phrase');
// missed counter
let missed = 0;
// starter overlay variable
const start_overlay = $('#overlay');
// Start Game button variable
const btn__reset = $('.btn__reset');
// Scoreboard ordered list container
const scoreboard_ol = $("ol");
// Phrase array
const phrases = [
    'i am a developer',
    'deez nutz',
    'i am iron man',
    'panda panda panda',
    'honeymoon avenue'
];

// Empty string to hold the random phrase
let phraseArray = '';

// EVENT LISTENER TO START THE GAME
// Clicking the btn_reset will trigger the game to start.
// The start overlay will be hidden, all of the
//------------------------------------------------------------------------------------------
btn__reset.on("click", () => {

    start_overlay.hide();

    for (let i = 0; i < $('button').length; i++){
        $('button').eq(i).removeAttr("disabled");
        $('button').eq(i).removeClass("chosen");
    }

    for (let i = 0; i < $('.tries').length; i++){
        $('.tries').show();
    }

    phrase.empty();

    phraseArray = getRandomPhraseAsArray(phrases);

    addPhraseToDisplay(phraseArray);

    missed = 0;

});


// KERYBOARD EVENT LISTENER
// Every time a button on the game's page is clicked,
// give that button the chosen class and disable it from being clicked again.
// If the button clicked is not in the random phrase, hide one of the missed hearts
// and check whether the player has won the game.
//------------------------------------------------------------------------------------------
qwerty.on('click', (event) => {
    if (event.target.tagName == "BUTTON") {
        event.target.className = "chosen";
        event.target.setAttribute("disabled", "true");

        let letterFound = checkLetter(event.target);

        if (letterFound == null) {

            scoreboard_ol.children().eq(missed).hide();

            missed++;
        }

        checkWin();

    }
});



// GET A RANDOM PHRASE
// Given an array, this function will return a random value from that array.
// The random function returns a random float number from 0 to 1 (not including 1)
// and the floor function rounds the number down to an integer.
// ------------------------------------------------------------------------------------------
function getRandomPhraseAsArray(arr){
    let random = Math.floor(Math.random()*arr.length)
    
    let random_arr = arr[random].split('');

    return random_arr;
}

// ADD PHRASE TO DISPLAY
// Map a given random phrase from the "phrases array" to the display.
// If the character you're currently looking at is ' ', add a new
// <li> child to the phrase element with className = "space".
// Otherwise, add a new <li> child to the phrase element with
// className="letter". Both also add the current arr index as a text value.
// -------------------------------------------------------------------------------------------
function addPhraseToDisplay(arr){

    for(let i=0; i<arr.length; i++){

        if (arr[i] === ' '){
            phrase.first().append($('<li></li>')
                .addClass("space")
                .text(arr[i]));
        } else {
            phrase.first().append($('<li></li>')
                .addClass("letter")
                .text(arr[i]));
        }

    }

}

// CHECK LETTER
// Initialize an empty string to store the input letter.
// It will return the value of the phrase letter if and only if the 
// clicked letter is in the phrase_ul.
// ------------------------------------------------------------------------------------------
function checkLetter(qwertyButton){
    let letter_tracker = '';
    for (let i = 0; i < phrase.first().find('.letter').length ; i++){
        if (qwertyButton.textContent == $('.letter').eq(i).text()) {
            $('.letter').eq(i).addClass( "show");;
            if (letter_tracker == ''){
                letter_tracker = qwertyButton.textContent;
            }
        }
    }

    if (letter_tracker != ''){
        return qwertyButton.textContent;
    }
    else {
        return null;
    }
}

// CHECK WIN
// If the number of values shown matches the number letters in the random phrase,
// display the win overlay. Otherwise, show the lose overlay.
// ------------------------------------------------------------------------------------------
function checkWin(){
    if($('.show').length == $('.letter').length){
        start_overlay.removeClass();
        start_overlay.addClass("win");
        $('.title').empty().text("CONGRATULATIONS, YOU'VE WON!");
        btn__reset.empty().text("DO YOU WANT TO PLAY AGAIN?");
        start_overlay.show();
    }

    if(missed > 4){
        start_overlay.removeClass();
        start_overlay.addClass("lose");
        $('.title').empty().text("SORRY, YOU'VE LOST.");
        btn__reset.empty().text('DO YOU WANT TO PLAY AGAIN?');
        start_overlay.show();
    }
}
