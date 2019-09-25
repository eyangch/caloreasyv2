const origW = 640;
const origH = 480;
const W = 64;
const H = 48;

const predImgSize = 96;

const MP = origW / W;

class AImodel{
	constructor(){	
		this.model = tf.sequential();
	}
	async init(){
		this.model = await tf.loadLayersModel("https://eyangch.github.io/caloreasyv2/aux/model.json");
	}
	initAux(){
		this.model.summary();
	}
	predictModel(inp){
		const d = tf.scalar(255); // origionally 0-255
		inp = inp.div(d); // turn in to 0-1
		inp = inp.reshape([-1, predImgSize, predImgSize, 3]);
		return this.model.predict(inp).arraySync();
	}
}

function getPix(x, y){
	return [floodData[(y * W + x) * 4], floodData[(y * W + x) * 4 + 1], floodData[(y * W + x) * 4 + 2]];
}

var beenTo = [[]]

function initBT(x, y){
	beenTo = Array(x);
	for(var i = 0; i < x; i++){
		beenTo[i] = Array(y);
		beenTo[i].fill(0);
}
	}
function getDiff(x1, y1, x2, y2){
    p1 = getPix(x1, y1);
    p2 = getPix(x2, y2);
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]) + Math.abs(p1[2] - p2[2]);
}
function floodFill(x, y, thresh){
    if(beenTo[x][y] === 1){
        return [];
	}
    beenTo[x][y] = 1;
    var ret = [[x, y]];
    if(x > 0 && getDiff(x, y, x-1, y) < thresh){
        ret = ret.concat(floodFill(x-1, y, thresh));
	}
    if(x < W - 1 && getDiff(x, y, x+1, y) < thresh){
        ret = ret.concat(floodFill(x+1, y, thresh));
	}
    if(y > 0 && getDiff(x, y, x, y-1) < thresh){
        ret = ret.concat(floodFill(x, y-1, thresh));
	}
    if(y < H - 1 && getDiff(x, y, x, y+1) < thresh){
        ret = ret.concat(floodFill(x, y+1, thresh));
	}
    return ret
} 
function Srch(thresh, padding, minxWidth, minyHeight, minSize){
    initBT(W, H);
    var ret = [];
    for(var i = 0; i < W; i++){  //x
        for(var j = 0; j < H; j++){  //y
            if(beenTo[i][j] === 1){
                continue;
			}
            var area = floodFill(i, j, thresh);
            if(area.length > minSize){
                var minW = W;
                var maxW = 0;
                var minH = H;
                var maxH = 0;
                for(var k = 0; k < area.length; k++){
                    minW = Math.min(minW, area[k][0] - padding);
                    minH = Math.min(minH, area[k][1] - padding);
                    maxW = Math.max(maxW, area[k][0] + padding);
                    maxH = Math.max(maxH, area[k][1] + padding);
				}
                if(minW < 0){
                    minW = 0;
				}                
				if(minH < 0){
                    minH = 0;
				}                
				if(maxW > W){
                    maxW = W;
				}                
				if(maxH > H){
                    maxH = H;
				}
                if(maxW - minW < minxWidth || maxH - minH < minyHeight){
                    continue;
				}
                ret = ret.concat(Array([minW, minH, maxW, maxH]));
			}
		}
	}
    return ret;
}
var trainData = [];
var trainLabels = [];
var classifier = new AImodel();
classifier.init().then(function(){classifier.initAux()});

var video = document.getElementById("wc");
var canv = document.getElementById("wcc2");
var ctx = canv.getContext("2d");
var canv2 = document.getElementById("wcc");
var ctx2 = canv2.getContext("2d");
var canvNR = document.getElementById("wccNR");
var ctxNR = canvNR.getContext("2d");
var pred = document.getElementById("pred");
var ctxP = pred.getContext("2d");
var bgrc = document.getElementById("bgr");
var ctxBGR = bgrc.getContext("2d");

var stats = document.getElementById("status");

var floodData;

var playVid = true;

video.addEventListener("play", function(){
	var w = video.videoWidth;
	var h = video.videoHeight;
	canv2.width = w;
	canv2.height = h;
	ctx.scale(W / w, H / h);
	function normal(){
		if(playVid){
			ctx2.clearRect(0, 0, origW, origH);
			ctx.drawImage(video, 0, 0);
			ctx2.drawImage(video, 0, 0);
		}
	}
	setInterval(normal, 20);
});

function summonTheAI(){
	stats.innerHTML = "Loading...";
	setTimeout(actuallyDoStuffHereCuzJavascriptIsKindaWeird, 30);
}

function actuallyDoStuffHereCuzJavascriptIsKindaWeird(){
	var it = 0;
	ctx2.lineWidth = 5;
	playVid = false;
	ctxNR.drawImage(canv2, 0, 0);
	floodData = ctx.getImageData(0, 0, W, H).data;
	var igD = ctxNR.getImageData(0, 0, origW, origH).data;
	var igDproc = new Uint8ClampedArray(origH * origW * 4);
	for(var j = 0; j < origW * origH; j++){
		var red = j * 4;
		igDproc[red] = igD[red + 2];
		igDproc[red + 1] = igD[red + 1]; // cvt from RGB to BGR
		igDproc[red + 2] = igD[red];
		igDproc[red + 3] = igD[red + 3];
	}
	console.log(igDproc);
	var imgDat = new ImageData(igDproc, 640, 480);
	ctxBGR.putImageData(imgDat, 0, 0);
	for(var threshold = 15; threshold < 36; threshold += 10){
		it++;
		res = Srch(threshold, 4, 10, 10, W * H / 100);
		for(var i = 0; i < res.length; i++){
			var rx = res[i][0] * MP;
			var ry = res[i][1] * MP;
			var rw = (res[i][2] - res[i][0]) * MP;
			var rh = (res[i][3] - res[i][1]) * MP;
			var done = false;
			ctxP.drawImage(bgrc, rx, ry, rw, rh, 0, 0, predImgSize, predImgSize);
			var op = classifier.predictModel(tf.browser.fromPixels(pred))[0][0];
			console.log(op);
			if(op > 0.45){
				console.log("ye");
				ctx2.strokeRect(rx, ry, rw, rh);
			}
		}
	}
	stats.innerHTML = "Done!";
}

function resetPV(){
	stats.innerHTML = "";
	playVid = true;
}

window.onload = function(){
	navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(function(stream){
		video.srcObject = stream;
		video.onloadedmetadata = function(e) {video.play()};
	});
}
