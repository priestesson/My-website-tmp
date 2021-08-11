window.onload = function(){
  $(".nav-bar").animate(
	{top: "0px" },200);
};

function navToggle(){
  $(".nav-side").animate({left: "0%",top: "0px"},200);
}

function closeNav(){
  $(".nav-side").animate({left: "0", top: "-200%"},100);
}


function vM(){
   $(".more-about").slideToggle();
}





class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = "";
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
  }
  type() {
	const current = this.wordIndex % this.words.length;
	const fullTxt = this.words[current];
	if (this.isDeleting) {
	  this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	  this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	let typeSpeed = 120;

	if (this.isDeleting) {
	  typeSpeed /= 2;
	}
	if (!this.isDeleting && this.txt === fullTxt) {
	  typeSpeed = this.wait;
	  this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
	  this.isDeleting = false;
	  this.wordIndex++;
	  typeSpeed = 50;
	}
	setTimeout(() => this.type(), typeSpeed);
  }
}
document.addEventListener("DOMContentLoaded", init);
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);
}









// swip portfolio ********




let homeScreen, detailsScreen;

let cardContainer;

let firstCard, secondCard, thirdCard;
let gone, coming;
let allCards;

let touchStartX = 0, touchEndX = 0;

let eventNameDiv, eventVenueDiv;

const cardData = [
	{
		title: 'Portbly', 
		venue: 'Landing page', 
		image: 'https://i.imgur.com/8MlXQQO.jpg'
	},

	{
		title: 'Reon', 
		venue: 'Loja Virtual', 
		image: 'https://i.imgur.com/X1kT9nX.jpg'
	},
	
	{
		title: 'Wise', 
		venue: 'Professional',
		image: 'https://i.imgur.com/z9z7jcK.jpg'
	},
	{
		title: 'Flare', 
		venue: 'Marketing Publicitário',
		image: 'https://i.imgur.com/4JmhERW.jpg'
	},
];

let cardNumber = 0;

//card changer function
const changeCard = () => {

	//check which side it is swiped to
	//starting position is less than ending means right swipe
	//starting position is greater than ending means left swipe
	if (Math.round(touchStartX) < Math.round(touchEndX)) {

		// there should be atleast one element in gone array
		if (gone.length !== 0) {

			//any card should not be null otherwise it will throw error
			if (firstCard != null) {

				//first card moved to second card after swipe
				firstCard.classList.add('second');
				firstCard.classList.remove('first');
				cardNumber--;

			}

			if (secondCard != null) {

				//second card moved to third card after swipe
				secondCard.classList.add('third');
				secondCard.classList.remove('second');

			}

			if (thirdCard != null) {

				//third card moved as coming card
				thirdCard.classList.add('coming');
				thirdCard.classList.remove('third');

			}

			//get last element from gone array and make it first available card
			gone[gone.length - 1].classList.add('first');
			gone[gone.length - 1].classList.remove('gone');

		}

	} else if(Math.round(touchStartX) === Math.round(touchEndX)) {
		// console.log("equal");
		//Does nothing really, lol
	} else {

		//again, check for null
		if (secondCard != null) {

			if (firstCard != null) {

				//first card moved to gone
				firstCard.classList.add('gone');
				firstCard.classList.remove('first');
				cardNumber++;

			}

			if (secondCard != null) {

				//second becomes first
				secondCard.classList.add('first');
				secondCard.classList.remove('second');

			}

			if (thirdCard != null) {

				//third becomes second
				thirdCard.classList.add('second');
				thirdCard.classList.remove('third');

			}

			if (coming.length !== 0) {
			
				//first card from coming array becomes third
				coming[0].classList.add('third');
				coming[0].classList.remove('coming');

			}
		}

	}

	//setting variables again because classes are changed
	initializeCardVars();
	changeCardDetail(cardData[cardNumber]);

}

//initialize/re-initializing variabeles
const initializeCardVars = () => {
	gone = document.getElementsByClassName('gone');
	coming = document.getElementsByClassName('coming');
	firstCard = document.querySelector('.first');
	secondCard = document.querySelector('.second');
	thirdCard = document.querySelector('.third');
}

const cardOpener = (index) => {
	alert(index);
}

const changeCardDetail = (data) => {
	eventNameDiv.innerText = data.title;
	eventVenueDiv.innerText = data.venue;
	
}



const backBtn = () => {
	detailsScreen.style.left = "100%";
}

//wait for window to load
window.onload = () => {

	homeScreen = document.getElementById('home-screen');
	detailsScreen = document.getElementById('card-detalhes');

	cardContainer = document.getElementById('card-po');
	eventNameDiv = document.getElementById('nome-po');
	eventVenueDiv = document.getElementById('descri');
	eventTimeDiv = document.getElementById('time-c');

	cardData.forEach((data, index) => {

		let classes = "card ";
		switch(index) {
			case 0: 
				classes += "first";
				changeCardDetail(data);
				break;
			case 1:
				classes += "second";
				break;
			case 2: 
				classes += "third";
				break;
			default:
				classes += "coming";
				break;
		}
		const cardDiv = document.createElement('div');
		cardDiv.classList = classes;
		cardDiv.style.backgroundImage = `url(${data.image})`;
			  cardContainer.appendChild(cardDiv);

	});

   
	//	 card.addEventListener('click', () => {
	//		 cardOpener(index);
	//	 });
	// });

	//for setting initial values to variable.
	initializeCardVars();

	//mousedown and mouseup are for desktop browsers
	cardContainer.addEventListener('mousedown', (e) => {
		// console.log(e.clientX);
		touchStartX = e.clientX;
	});
	
	cardContainer.addEventListener('mouseup', (e) => {
		// console.log(e.clientX);
		touchEndX = e.clientX;
		changeCard();
	});


	//touchstart and touchend events are for mobiles
	cardContainer.addEventListener('touchstart', (e) => {
		// console.log(e.clientX);
		// alert("started");
		touchStartX = e.touches[0].clientX;
	});
	
	cardContainer.addEventListener('touchend', (e) => {
		// console.log(e.clientX);
		// alert("ended");
		touchEndX = e.changedTouches[0].clientX;
		changeCard();
	});

	/*const loader = document.querySelector('#loader');*/
	const app = document.querySelector('#App');
	/*loader.style.display = "none";*/
	app.style.display = "block";

	}