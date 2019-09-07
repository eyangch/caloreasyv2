
window.onload = function(){
	updCal();
}

function updCal(){
	var calPlace = document.getElementById("calamount");
	calPlace.innerHTML = localStorage.getItem("cal");
}

function reset(){
	localStorage.setItem("cal", 0);
	updCal();
}