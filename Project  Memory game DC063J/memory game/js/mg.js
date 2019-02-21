let clock = 0;
let timer;
let Clicked = false; // varaible clicked
let matchedopenCardCount = 0; // variable countcards

function sTimer() {  //this function controls the game time 
	timer = setInterval(function () {
		if (Clicked) {
			clock++;
			document.querySelector('.clock').innerHTML = `${clock}`;
		}
	}, 1000);
}

function stopTime() {  // this function is activated, when the game ends and the modal is called where the final time is 
	clearInterval(timer);


}


//this variable contains the icons of the game
var cards = ['fa-car', 'fa-car', 'fa-plane', 'fa-plane',
	'fa-book', 'fa-book', 'fa-key', 'fa-key', 'fa-bars', 'fa-bars',
	'fa-phone', 'fa-phone', 'fa-map', 'fa-map', 'fa-television', 'fa-television'
];

// templte strings for md, dynamically create the cards, without having to place one by one in the html
function create(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//
function memoryGame() {  // this function starts the game
	var deck = document.querySelector('.deck'); // here I am calling the cards
	clock = 0;
	sTimer();
	var cardHTML = shuffle(cards).map(function (card) { // this function shuffles the cards
		return create(card);

	});

	deck.innerHTML = cardHTML.join('');

}
memoryGame();   // init the game 


var gameCards = document.querySelectorAll('.card');
var openCards = []; // open cards lenght


gameCards.forEach(function (card) {
	card.addEventListener('click', function (e) {
		Clicked = true;
		//ccheck the letters, open them if they match, leave them open, in addition to calling the html classes
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('mach') && !card.classList.contains('disable')) {
			openCards.push(card);
			card.classList.add('open', 'show'); // open the cards and show 


			if (openCards.length == 2) { //  if the open cards are equal to 2, open them
				//check if the cards match by mdn  
				if (openCards[0].dataset.card == openCards[1].dataset.card) {
					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');
					openCards[0].classList.add('disable');

					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');
					openCards[1].classList.add('disable');
					openCards = []; // reset the zero card
					matchedopenCardCount = matchedopenCardCount + 2;
                    if (matchedopenCardCount == 16){ // if the 16 cards match, for the time and show the modal
						clearInterval(timer);
						stopTime = timer.innerHTML;
						Clicked = false;
						congrat();
						stopTime()
					}

				} else {
					//If the cards do not match, they hide
					setTimeout(function () {
						openCards.forEach(function (card) {
							card.classList.remove('open', 'show');
						});
						openCards = [];
					}, 1000);
					addMove()
				}

			}
		}
	});
});


// variable stars
let starsContainer = document.querySelector(".stars");
let star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>  <li><i class="fa fa-star"></i></li> `


// This function contains the number of movements and the score according to the number of attempts
function starts() {

	if (moves < 8) {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>  <li><i class="fa fa-star"></i></li>  `;
	} else if (moves < 15) {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
	} else {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
	}
}

const movesContainer = document.querySelector(".moves");
let moves = 0;

function addMove() {
	moves++;
	movesContainer.innerHTML = moves;
	//set the starts
	starts();


}


//modal variable
let modal = document.getElementById("modalPopup")
//variable of stars li 
let stars = document.querySelectorAll(".stars li");
//viarable od close  modal
let closeicon = document.querySelector(".close");


//in the function congrat show that the cards match the time, the movements and the score
function congrat() {
	modal.classList.add("show");
	clearInterval(timer);
	stopTime = timer.innerHTML; //
	//declare star variable
	var star = document.querySelector(".stars").innerHTML;
	//the modal here shows the time, the movements and the score with stars 
	document.getElementById("move").innerHTML = moves;
	document.getElementById("star").innerHTML = star;
	document.getElementById("time").innerHTML = clock;
	//the button closes the modal
	closeModal();

}

//this function closes the modal
function closeModal() {
	closeicon.addEventListener("click", function () {
		modal.classList.remove("show");
		memoryGame();
	});
}

