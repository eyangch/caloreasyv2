
window.onload = function(){
	updCal();
}

function updCal(){
	var calPlace = document.getElementById("calamount");
	var rawcal = JSON.parse(localStorage.getItem("data"));
	var calamount = 0;
	for(var i = 0; i < rawcal.length; i++){
		calamount += rawcal[i][1]["cal"];
	}
	calPlace.innerHTML = calamount;
}

function reset(){
	localStorage.setItem("data", JSON.stringify([]));
	updCal();
}