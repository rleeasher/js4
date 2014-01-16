

var metricButton = document.getElementById('metric-button');
var signupButton = document.getElementById('signup-button');
var onloadDate = Date.now();
var totalTime = 0;

var scrollPercentage = function(){

	var docHeight = document.documentElement.offsetHeight;
	var docNumerator = window.pageYOffset + window.innerHeight;
	return Math.round(10000 * (docNumerator/docHeight))/100
};

var totalScrolled = function() {

	var location = window.pageYOffset + window.innerHeight;
	return location;

};

var elapsedTime = function() {
	totalTime = Date.now()-onloadDate;
	console.log(onloadDate);
	console.log(Date.now());
	return totalTime;
};

var totalElapsedTime = function (){
	return Date.now()-onloadDate;
};



metricButton.addEventListener('click', function(){
	alert(scrollPercentage() + "% Viewed \n"
		+ totalScrolled() + "px Scrolled \n"
		+ totalTime + " ms elapsed time since button press \n"
		+ totalElapsedTime() + " total elapsed time in ms \n"
		);
},true);

signupButton.addEventListener('click', function(){elapsedTime();},true);
