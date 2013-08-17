var CHARSET = '0123456789ABCDEFGHIjKLMNOPQRSTUVWXYZ';

function makeCode(len) {
	var code = '';
	for (var i =0; i < len; i++) {
		code += CHARSET[Math.floor(Math.random()*CHARSET.length)];
	}
	return code;
}