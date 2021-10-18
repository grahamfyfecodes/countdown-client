var gameId;
var letters = "";
var countdown = 30;

window.onload = function loadPage() {
	
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	letters = urlParams.get('letters');
	gameId = urlParams.get('gameId');
	
	var elemLetters = document.getElementById('letters');
	elemLetters.innerHTML = letters;	
	
	var elemTimer = document.getElementById('timer');
	elemTimer.innerHTML = countdown;	
}

var x = setInterval(function() {
	
	countdown--;
	
	var elemTimer = document.getElementById('timer');
	elemTimer.innerHTML = countdown;
	
	if (countdown == 0) {
		clearInterval(x)
	}
	
	
}, 1000);