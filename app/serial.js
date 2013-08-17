

var BITRATE = 9600;

function writeSerial(port, message) {



	console.log('opening ', port)
	chrome.serial.open(port, {bitrate: BITRATE}, function(openInfo) {
		var connectionId = openInfo.connectionId;
		if (connectionId == -1) {
			console.error(openInfo)
		} else
		console.log(port, 'opened as ', connectionId)

		message = message.toUpperCase() + '\n';
		var buf = str2ab(message);

		console.log("sending: ", buf);

		chrome.serial.write(connectionId, buf, function(writeInfo) {
			console.log('Wrote', writeInfo.bytesWritten);
			chrome.serial.flush(connectionId, function() {
				chrome.serial.close(connectionId, function(result) {
					console.log(port, 'closed', result);
				});
			});
		});
	});

}


var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}
