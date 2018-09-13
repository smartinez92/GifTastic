$(document).ready(function () {

	//Array of nintendo characters
	var topics = ["Mario", "Link", "Samus", "Kirby", "Fox McCloud"];
	var resultNum = 10;
  
	//Function to display gifs on page
	function displayGif() {
  
	  $('#gifs').empty();
  
	  var searchChar = $(this).attr("data-name");
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchChar + "&api_key=snkpgzzy24XfiY7U9yoYkU93dX0FMQJF";
  
  
	  console.log(searchChar);
	  console.log(searchChar);
  
	  //Ajax Call
	  $.ajax({
		url: queryURL,
		method: "GET"
	  }).then(function (response) {
  
		console.log(response);
  
		$("#gif-container").empty();
  
		for (var i = 0; i < resultNum; i++) {
  
		  console.log(response);
  
		  var newDiv = $("<div class='gif-box'>");
  
		  var newGif = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
  
		  newGif.attr("data-still", response.data[i].images.fixed_height_still.url);
		  newGif.attr("data-animate", response.data[i].images.fixed_height.url);
		  newGif.attr("data-state", "still");
		  newGif.addClass("gif");
  
		  var rating = response.data[i].rating;
  
		  var gifRating = $("<p>").text("Rating: " + rating)
  
		  newDiv.append(newGif);
		  newDiv.append(gifRating);
		  
  
		  $("#gif-container").prepend(newDiv);
  
  
		};
  
	  });
	}
  
  
	//Dynamic buttons created from items in array
	function createButtons() {
  
	  $("#gif-buttons").empty();
  
	  for (i = 0; i < topics.length; i++) {
  
		var newGif = $("<button>");
  
		newGif.addClass("btn btn-danger charButton");
  
		newGif.attr("data-name", topics[i]);
  
		newGif.text(topics[i]);
  
		$("#gif-buttons").append(newGif)
  
	  }
  
	}
  
	//Take user input and create dynamic button
	$("#add-gif").on("click", function () {
  
	  event.preventDefault();
  
	  var char = $("#char-input").val().trim();
  
	  topics.push(char);
  
	  createButtons();
  
	  $("form").trigger("reset");
  
	});
  
	//Function to animate gif on click
	function animateGif() {
  
	  var state = $(this).attr("data-state");
  
	  if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	  }
	  else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	  }
  
	};
  
	//Click listener for dynamic character buttons
	$(document).on("click", ".charButton", displayGif);
  
	//Click listener to animate gifs
	$(document).on("click", ".gif", animateGif);
  
	createButtons();
  });