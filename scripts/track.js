
window.onload = function(){
	updCal();
}

function updCal(){
	var calPlace = document.getElementById("calamount");
	var fatPlace = document.getElementById("fatamount");
	var carbPlace = document.getElementById("carbamount");
	var sugPlace = document.getElementById("sugamount");
	var protPlace = document.getElementById("protamount");
	var rawdat = JSON.parse(localStorage.getItem("data"));
	var calamount = 0;
	var fatamount = 0;
	var carbamount = 0;
	var sugamount = 0;
	var protamount = 0;
	for(var i = 0; i < rawdat.length; i++){
		calamount += rawdat[i][1]["cal"];
		fatamount += rawdat[i][1]["fat"];
		carbamount += rawdat[i][1]["carb"];
		sugamount += rawdat[i][1]["sug"];
		protamount += rawdat[i][1]["prot"];
	}
	calPlace.innerHTML = calamount.toFixed(1);
	fatPlace.innerHTML = fatamount.toFixed(1);
	carbPlace.innerHTML = carbamount.toFixed(1);
	sugPlace.innerHTML = sugamount.toFixed(1);
	protPlace.innerHTML = protamount.toFixed(1);
}

function reset(){
	localStorage.setItem("data", JSON.stringify([]));
	updCal();
}