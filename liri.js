var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);
var song = process.argv[3];
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'ash_crosswhite'};
var movieName = encodeURIComponent(process.argv[3]);
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
var request = require("request");
var fs = require("fs");
var textFile = process.argv[3];

//commands my-tweets, spotify-this-song, movie-this, do-what-it-says

if (process.argv[2] === "spotify-this-song") {
	spotify
	  .search({ 
	  	type: 'track', 
	  	query: song 
	  }, (function(err, response) {
	  	if(err){
	  		console.log("error");
	  	}
	    else {
	    	var songInfo = response.tracks.items[0];
	    	console.log(songInfo.name);
	    	console.log(songInfo.artists[0].name);
	    	console.log(songInfo.album.name);
	    	console.log(songInfo.preview_url);
	    	
	    }
	  })
	  )
 }
 else if (process.argv[2] === "my-tweets"){

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < 20; i++) {
	    console.log(tweets[i]);
		}
	  }
	  else {
	  	console.log("error retrieving tweets");
	  }
	});
}
else if (process.argv[2] === "movie-this"){

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);


	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200){

			//console.log(JSON.parse(body));
			console.log(JSON.parse(body).Title);
			console.log(JSON.parse(body).Year);
			console.log("IMDB: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
			console.log(JSON.parse(body).Country);
			console.log(JSON.parse(body).Language);
			console.log(JSON.parse(body).Plot);
			console.log(JSON.parse(body).Actors);
		}
	});

}

else if (process.argv[2] === "do-what-it-says"){
	//fs node package to run text in random.txt
	fs.readFile("random.txt", "utf8", function(error, data) {

	  if (error) {
	    return console.log(error);
	  }

	  console.log(data);

	  var dataArr = data.split(",");

	  console.log(dataArr);

	});
}
else {
	console.log("not a valid entry please select: my-tweets, movie-this, spotify-this-song, or do-what-it-says")
}