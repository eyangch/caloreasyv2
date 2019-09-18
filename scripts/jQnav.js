var navbarhtml = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="index.html">Caloreasy v2</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nbmk" aria-controls="nbmk" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="nbmk">
		<div class="navbar-nav">
			<a class="nav-item nav-link" href="calorieTracker.html">Track Your Calories!</a>
		</div>
	</div>
</nav>
`
document.getElementById("nav").innerHTML = navbarhtml;