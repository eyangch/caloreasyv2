const nDisp = 5;
const fPadd = 1;

window.onload = function(){
	updCal();
}

function updCal(){
	document.getElementById("prevFood").innerHTML = "";
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
		if(i <= 6){
			document.getElementById("prevFood").append(createFoodSelector(rawdat[i][0], rawdat[i][1]));
		}
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

function createFoodSelector(id, dat){
	var dv = document.createElement("div");
	dv.style.width = "100%";
	dv.style.height = String((100/nDisp) - fPadd) + "%";
	dv.style.margin = String(fPadd/2) + "%";
	dv.style.border = "5px solid Blue";
	dv.style.borderRadius = "25px";
	dv.style.display = "flex";
	dv.style.justifyContent = "center";
	dv.classList.add("divFood");
	var p = document.createElement("p");
	p.innerHTML = id;
	p.style.marginRight = "10px";
	p.style.fontSize = "12px";
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	p1.innerHTML = "Amount: " + String(dat["amount"]) + "g";
	p1.style.marginRight = "10px";
	p1.style.fontSize = "10px";
	p2.innerHTML = "Calories: " + String(dat["cal"]);
	p2.style.fontSize = "10px";
	dv.appendChild(p);
	dv.appendChild(p1);
	dv.appendChild(p2);
	return dv;
}
