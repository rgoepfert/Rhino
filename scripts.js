var printStart = function() {

	document.getElementById("start").innerHTML = "Find a link of words to go from " + start + " to " + end + ".";
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
     	resultString.innerHTML = "Entering the word again won't get you anywhere.";
     }
     else if (result<=DISTANCE) {
     	resultString.innerHTML = "Good!";
     	appendLink(term.value);//document.getElementById("links").innerHTML += "\n" + term.value;
     	setKey(term.value);
     	if (key == end) {
     		resultString.innerHTML = "You did it!"
     		enable = false;
     		return;
     	}
     	increaseLinkLength();

     }
     else {
     	resultString.innerHTML = "Not close enough.";
     }
  }

  });
}

var DISTANCE = 30;

var linkLength = 0;

var start = "cat";

var key = "cat";

var end = "man";

var enable = true;

var getKey = function() {
	return key;
}

var setKey = function(term) {
	key = term;
}

var appendLink = function(term) {
	document.getElementById("links").innerHTML += "\n" + term;
}

var increaseLinkLength = function() {
	linkLength++;
	document.getElementById("numLinks").innerHTML = "Number of Links: " + linkLength;
}