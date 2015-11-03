var SerialPort  = require("serialport").SerialPort;
var portName = "/dev/cu.usbmodem1084281";
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

http.listen(9090);

console.log("server started on localhost:9090");

var io = require("socket.io").listen(http); // server listens for socket.io communication at port 8000
io.set("log level", 1); // disables debugging. this is optional. you may remove it if desired.

var sp = new SerialPort(portName, {
	baudrate: 9600
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
var searchArray =[];
var OAuth = require('OAuth');
var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'KmoSH0BilA7aIw1wdUp8BmD1v',
	'VVczMdocaFBzb2YYIDdoGheDvYUj2JNMg2u1oRPKwQnAu1S0tU',
	'1.0A',
	null,
	'HMAC-SHA1'
	);
oauth.get(
	'https://api.twitter.com/1.1/trends/place.json?id=23424977',
	'4061369650-g5G8U3g3t8lxeZxTqlsEHLS6uM6CsSrtTGtFy2Y', 
      //you can get it at dev.twitter.com for your own apps
      'Dvwb1emUUU5ppqjQWGKJ6AopbO1EMswDWW5cK4yHfNG2H', 
      //you can get it at dev.twitter.com for your own apps
      function (e, data, res){
      	if (e) console.error(e);        
        // console.log(require('util').inspect(data));
        var json =JSON.parse(data);
        var trending = json[0].trends;

        for (i =0; i< trending.length; i++){
        	var results = trending[i].name;

        			if (results.charAt(0)=='#'){
        			var res = results.slice(1,results.length);

        			searchArray.push(res);
        		} 

        				if (results.charAt(0)!='#'){
        			var stuff = results

        			searchArray.push(stuff);
        		} 


        }
        console.log(searchArray);
    }); 
var cleanData = ""; // this stores the clean data
var readData = "";  // this stores the buffer
var wordChoice = 0;
var prevWordChoice = 0;
var info= 0;
var mood=0;
var positive =[];
var negative =[];
var arrayToSend=[];

sp.on("data", function(data) { // call back when data is received

	//pot
	var chicken = data.toString();

	if (chicken.indexOf("A") >=0){
		var turkey = chicken.split("A")[1];
		var cow = turkey.split("B")[0];
		wordChoice = searchArray[cow]
		
		prevWordChoice = wordChoice;
		io.sockets.emit("message",wordChoice);

	}
	
	if(chicken.indexOf("Y")>=0){
		var goose = chicken.split("Y")[1];
		var decide = goose.split("Z")[0];
		
		console.log("on")
		console.log(prevWordChoice);
		searchAndDestroy(prevWordChoice);
			
	}
	if(chicken.indexOf("J")>=0){
		var burger= chicken.split("J")[1];
		var fries= burger.split("K")[0];	
		mood ="like";	
	}
	if(chicken.indexOf("Q")>=0){
		var grilled = chicken.split("Q")[1];
		var cheese = grilled.split("V")[0];
		mood ="dislike";
	}

	io.sockets.emit("mood",mood);

	// console.log(mood);
});


tweetsArray =[];
function searchAndDestroy(data){

	positive = [];
	negative = [];
	arrayToSend =[];


	console.log(colors.red("this is the search term: "+data));

	var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'9Dijf8axNPj8YtdvJecIoeboY',
	'b51IYppcwIwN2CGL0MC34M8SEGuCOjuSqgwfUl4urX28Xc8Iid',
	'1.0A',
	null,
	'HMAC-SHA1'
	);
	oauth.get(


		'https://api.twitter.com/1.1/search/tweets.json?q='+data,
		'4061369650-1H5CN5HxfTd8XL2o9dDT7xjWdne22TsqtI3QboU', 
      //you can get it at dev.twitter.com for your own apps
      'Y1sBSXJKOVNM93YU9UfMuXB9Z3lBqz7bh5TKZw8NP06WT', 
      //you can get it at dev.twitter.com for your own apps
      function (e, data, res){
      	if (e) console.error(e); 
        // console.log(require('util').inspect(data));
        var json =JSON.parse(data);
        var tweets=json.statuses;

        for (i=0; i<tweets.length; i++){
        	// console.log(i);
        	var results =tweets[i].text;
        	if (results !='undefined'){

        
        		tweetsArray.push(results);
        		// console.log (results);
        		

        		var feelings =sentiment(results);
        		console.log("positive words: "+feelings.positive);
        		console.log("negative words: "+feelings.negative);

        		var pos =feelings.positive.length;
        		var neg = feelings.negative.length;
        		console.log("number of positive words: "+pos);
        		console.log("number of negative words: "+neg);

        		if (pos >neg){
        			positive.push(results);
        			// console.log("new entry added to positive results");
        		}

        		else if(pos < neg){
        			negative.push(results);
        			// console.log("new entry added to negative results");
        		}
        		
        	}
        }

 
        if(mood=="like"){

        console.log("list of positive tweets: "+positive);
       	  	arrayToSend=positive;
       	  
       	  


        }

        if (mood=="dislike"){

        console.log("list of negative tweets: "+negative); 
        	arrayToSend=negative;
        	
        	    }


     io.sockets.emit("button", arrayToSend);	
// 			      
    }); 

	
}
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

