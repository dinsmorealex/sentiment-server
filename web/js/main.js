


var socket =  io({
	"reconnect" : true,
	"reconnection delay" : 500,
	"max reconnection attempts" : 10
}); 

	
var skin=0;
var story=0;




socket.on("welcome", function(msg) {
	console.log(msg);

});

socket.on("connect", function(data) {
	socket.emit("message", "Connected - " + data)

});

socket.on("message", function (data) {

	$('#search-box').text(data);

	
});

socket.on("data", function (data1,data2) {

	// console.log("the button is working");

	// appendData(data);
	console.log("story sentiment: " +data1);
	console.log("user sentiment: " +data2);
	story =data1;
	skin= data2;


});


socket.on("mood",function(data){

console.log("user sentiment: " + data);





// 	}


// 	else if (data="dislike"){
// 		 $("body").css("color", "#FFB3B3");
// 	}



// if (prevData!=data){
// 	$('#display').empty();
	


// }




})

socket.on("results",function(results){

	console.log("positive: "+results);
	
	news=results;


});


// var appendData = function(news){
// 	$('#display').empty();
	
// 	for(i=0; i<=news.length-1; i++){

// 		if (news[i]!='undefined'){
// 		var newElement = document.createElement('div');
// 		newElement.id = news; newElement.className = "head-line";
// 		newElement.innerHTML = news[i];
// 		$("#display").append("<div>"+(i+1)+".    "+news[i]+"</div>")
// 	}
// 	}

// 	news=[];

// // $('#data').text(news);


// };

console.log("story:  "+story +"skin:  "+skin);s
var s = function( p ) {

  
	// var yoff=0;
 //  var xPos = 1; 
    
 var xPos = 5; // horizontal position of the graph
    var oldHeartrateHeight = 0; 
     var oldStoryrateHeight = 0;

  p.setup = function() {
   var myCanvas= p.createCanvas(700, 400);
     
  myCanvas.parent('container');
  };

  p.draw = function() {

  	  var currentHeartrate = skin;
  	   var currentStoryrate = story;


  var heartrateHeight = p.map(currentHeartrate, 0, 15, 0, 400);
    p.stroke(0,255,0);
    p.strokeWeight(5);
    p.line(xPos - 5,(p.height/2)-oldHeartrateHeight, xPos, (p.height/2)-heartrateHeight);

    oldHeartrateHeight = heartrateHeight;

var storyrateHeight = p.map(currentStoryrate, 0, 200, 0, 375);
    p.stroke(0,255,255);
    p.strokeWeight(5);
    p.line(xPos - 5,(p.height/2)-oldStoryrateHeight, xPos, (p.height/2)-storyrateHeight);

    oldStoryrateHeight = storyrateHeight;

    if (xPos >= p.width) {
    xPos = 0;
    p.background(0);
    } else {

    xPos++;
   
    // p.background(51);

  //      var inByte = 0;
  //      var inByte2=0;
  
  //   inByte = p.map(skin, 0, 7, 0, p.height);
  //    inByte2 = p.map(story, -20, 20, 0, p.height);

  //   // draw the line:
  //   p.stroke(0, 250, 0,50);
  //   p.strokeWeight(25);

  // p.line(xPos, p.height, xPos, p.height - inByte);

  //  p.stroke(0, 0, 250,50);
  //  p.strokeWeight(25);
  // p.line(xPos, p.height, xPos, p.height - inByte2);

  // // at the edge of the screen, go back to the beginning:
  // if (xPos >= p.width) {
  //   xPos = 0;
  //   p.background(0);
  // } else {
  //   // increment the horizontal position:
  //   xPos++;
  
    
};
};
};

var myp5 = new p5(s);
