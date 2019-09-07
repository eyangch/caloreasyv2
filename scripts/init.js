var x = localStorage.getItem("cal");
if(x === null){
	localStorage.setItem("cal", 0);
}else{
	console.log(x);
}