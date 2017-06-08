
// Array of gifs
var topics = ['Celery Man', 'The Office', '30 Rock', 'Saul Goodman', 'Taxi Driver', 'Titus Andromedon', 'Ron Swanson'];

// Condition to add only 1 new button per click
$('#submit-search').on('click', function(){
	if(topics.indexOf($('#gif-search').val().trim()) === -1){
		topics.push($('#gif-search').val().trim());
		displayButtons();
	}
});

// Search for and display gifs
function displayNewGifs (){
// Build up the url with a gif term and a limit added to the search
var newGif = $(this).attr("data-name");
var limit = 10;
var gifUrl = 'https://api.giphy.com/v1/gifs/search?q=' + newGif + '&limit=' + limit + '&api_key=dc6zaTOxFJmzC';
$.ajax({
	url: gifUrl,
	method: "GET"
}).done(function(response){
	// Store ajax JSON results
	var results = response.data;
	// Clear GIF area before displaying newly searched GIFS
	$('#gif-dock').empty();
	// Loop over the results (Limit = 10)
	for(var i = 0; i < response.data.length; i++){
		

	// Create new div per gif
	// Create new image still per gif
	var newGifDiv = $('<div>');
	var newGifImage = $('<img src=' + response.data[i].images.fixed_height_still.url + '>');
	// Add class so I can monitor all gifs with later click event with animate on click option
	newGifImage.addClass('gif');
	// Animate on click switches image source from still to animated link based on these properties
	newGifImage.attr('data-still', response.data[i].images.fixed_height_still.url);
	newGifImage.attr('data-animate', response.data[i].images.fixed_height.url);
	newGifImage.attr('data-state', 'still');
	newGifDiv.append(newGifImage);
		// Add new gif to view gif area appending per result
	$('#gif-dock').append(newGifDiv);
	}
}); 
} 


// On gif click this function is run
function startStop(){
	// Current state determines click response
	var state = $(this).attr('data-state')
	// If still click will animate
	if (state === 'still'){
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');
	}
	// If animated click will switch to still
	else{
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');
	}
}

$(document).on('click', '.gif', startStop);
// Render buttons per wrestler in array
function displayButtons(){
	// Start by clearing buttons
	$('#gif-buttons').empty();
	// Rerender buttons per wrestler appending results
	for(var i in topics){
		var a = $('<button>');
		a.addClass('btn btn-primary btn-lg');
			a.attr("data-name", topics[i]);
			a.text(topics[i]);;
		$('#gif-buttons').append(a);
	}
}

// All buttons have a .btn class, so any one clicked will trigger
$(document).on('click', '.btn', displayNewGifs)
displayButtons();