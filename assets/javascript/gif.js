// Gif Topics
// I Hope The Utter Weirdness of These Gifs Helps You Make It Through the Day
var topics = ['Celery Man', 'Eric Wareheim', 'PubLIZity', 'Hannibal Buress', 'Spagett', 'Tim Heidecker', 'Bird Up'];



// Adds New Gif Topic to Array
$('#submit-search').on('click', function(){

	// Prevents Page From Reloading When 
	// User Clicks Submit Button
  event.preventDefault();

  // Puts User Input From Search From into a Variable
  var newTopic = $('#gif-search').val().trim();

  // Adds User Input to End of Array
  topics.push(newTopic);

  // Clears the Input Field
  $('#gif-search').val('');

  // Reset buttons
  renderButtons();

});


// Renders Buttons for all the Gif Topics
// in the Array
function renderButtons() {

	// Clears the Buttons Before we Append the New Topic
	// (So the array isn't displayed more than once)
	$('#gif-buttons').empty();

	// Loop Through the Array
	for (i=0; i < topics.length; i++) {
		console.log(topics[i]);
		// Creates Buttons with Bootstrap Class
		var a = $("<button style='margin:5px' class='btn btn-primary btn-lg'>");
		// Adds Class of topics to use as jQuery Selector
		a.addClass('topics');
		// Adds Data Attribute
		a.attr('data-name', topics[i]);
		// AddS Text from the Array to the Buttons
		a.text(topics[i]);
		// Appends Buttons to the gif-buttons Div
		$('#gif-buttons').append(a);
	}

}


// Function to Display the Gifs When User Clicks
function displayGifs() {

	// Get The Gif Topic From Button
	var topic = $(this).attr('data-name');
	// Store URL to Search Topic in a Variable
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=dc6zaTOxFJmzC&limit=10';

	// Clears the gif-dock Div of Any Gifs
	$('#gif-dock').empty();

	// AJAX Request to the GIPHY API
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		// Use a Loop to Create Divs for the 10 Gifs Returned from the API
		for (i=0;i<response.data.length;i++) {

			// Create New Div for Gifs in Variable
			var gifDiv = $("<div style='float:left;margin:5px'>");
			// Create Variable for Gif Rating
			var gifRating = response.data[i].rating;
			console.log(gifRating);
			gifRating = gifRating.toUpperCase();
			// Create and Poputalte <p> to Hold Rating
			var printRating = $('<p>').text('Rating: ' + gifRating);
			// Append Rating to gifDiv
			gifDiv.append(printRating);

			// Get Display Image URLs From GIPHY API AJAX Request
			// and Store Them in Variables
			var imgURL = response.data[i].images.original.url;
			var imgURL_still = response.data[i].images.original_still.url;

			// Create Image
			var imgGif = $("<img height='280px' data-state='still' class='gif'>");
			imgGif.attr('src', imgURL_still);
			imgGif.attr('data-still', imgURL_still);
			imgGif.attr('data-animate', imgURL);
			//Append to gifDiv
			gifDiv.append(imgGif);

			// Append gifDiv to gif-dock Div on Page
			$('#gif-dock').append(gifDiv);
		}

	});

}

// Create Buttons From Topics Array Upon Page Load
renderButtons();

// Add Click Event to Show Gifa When User Click a Button
// with a Class of 'topics' Which We Added Before
$(document).on('click', '.topics', displayGifs);

// Toggle Gif Animation When User Clicks
$(document).on('click','.gif', function() {
	// Create Variable to Store Image State
	//(still or animate)
	var state = $(this).attr('data-state');
	console.log(state);
	// Check if Image is Still
	if (state == 'still') {
		// If So Change to Animate src and Switch data-state 
		// to reflect changes (from still to animate)
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');

	} else {
		// Change to Still src and change data-state
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');

	}

})

