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

      //put result in the div
     $("#output").text(result);

     var resultString = document.getElementById("result");

     if (term.value == key) {
     	resultString.innerHTML = "Entering the word again won't get you anywhere.";
     }
     else if (result<=10) {
     	resultString.innerHTML = "Good!";
     	appendLink(term.value);//document.getElementById("links").innerHTML += "\n" + term.value;
     	setKey(term.value);
     }
     else {
     	resultString.innerHTML = "Not close enough.";
     }
  }

  });
}



var start = "cat";

var key = "cat";

var end = "man";

var getKey = function() {
	return key;
}

var setKey = function(term) {
	key = term;
}

var appendLink = function(term) {
	document.getElementById("links").innerHTML += "\n" + term;
}