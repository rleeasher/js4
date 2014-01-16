var journals = document.getElementsByClassName('journal-content');
var titles = document.getElementsByClassName('journal-title');
var metricButton = document.getElementById('metric-button');
var signupButton = document.getElementById('signup-button');
var heatmapButton = document.getElementById('heatmap-button');
var graphButton = document.getElementById('graph-button');
var onloadDate = Date.now();
var totalTime = 0;


var scrollPercentage = function(){

	var docHeight = document.documentElement.offsetHeight;
	var docNumerator = window.pageYOffset + window.innerHeight;
	return Math.round(10000 * (docNumerator/docHeight)/100)
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

var totalElapsedTime = function(){
	return Date.now()-onloadDate;
};

//element time stuff
var elementTime = new Array();
var elementLastDate = new Array();
for (i=0; i<titles.length;i++){
	elementTime[i]=0;
};
for (i=0; i<titles.length;i++){
	elementLastDate[i]=Date.now();
};






for (i=0; i<titles.length; i++){
 	console.log(getPosition(titles[i]));
};



var yPosit = "";

for (i=0; i<titles.length; i++){
 	yPosit += "SEC "+(i+1)+" "+getPosition(titles[i]) + "<br>";
};







window.onscroll = function(){

	for (i=0; i<titles.length;i++){

		if (getPosition(titles[i])>window.pageYOffset && getPosition(titles[i]) < (window.pageYOffset+window.innerHeight)) {

			
			elementTime[i]+=(Date.now()-elementLastDate[i]);
			elementLastDate[i]=Date.now();
			console.log(elementTime[i]);
		}
		else{
			elementLastDate[i]=Date.now();
		}
	};

};

var visPercentage = "";
var graphText = ""

function createGraph(){
	for (i=0;i<titles.length;i++){
		graphText += "<div style=\"background:linear-gradient(to right, red, violet, blue);padding: 4px 0px 4px 5px;color: white; margin:1px; border-radius: 0 4px 4px 0; height:20px; width:"+(Math.round(elementTime[i]/totalElapsedTime()*100*2)+25)+
		"px\">"+ Math.round(elementTime[i]/totalElapsedTime()*100) +"%</div>";
	};
};


function getPercentage(){
	for (i=0;i<titles.length;i++){
		visPercentage += "Section "+(i+1)+" Viewed: " + Math.round(elementTime[i]/totalElapsedTime()*100) + "%<br>";
		console.log(visPercentage);
	};
};

//fixing this
function getPosition(ele) {
	var yloc = 0;

	while (ele !=null){
		yloc += ele.offsetTop;
		ele=ele.offsetParent;
	};

    // for (var yloc=0; ele != null; yloc += ele.offsetTop, ele = ele.offsetParent);
    return yloc;
};



signupButton.addEventListener('click', function(){elapsedTime();},true);

heatmapButton.addEventListener('click', function(){
		for (i=0;i<titles.length;i++){
			journals[i].style.backgroundColor= 'rgba('+[255,0,0,elementTime[i]/totalElapsedTime()].join(',') + ')';
		}
},true);

graphButton.addEventListener('click', function(){
			graphText = "";
			createGraph();
			console.log(graphText);
			document.getElementById('metrics-printout').innerHTML =
			"<div style=\"color:black;font-weight:bold;padding-bottom:4px;font-family:Verdana;font-size:16px\">Percent Viewed</div>" +
			graphText;
},true);


metricButton.addEventListener('click', function(){
		visPercentage="";
		getPercentage();

		document.getElementById('metrics-printout').innerHTML = 
		"<div style=\"color:black;font-weight:bold;padding-bottom:4px;font-family:Verdana;font-size:16px\">Metrics</div>" +
		 scrollPercentage() + "% scrolled <br>" 
		+ totalScrolled() + "px Scrolled <br>"
		+ totalTime + " ms elapsed Sign-Up<br>"
		+ totalElapsedTime() + " ms total elapsed<br>"
		+ visPercentage;

},true);
