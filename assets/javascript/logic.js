var listOfGifs = ['dragon', 'giant squid', 'wolf', 'panther', 'unicorn'];

function generatePics() {
	$('.gifDiv').empty();

	var gifName = $(this).attr('data-name');
	var apiLink = "https://api.giphy.com/v1/gifs/search?api_key=snkpgzzy24XfiY7U9yoYkU93dX0FMQJF&q=" + gifName + "&limit=10&offset=0&rating=G&lang=en";

	console.log(gifName);

	$.ajax({url: apiLink, method: 'GET'}).done(function(response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var gifAddDiv = $('<div class="gifAdd">');
			var theRating = response.data[i].rating;
			var rateAddParagraph = $("<p>").text("rating... " + theRating);

            gifAddDiv.append(rateAddParagraph);
                
            var gifPic = $("<img class='gif'>").attr("src", response.data[i].images.fixed_height.url);

            gifAddDiv.append(gifPic);

            $("#gifDiv").append(gifAddDiv);

            gifAddDiv.addClass("pics");
        }   
	});
};

function generateButtons () {
	$('.buttonsDiv').empty();

	for (var i = listOfGifs.length - 1; i >= 0; i--) {
		var addNewButton = $('<button>');
		addNewButton.addClass('gifAdd');
		addNewButton.attr('data-name', listOfGifs[i]);
		addNewButton.text(listOfGifs[i]);
		$('buttonsDiv').append(addNewButton);
	}
}

$('.submitGif').on('click', function() {
	var addedGif = $('.addPicInput').val().trim();

	listOfGifs.push(addedGif);

	generateButtons();

	return false;
});

$(document).on('click', 'gifAdd', generatePics);

generateButtons();