const nDisp = 5;
const fPadd = 1;

function plusAmount(n1, n2){
	var dat = JSON.parse(localStorage.getItem("data"));
	dat.unshift([n1, n2]);
	localStorage.setItem("data", JSON.stringify(dat));
}
var inp;
var out;
var jsonStuff;
var jsonKeys;
window.onload = function(){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", uJson);
	xhr.open("GET", "https://eyangch.github.io/caloreasyv2/data/data.json");
	xhr.send();
}
function updInp(evt){
	console.log(inp.value);
	out.innerHTML = "";
	if(inp.value.length === 0){
		var p = document.createElement("p");
		p.classList.add("center");
		p.innerHTML = "Please enter a food.";
		out.appendChild(p);
		return;
	}
	var done = 0;
	floop:
	for(var i = 0; i < jsonKeys.length && done < nDisp; i++){
		for(var j = 0; j < inp.value.length; j++){
			if(j >= jsonKeys[i].length || inp.value[j] != jsonKeys[i][j]){
				continue floop;
			}
		}
		createFoodSelector(i);
		done++;
	}
	if(done == 0){
		var p = document.createElement("p");
		p.classList.add("center");
		p.innerHTML = "There are no foods in the database that match your query.";
		out.appendChild(p);
	}
}
function selectFood(id){
	plusAmount(jsonKeys[id], jsonStuff[jsonKeys[id]]);
	window.location.href = "calorieTracker.html";
}
function createFoodSelector(id){
	var dv = document.createElement("div");
	dv.id = id;
	dv.style.width = "50%";
	dv.style.height = String((100/nDisp) - fPadd) + "%";
	dv.style.margin = String(fPadd/2) + "%";
	dv.style.border = "5px solid Blue";
	dv.style.borderRadius = "25px";
	dv.style.display = "flex";
	dv.style.justifyContent = "center";
	dv.classList.add("divFood");
	dv.onclick = function(){selectFood(id);};
	var h3 = document.createElement("h3");
	h3.innerHTML = jsonKeys[id];
	h3.style.marginRight = "10px";
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	p1.innerHTML = "Amount: " + String(jsonStuff[jsonKeys[id]]["amount"]) + "g";
	p1.style.marginRight = "10px";
	p2.innerHTML = "Calories: " + String(jsonStuff[jsonKeys[id]]["cal"]);
	dv.appendChild(h3);
	dv.appendChild(p1);
	dv.appendChild(p2);
	out.appendChild(dv);
}
function uJson(){
	jsonStuff = JSON.parse(this.responseText);
	jsonKeys = Object.keys(jsonStuff);
	inp = document.getElementById("inp");
	out = document.getElementById("out");
	inp.addEventListener("input", updInp);
	updInp(null);
}