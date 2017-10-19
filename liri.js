var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);
var song = process.argv[3];
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'ash_crosswhite'};
var request = require("request");
var fs = require("fs");
var textFile = process.argv[3];

//commands my-tweets, spotify-this-song, movie-this, do-what-it-says

if (process.argv[2] === "spotify-this-song") {
	if (song === undefined) {
		song = "The Sign Ace Of Base";
	}
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
	    	console.log("Name: " + songInfo.name);
	    	console.log("Artist: " + songInfo.artists[0].name);
	    	console.log("Song Info: " + songInfo.album.name);
	    	console.log("URL: " + songInfo.preview_url);
	    	
	    }
	  })

	  )
 }
 else if (process.argv[2] === "my-tweets"){

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("found " + tweets.length + " tweets");
	  	for (var i = 0; i < Math.min(tweets.length, 20); i++) {
	  	console.log("Created: " + tweets[i].created_at);
	    console.log("Text: " + tweets[i].text);
		}
	  }
	  else {
	  	console.log("error retrieving tweets");
	  }
	});
}
else if (process.argv[2] === "movie-this"){
	var movieName = process.argv[3];
	// This line is just to help us debug against the actual URL.
	//console.log(queryUrl);

	if (movieName === undefined){
		movieName = "Mr Nobody";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + encodeURIComponent(movieName) + "&y=&plot=short&apikey=40e9cece";
	//console.log(queryUrl);


	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200){

			//console.log(JSON.parse(body));
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
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
//need to update into function where you have argument for argv2 and command is argv 3
//also look at switch statement
	});
}
else {
	console.log("not a valid entry please select: my-tweets, movie-this, spotify-this-song, or do-what-it-says")
}