var x = localStorage.getItem("data");
if(x === null){
	localStorage.setItem("data", JSON.stringify([]));
}else{
	console.log(x);
}