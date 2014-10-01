var printStart = function() {

	document.getElementById("start").innerHTML = "Find a link of words to go from " + "'" + start +  "'" + " to " +  "'" + end +  "'" + ".";
}

var getDist = function(term) { //prints out the distance between two terms
	 $.ajax({						//key=start term, term=guess/input
    	type: "GET",
    	url: "http://api.rhine.io:8080/sdf0b913e4b07b5243b7f527/distance/"+key+"/"+term.value,
    	success: function(data) {
      	console.log(data);
      	result=data['distance'];


     var resultString = document.getElementById("result");
     /*if (result == "NaN") {
     	resultString.innerHTML = "Not related."
     }*/
     console.log(result);
     if (term.value == key) {
     	resultString.innerHTML = "Entering the same word won't get you anywhere.";
     }
     else if (result<=DISTANCE) {
     	resultString.innerHTML = "Good!";
     	appendLink(term.value);//document.getElementById("links").innerHTML += "\n" + term.value;
     	setKey(term.value);
     	if (key == end) {
     		resultString.innerHTML = "You did it!"
     		if (getHighScore() == "None")
     			setHighScore(linkLength);
     		else if (linkLength<getHighScore())
     			setHighScore(linkLength);
     		enable = false;
     		return;
     	}
     	increaseLinkLength();

     }
     else {
     	resultString.innerHTML = "The term " + "'" + term.value + "'" + " is not close enough.";
     }
  }, error: function() {
 		document.getElementById("result").innerHTML = "The term " + "'" + term.value + "'" + " is not related to " + "'" + key + "'" + ".";
  }


  });
}

var DISTANCE = 30;

var linkLength = 0;

var start = "cat";

var key = start;

var end = "man";

var enable = true;

var list = [
	"banana",
	"War World Two",
	"crater",
	"moon",
	"England",
	"Chuck Norris",
	"opera",
	"Oprah Winfrey",
	"time",
	"We Will Rock You"
];

var getKey = function() {
	return key;
}

var setKey = function(term) {
	key = term;
}

var appendLink = function(term) {
	document.getElementById("links").innerHTML += "\n" + "'" + term + "'";
}

var increaseLinkLength = function() {
	linkLength++;
	displayLinkLength();
}

var displayLinkLength = function() {
	document.getElementById("numLinks").innerHTML = "Number of Links: " + "<br>" + linkLength;
}

var setHighScore = function(value) {
	localStorage.setItem("highScore"+start+end, value);
	displayHighScore();
}

var getHighScore = function() {
	if (localStorage.getItem("highScore"+start+end) == null) //String(getWords())) == null)
		localStorage.setItem("highScore"+start+end, "None"); //(getWords()), "None");
	return localStorage.getItem("highScore"+start+end); //getWords());
}

var clearHighScore = function() {
	localStorage.setItem("highScore"+start+end, "None");
	displayHighScore();
}

var displayHighScore = function() {
	document.getElementById("high").innerHTML = "High Score: " + "<br>" + getHighScore();
}

var setup = function() {
	//if (getWords()!=-1)
	changeWords();
	appendLink(getKey());
	displayHighScore();
	displayLinkLength();
	printStart();
}

var setRandomWords = function() {
	localStorage.setItem("words", -1);
	location.reload();
}

var getWords = function() {
	return parseInt(localStorage.getItem("words"));
}

var cycleWords = function() {
	//var words = parseInt(localStorage.getItem("words"));
	localStorage.setItem("words", (getWords()+1)%4);
	//words = (words+1)%3;
	changeWords();
	console.log("it did the thing");
	location.reload();
}

var randomWord = function() {
	return list[Math.floor(Math.random()*10)];
}

var changeWords = function() {
	//var words = parseInt(localStorage.getItem("words"));
	if (localStorage.getItem("words")==null) {
		localStorage.setItem("words", "0");
	}
	if (getWords()==-1) {
		var a = "";
		var b = "";
		while (a==b) {
			a = randomWord();
			b = randomWord();
		}
		console.log(a);
		console.log(b);
		start = a;
		key = start;
		end = b;
		//localStorage.setItem("words", "-1");//randomSetup();
	}
	if (getWords()==0) {
		start = "cat";
		key = start;
		end = "man";
	}
	if (getWords()==1) {
		start = "hackathon";
		key = start;
		end = "Cornell";
	}
	if (getWords()==2) {
		start = "statistic";
		key = start;
		end = "orange";
	
	}
	if (getWords()==3) {
		start = "Abraham Lincoln";
		key = start;
		end = "Steve Jobs";
	}
}

var reset = function() {
	location.reload();
}

var list = [
	"banana",
	"World War II",
	"crater",
	"moon",
	"England",
	"Chuck Norris",
	"opera",
	"Barak Obama",
	"clock",
	"We Will Rock You"
];


/*
var randomSetup = function() {
	var a;
	var b;
	while (a==b) {
		a = randomWord();
		b = randomWord();
	}
	console.log(a);
	console.log(b);
	start = a;
	key = start;
	end = b;
	localStorage.setItem("words", "-1");
	reset();
}
*/