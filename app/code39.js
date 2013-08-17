
var code39 = {
	'*': '0100101000',
	'.': '0100101001',
	'0': tr('bwbWBwBwb'),
	'1': tr('BwbWbwbwB'),
	'2': tr('bwBWbwbwB'),
	'3': tr('BwBWbwbwb'),
	'4': tr('bwbWBwbwB'),
	'5': tr('BwbWBwbwb'),
	'6': tr('bwBWBwbwb'),
	'7': tr('bwbWbwBwB'),
	'8': tr('BwbWbwBwb'),
	'9': tr('bwBWbwBwb'),
	'A': tr('BwbwbWbwB'),
	'B': tr('bwBwbWbwB'),
	'C': tr('BwBwbWbwb'),
	'D': tr('bwbwBWbwB'),
	'E': tr('BwbwBWbwb'),
	'F': tr('bwBwBWbwb'),
	'G': tr('bwbwbWBwB'),
	'H': tr('BwbwbWBwb'),
	'I': tr('bwBwbWBwb'),
	'J': tr('bwbwBWBwb'),
	'K': tr('BwbwbwbWB'),
	'L': tr('bwBwbwbWB'),
	'M': tr('BwBwbwbWb'),
	'N': tr('bwbwBwbWB'),
	'O': tr('BwbwBwbWb'),
	'P': tr('bwBwBwbWb'),
	'Q': tr('bwbwbwBWB'),
	'R': tr('BwbwbwBWb'),
	'S': tr('bwBwbwBWb'),
	'T': tr('bwbwBwBWb'),
	'U': tr('BWbwbwbwB'),
	'V': tr('bWBwbwbwB'),
	'W': tr('BWBwbwbwb'),
	'X': tr('bWbwBwbwB'),
	'Y': tr('BWbwBwbwb'),
	'Z': tr('bWBwBwbwb')
};



function tr(input) {
	var result= '';
	for (var i = 0; i < input.length; i++) {
		var c = input.charAt(i);
		if (c.toUpperCase() == c) {
			result += '1';
		} else {
			result += '0';
		}
	}
	return result + '0';
};


function identifyDigit(s) {
	for (var k in code39) {
		if (code39[k] == s) return k;
	}

	return null;
}