// GIF TOPICS
// I HOPE THE UTTER WEIRDNESS OF THESE GIFS HELPS YOU MAKE IT THROUGH THE DAY
var topics = ['Celery Man', 'Eric Wareheim', 'PubLIZity', 'Hannibal Buress', 'Spagett', 'Tim Heidecker', 'Bird Up'];



// ADDS NEW GIF TOPIC TO ARRAY
$('#submit-search').on('click', function(){

	// PREVENTS PAGE FROM RELOADING WHEN
	// USER CLICKS SUBMIT BUTTON
  event.preventDefault();

  // PUTS USER INPUT FROM SEARCH FORM INTO A VARIABLE
  var newTopic = $('#gif-search').val().trim();

  // ADDS USER INPUT TO END OF ARRAY
  topics.push(newTopic);

  // CLEARS THE INPUT FIELD
  $('#gif-search').val('');

  // RESET BUTTONS
  renderButtons();

});


// RENDERS BUTTONS FOR ALL THE GIF TOPICS
// IN THE ARRAY
function renderButtons() {

	// CLEARS THE BUTTONS BEFORE WE APPEND THE NEW TOPIC
	// (SO THE ARRAY ISN'T DISPLAYED MORE THAN ONCE)
	$('#gif-buttons').empty();

	// LOOP THROUGH THE ARRAY
	for (i=0; i < topics.length; i++) {
		console.log(topics[i]);
		// CREATES BUTTONS WITH BOOTSTRAP CLASS
		var a = $("<button style='margin:5px' class='btn btn-primary btn-lg'>");
		// ADDS CLASS OF TOPICS TO USE AS JQUERY SELECTOR
		a.addClass('topics');
		// ADDS DATA ATTRIBUTE
		a.attr('data-name', topics[i]);
		// ADDS TEXT FROM THE ARRAY TO THE BUTTONS
		a.text(topics[i]);
		// APPENDS BUTTONS TO THE GIF-BUTTONS DIV
		$('#gif-buttons').append(a);
	}

}


// FUNCTION TO DISPLAY THE GIFS WHEN USER CLICKS
function displayGifs() {

	// GET THE GIF TOPIC FROM BUTTON
	var topic = $(this).attr('data-name');
	// STORE URL TO SEARCH TOPIC IN A VARIABLE
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=dc6zaTOxFJmzC&limit=12';

	// CLEARS THE GIF-DOCK DIV OF ANY GIFS
	$('#gif-dock').empty();

	// AJAX REQUEST TO THE GIPHY API
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		// USE A LOOP TO CREATE DIVS FOR THE 12 GIFS RETURNED FROM THE API
		for (i=0;i<response.data.length;i++) {

			// CREATE NEW DIV FOR GIFS IN VARIABLE
			var gifDiv = $("<div style='float:left;margin:5px'>");
			// CREATE VARIABLE FOR GIF RATING
			var gifRating = response.data[i].rating;
			console.log(gifRating);
			gifRating = gifRating.toUpperCase();
			// CREATE AND POPULATE <p> TO HOLD RATING
			var printRating = $('<p>').text('Rating: ' + gifRating);
			// APPEND RATING TO GIFDIV
			gifDiv.append(printRating);

			// GET DISPLAY IMAGE URLS FROM GIPHY API AJAX REQUEST
			// AND STORE THEM IN VARIABLES
			var imgURL = response.data[i].images.original.url;
			var imgURL_still = response.data[i].images.original_still.url;

			// CREATE IMAGE
			var imgGif = $("<img height='280px' width='280px' data-state='still' class='gif'>");
			imgGif.attr('src', imgURL_still);
			imgGif.attr('data-still', imgURL_still);
			imgGif.attr('data-animate', imgURL);
			// APPEND TO GIFDIV
			gifDiv.append(imgGif);

			// APPEND GIFDIV TO GIF-DOCK DIV ON PAGE
			$('#gif-dock').append(gifDiv);
		}

	});

}

// CREATE BUTTONS FROM TOPICS ARRAY UPON PAGE LOAD
renderButtons();

// ADD CLICK EVENT TO SHOW GIFS WHEN USER CLICKS A BUTTON
// WITH A CLASS OF 'TOPICS' WHICH WE ADDED BEFORE
$(document).on('click', '.topics', displayGifs);

// TOGGLE GIF ANIMATION WHEN USER CLICKS
$(document).on('click','.gif', function() {
	// CREATE VARIABLE TO STORE IMAGE STATE
	// (STILL OR ANIMATE)
	var state = $(this).attr('data-state');
	console.log(state);
	// CHECK IF IMAGE IS STILL
	if (state == 'still') {
		// IF SO CHANGE TO ANIMATE SRC AND SWITCH DATA-STATE
		// TO REFLECT CHANGES (FROM STILL TO ANIMATE)
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');

	} else {
		// CHANGE TO STILL SRC AND CHANGE DATA-STATE
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');

	}

});

