var keys = {
  article_search: 'API_KEY',
  best_sellers: 'API_KEY',
  campaign_finance: 'API_KEY',
  community: 'API_KEY',
  congress: 'API_KEY',
  districts: 'API_KEY',
  event_listings: 'API_KEY',
  geo: 'API_KEY',
  most_popular: 'e88654c24cc627725acaf44bbe69e734:1:66163683',
  movie_reviews: 'API_KEY',
  real_estate: 'API_KEY',
  semantic: 'API_KEY',
  times_newswire: 'API_KEY',
  timestags: 'API_KEY'
};


var SerialPort  = require("serialport").SerialPort;
var portName = "/dev/cu.usbmodem1205991";
var fs = require("fs");
var url = require("url");
// var words = require("an-array-of-english-words")
var request =require('request');
var http = require('http');
var requestify = require('requestify');
var sentiment = require('sentiment');
var colors = require('colors');
var root = "web";
var http = require("http").createServer(handle);
var nyt = require('newyorktimes')(keys);

function handle (req, res) {
	var request = url.parse(req.url, false);
	console.log("Serving request: " + request.pathname);
	var filename = request.pathname;
	
	if(filename == "/") { filename = "/index.html"; }
	
	filename = root + filename;

	try {
		fs.realpathSync(filename);
	} catch (e) {
		res.writeHead(404);
		res.end();
	}

	var contentType = "text/plain";

	if (filename.match(".js$")) {
		contentType = "text/javascript";
	} else if (filename.match(".html$")) {
		contentType = "text/html";
	}

	fs.readFile(filename, function(err, data) {
		if (err) {
			res.writeHead(500);
			res.end();
			return;
		}

		res.writeHead(200, {"Content-Type": contentType});
		res.write(data);
		res.end();
	});	
}

http.listen(3030);

console.log("server started on localhost:3030");

var io = require("socket.io").listen(http) // server listens for socket.io communication at port 8000
// io.set("log level", 1); // disables debugging. this is optional. you may remove it if desired.

var sp = new SerialPort(portName, {
	baudrate: 9600,

	dataBits: 8, 
	parity: 'none', 
	stopBits: 1, 
	flowControl: false ,
	// look for return and newline at the end of each data packet:
	// parser: serialport.parsers.readline("\r\n")
}); // instantiate the serial port.

sp.on("close", function (err) {
	console.log("port closed");
});

sp.on("error", function (err) {
	console.error("error", err);
});

sp.on("open", function () {
	console.log("port opened... Press reset on the Arduino.");
});

io.sockets.on("connection", function (socket) {
    // If socket.io receives message from the client browser then 
    // this call back will be executed.    
    socket.on("message", function (msg) {
    	console.log(msg);
    });
    socket.on("button", function (msg) {
    	console.log(msg);
    });
    socket.on("results", function (pos,neg,neu) {
    	console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on("disconnect", function () {
    	console.log("disconnected");
    }); 
});

// var nytKey = 'e88654c24cc627725acaf44bbe69e734:1:66163683';
// "http://api.nytimes.com/svc/topstories/v1/{section}.{response-format}?api-key="+nytKey;


var searchArray =[];
var sentimentArray=[];
// var superBadArray= [];
// var badArray=[];
// var mehArray=[];
// var goodArray =[];
// var superGoodArray= [];
var nytKey = 'e88654c24cc627725acaf44bbe69e734:1:66163683';

nyt.query("http://api.nytimes.com/svc/topstories/v1/world.json?api-key="+nytKey, function (err, json) {
  var object =JSON.parse(json.body);
  // console.log(object);
  var hits = object.results;
  // console.log(hits);

  for(i=0; i<hits.length; i++){
var dave =hits[i];
 // console.log(dave)
var fred= dave.title;
var ted = dave.abstract
console.log(fred);
searchArray.push(fred);

var feelings= sentiment(ted);
var rate= feelings.score;

sentimentArray.push(rate);



  }


     
        // console.log(searchArray);
         io.sockets.emit("message",searchArray);
    }); 
var cleanData = ""; // this stores the clean data
var readData = "";  // this stores the buffer
var wordChoice = 0;
var userFeeling =0;
var skin = 0;
var prevWordChoice = 0;
var info= 0;
var mood=0;


sp.on("data", function(data) { // call back when data is received

	//pot
	var chicken = data.toString();

	// console.log(searchArray);


//select
	if (chicken.indexOf("A") >=0){
		var turkey = chicken.split("A")[1];
		

		var cow = turkey.split("B")[0];

		 wordChoice = searchArray[cow];
		 userFeeling = sentimentArray[cow];

		
		

		io.sockets.emit("message",wordChoice);

		// searchAndDestroy(wordChoice);


	}

	//pulse

	if(chicken.indexOf("Y")>=0){
		var goose = chicken.split("Y")[1];

		var decide = goose.split("Z")[0];

		skin = decide;
		
	}
io.sockets.emit("data", userFeeling,skin);
	sp.write("%"+userFeeling);
	console.log("STORY:  "+wordChoice);
	console.log("STORY SENTIMENT: "+userFeeling);
	console.log("USER SENTIMENT:  "+skin);

 // io.sockets.emit("mood",skin);
	// if (chicken.indexOf("B") >=0){
	// 	var turkey = chicken.split("B")[1];
	// 	var cow = turkey.split("Z")[0];
			

	// 		if (cow<10){
	// 			var item = superGoodArray[Math.floor(Math.random()*superGoodArray.length)];
	// 			console.log(cow);
	// 			console.log(item);
	// 			sp.write("%100");

	// 		}

	// 		if (cow >0 || cow < 5){
	// 			var item = badArray[Math.floor(Math.random()*badArray.length)];
	// 			console.log(cow);
	// 			console.log(item);
	// 			sp.write("%200");
	// 		}

	// 		if(cow> 5||cow<10){
	// 			var item = superBadArray[Math.floor(Math.random()*superBadArray.length)];
	// 			console.log(cow);
	// 			console.log(item);
	// 			sp.write("%300");
	// 		}
		// wordChoice = searchArray[cow]
		// console.log(wordChoice);
		// prevWordChoice = wordChoice;
		//  io.sockets.emit("message",wordChoice);

	// }
	
	// if(chicken.indexOf("Y")>=0){
	// 	var goose = chicken.split("Y")[1];
	// 	var decide = goose.split("Z")[0];
		
	// 	console.log("on")
	// 	console.log(prevWordChoice);
	// 	// searchAndDestroy(prevWordChoice);
			
	// }
	// if(chicken.indexOf("J")>=0){
	// 	var burger= chicken.split("J")[1];
	// 	var fries= burger.split("K")[0];	
	// 	mood ="like";	
	// }
	// if(chicken.indexOf("Q")>=0){
	// 	var grilled = chicken.split("Q")[1];
	// 	var cheese = grilled.split("V")[0];
	// 	mood ="dislike";
	// }

	// io.sockets.emit("mood",mood);

	// console.log(mood);
});


tweetsArray =[];
// function searchAndDestroy(data){

// 	positive = [];
// 	negative = [];
// 	arrayToSend =[];


// 	console.log(colors.red("this is the search term: "+data));

// 	var oauth = new OAuth.OAuth(
// 	'https://api.twitter.com/oauth/request_token',
// 	'https://api.twitter.com/oauth/access_token',
// 	'9Dijf8axNPj8YtdvJecIoeboY',
// 	'b51IYppcwIwN2CGL0MC34M8SEGuCOjuSqgwfUl4urX28Xc8Iid',
// 	'1.0A',
// 	null,
// 	'HMAC-SHA1'
// 	);
// 	oauth.get(


// 		'https://api.twitter.com/1.1/search/tweets.json?q='+data,
// 		'4061369650-1H5CN5HxfTd8XL2o9dDT7xjWdne22TsqtI3QboU', 
//       //you can get it at dev.twitter.com for your own apps
//       'Y1sBSXJKOVNM93YU9UfMuXB9Z3lBqz7bh5TKZw8NP06WT', 
//       //you can get it at dev.twitter.com for your own apps
//       function (e, data, res){
//       	if (e) console.error(e); 
//         // console.log(require('util').inspect(data));
//         var json =JSON.parse(data);
//         var tweets=json.statuses;

//         for (i=0; i<tweets.length; i++){
//         	// console.log(i);
//         	var results =tweets[i].text;
//         	if (results !='undefined'){

        
//         		tweetsArray.push(results);
//         		// console.log (results);
        		

//         		var feelings =sentiment(results);
//         		console.log("positive words: "+feelings.positive);
//         		console.log("negative words: "+feelings.negative);

//         		var pos =feelings.positive.length;
//         		var neg = feelings.negative.length;
//         		console.log("number of positive words: "+pos);
//         		console.log("number of negative words: "+neg);

//         		if (pos >neg){
//         			positive.push(results);
//         			// console.log("new entry added to positive results");
//         		}

//         		else if(pos < neg){
//         			negative.push(results);
//         			// console.log("new entry added to negative results");
//         		}
        		
//         	}
//         }

 
//         if(mood=="like"){

//         console.log("list of positive tweets: "+positive);
//        	  	arrayToSend=positive;
       	  
       	  


//         }

//         if (mood=="dislike"){

//         console.log("list of negative tweets: "+negative); 
//         	arrayToSend=negative;
        	
//         	    }


//      io.sockets.emit("button", arrayToSend);	
// // 			      
//     }); 

	
// }
// function searchAndDestroy(searchTerm){
// 	console.log(colors.red("search term: "+searchTerm));

// requestify.get("http://www.reddit.com/search.json?q="+searchTerm)
//   .then(function(response) {

	
//       // Get the response body (JSON parsed or jQuery object for XMLs)
//       var hits = response.getBody().data.children;

//     console.log ("total results: "+hits.length)

//       for(i=0;i<=hits.length;i++){
//       	var results = hits[i].data.selftext;
//       	var title = hits[i].data.title;
//       	console.log(title);

//       	var feelings =sentiment(results);
//       	console.log("positive words: "+feelings.positive);

//       	console.log("negative words: "+feelings.negative);

//   		var pos =feelings.positive.length;
//   		var neg = feelings.negative.length;
//   		console.log("number of positive words: "+pos);
//   		console.log("number of negative words: "+neg);

//   		if (pos >neg){
//   			positive.push(title);
//   			console.log("new entry added to positive results");
//   		}

//   		else if(pos < neg){
//   			negative.push(title);
//   			console.log("new entry added to negative results");
//   		}
//   		else{
//   			neutral.push(title)
//   			console.log('new entry add to neutral list');
//   		}
//       }
//   });
//   		    console.log(colors.red("positive: "+positive.length)+colors.blue(" negative: "+negative.length)+colors.yellow(" neutral: "+neutral.length));
//   		  	io.sockets.emit("results",positive, negative, neutral);
//   		


// }

