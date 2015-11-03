


var socket = io.connect("/", {
	"reconnect" : true,
	"reconnection delay" : 500,
	"max reconnection attempts" : 10
});

socket.on("welcome", function(msg) {
	console.log(msg);
});

socket.on("connect", function(data) {
	socket.emit("message", "Connected - " + data)

});

socket.on("message", function (data) {

	$('#search-box').text(data);
	
});

socket.on("button", function (data) {

	console.log("the button is working");

	appendData(data);
	console.log(data);
	data=[];

	
});

socket.on("mood",function(data){


var prevData=0;
	// $('#sentiment-container').text(data);

	if (data=="like"){
		 $("body").css("color", "#96E5FF");
	}


	else if (data="dislike"){
		 $("body").css("color", "#FF4141");
	}

prevData=data;

if (data!=prevData){
	appendData();

}


})

socket.on("results",function(results){

	console.log("positive: "+results);
	
	news=results;


});


var appendData = function(news){
	$('#display').empty();
	
	for(i=0; i<=news.length-1; i++){

		if (news[i]!='undefined'){
		var newElement = document.createElement('div');
		newElement.id = news; newElement.className = "head-line";
		newElement.innerHTML = news[i];
		$("#display").append("<div>"+(i+1)+".    "+news[i]+"</div>")
	}
	}

	news=[];

// $('#data').text(news);


};


				
		