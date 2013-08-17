var express = require('express');
var app = express();

var resources = {};

resources['8FABC4'] = "http://crasstalk.com/wp-content/uploads/2012/03/funny-gifs-this-cat-is-hyped.gif";

app.get('/get', function(req, res){
  var resource = resources[req.query.id];

  if (!resource) return res.status(404);

  res.send(resource);

});

app.get('/set', function(req, res) {
	if (req.query.id == null && req.query.value == null) {
		
		return res.status(400);
	}
	resources[req.query.id] = req.query.value;
	res.send(req.query.value)
});


app.get('/all', function(req, res) {
	res.send(resources);
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on', port);