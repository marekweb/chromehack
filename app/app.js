
var UPDATE_DELAY = 80;
var HEIGHT = 480;
var WIDTH = 640;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

$(document).ready(ready);

var videoElem, canvasElem, selectElem;

function ready() {

	selectElem = $('#select');
	videoElem =  document.getElementById('video');
	canvasElem = document.getElementById('canvas');

	$('#scanports').on('click', refreshPorts);
	$('#send').on('click', sendToSerial);
	refreshPorts();

	navigator.webkitGetUserMedia({video: true}, getUserMediaSuccess, getUserMediaError);

}

function getUserMediaError(e) {
	console.error(e);
}


function sendToSerial() {
	var message = $('#str').val();
	var port = $('#select').val();
	writeSerial(port, message);
}

function getUserMediaSuccess(localMediaStream) {


	// Get element

	videoElem.src = window.URL.createObjectURL(localMediaStream);
	videoElem.play();
	setInterval(update, UPDATE_DELAY);

}

function refreshPorts() {
	chrome.serial.getPorts(function(ports) {
		console.log(ports);
			//$('.top').html(ports.join());
			for (var i = 0; i < ports.length; i ++) {
				selectElem.append('<option value="' + ports[i] + '">' + ports[i] + '</option>')
			}

	});
}


function update() {
	var ctx = canvasElem.getContext('2d');

	ctx.drawImage(videoElem, 0, 0);

	process(canvasElem, function(result, fuzz1, fuzz2) {

		var start =  findStart(result);
		if (start == null) return;
		var codeCandidate = result.slice(start); // L plus one for stop code.
	
		// Now a start has been identified

		var digits = [];
		var string = [];
		var complete = false;
		var i = 0;
		while (1) {

			if (i*10 > codeCandidate.length) { console.log('ran out of lines'); break; }
			var c = testDigit(codeCandidate, i*10);

			if (c == null) { break; }
		
			if (c == '*' || c == '.') { // the stop codes
				complete = true;
				break;
			}
			i++;
			string.push(c);
		}
		if (complete && string.length > 0) {

			console.log('STR', string.join(''));
		}


	

	});

}

function testDigit(code, i) {
	var segment = code.slice(i, i+10).join('');
	return identifyDigit(segment);
}

function findStart(code) {
	for (var i = 0; i < code.length - 10; i++) {
		if (testDigit(code, i) == '*') return i+10;
	}
	return null;
}


