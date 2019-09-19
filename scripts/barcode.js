var d = null;

var fData;

var dab;

function plusAmountbc(n1, n2){
	var dat = JSON.parse(localStorage.getItem("data"));
	dat.unshift([n1, n2]);
	localStorage.setItem("data", JSON.stringify(dat));
}

function uBr(){
	dab = JSON.parse(this.responseText);
	console.log(dab);
}

function uDat(){
	fData = JSON.parse(this.responseText);
	console.log(fData);
}

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", uBr);
xhr.open("GET", "https://eyangch.github.io/caloreasyv2/data/datab.json");
xhr.send();

var xhr2 = new XMLHttpRequest();
xhr2.addEventListener("load", uDat);
xhr2.open("GET", "https://eyangch.github.io/caloreasyv2/data/data.json");
xhr2.send();

function loglog(data){
	console.log(data.codeResult.code);
	var apd = "(unknown)";
	if(Object.keys(dab).includes(data.codeResult.code)){
		apd = "(" + dab[data.codeResult.code] + ")";
	}
	document.getElementById("output").innerHTML = data.codeResult.code + apd;
	d = data.codeResult.code;
}

function stop(){
	Quagga.stop();
}

function start(){
Quagga.init({
		numOfWorkers: 4,
		locator: {
			patchSize: "x-large",
			halfSample: false
		},
		inputStream: {
			name: "Live",
			type: "LiveStream",
			target: document.getElementById("out")
		},
		decoder: {
			readers: ["upc_reader"]
		}
	}, 
	function(err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("Initialization finished. Ready to start");
		Quagga.start();
	}
);
Quagga.onDetected(loglog);
}

function ok(){
	console.log(d);
	if(d){
		if(Object.keys(dab).includes(d)){
			plusAmountbc(dab[d], fData[dab[d]]);
		}
	}
	location.href = "calorieTracker.html";
}
