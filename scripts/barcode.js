var d = null;

var dab;

function uBr(){
	dab = JSON.parse(this.responseText);
	console.log(dab);
}

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", uBr);
xhr.open("GET", "https://eyangch.github.io/caloreasyv2/data/datab.json");
xhr.send();

function loglog(data){
	console.log(data.codeResult.code);
	var apd = "";
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
		
	}
	location.href = "calorieTracker.html";
}
