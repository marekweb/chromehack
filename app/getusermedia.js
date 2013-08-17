
var UPDATE_DELAY = 400;
var HEIGHT = 480;
var WIDTH = 640;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

$(document).ready(ready);

function ready() {
	navigator.webkitGetUserMedia({video: true}, getUserMediaSuccess, getUserMediaError);
}

function getUserMediaError(e) {
	console.error(e);
}

var videoElem, canvasElem;


function getUserMediaSuccess(localMediaStream) {

	$('#prompt').hide();

	// Get element
	videoElem = document.getElementById('video');
	canvasElem = document.getElementById('canvas');

	videoElem.src = window.URL.createObjectURL(localMediaStream);

	video.play();

	chrome.serial.getPorts(function(ports) {
		console.log(ports);
			$('.top').html(ports.join());

	});


	setInterval(update, UPDATE_DELAY);

}


function update() {
	var ctx = canvasElem.getContext('2d');

	ctx.drawImage(videoElem, 0, 0);

}