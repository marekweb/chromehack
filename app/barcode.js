

function makeArray(len, val) {
  var result = [];
  for (var i = 0; i < len; i++) {
    result.push(val);
  }
  return result;
}

function getUserMediaError(e) {
  console.error(e);
}






var TOLERANCE = 0.7;
//TOLERANCE = TOLERANCE * (0.5 + Math.rand());
var  BAR_RATIO = 3; // the rato of fat to skinny bars.
function getValueAt(imageData, x, y ) {
  var index = (x + y * imageData.width) * 4;
  //console.log(index);
  var data = imageData.data;
  return (data[index] + data[index + 1] + data[index + 2]) / 3
}

function process(canvas, callback) {

  var ctx = canvas.getContext('2d');
  var scanH = 1;
  var scanW = WIDTH;
  var scanArea = ctx.getImageData(0, HEIGHT/2, scanW, scanH)
  
  var scan = Array(scanW);
  for (var x = 0; x < scanW; x ++) {
    scan[x] = getValueAt(scanArea, x, 0);
  }
  
  //console.log(scan);
 
  var min = 255;
  var max = 0
  for (var x = 0; x < scan.length; x++) {
    min = Math.min(min, scan[x]);
    max = Math.max(max, scan[x]);
  }
  var pivot = Math.floor((min + max) / 2);
  var fuzz1 = 1//(0.5 + Math.random());
  var fuzz2 = 1// (0.5 + Math.random());
  var fuzz3 = 1// (0.5 + Math.random());
  pivot *= fuzz1;
  
  
  // Convert into lines
  var lines = [];
  var last = 0;
  var run = 0;
  for (var x = 0; x < scan.length; x++) {
    var val = (scan[x] < pivot);
    run ++;
    if (val != last) {
      lines.push({value: val, length: run});
      run = 0;
      last = val;
    }
  }

  //console.log('lines obtained', lines.length)
  

  function isMatch(candidate, testLength) {
    return Math.abs(candidate - testLength) < (candidate * TOLERANCE * fuzz2);
  }
  
  // var candidates = [];
  // var longestCandidate = [];
  // for (var s = 0; s < lines.length; s++) {
  //   var candidate = findCandidate(lines, s);
  //   //var candidate = [];
  //   //console.log('candidate', candidate);

  //   if (candidate != null && candidate.length > longestCandidate.length) {
  //     longestCandidate = candidate;
  //   }
  // }

  var longestCandidate = findCandidate2(lines);
//  console.log(longestCandidate);


  function findCandidate(lines, s) {
   
    // s is starting index
    var result = [];
    var nState = -1;
    
    for (var i = 0; i < lines.length - s; i++) {

      var currentLine = lines[i + s];
      var nextLine = lines[i + s + 1];
      if (!nextLine) return null;
    
      var ratio = BAR_RATIO * fuzz3;
      var candidateDouble = currentLine.length * ratio;
      var candidateHalf = currentLine.length / ratio;
      var candidateSame = currentLine.length;

      var testLength = nextLine.length;
      var distanceToDouble = Math.abs(candidateDouble - testLength);
      var distanceToHalf = Math.abs(candidateHalf - testLength);
      var distanceToSame = Math.abs(candidateSame - testLength);

      
    //  console.log(distanceToDouble, distanceToSame, distanceToHalf);
      

      

      if (distanceToDouble < distanceToHalf && distanceToDouble < distanceToSame) {
        // Doubled, which was unexpected.
        if (nState == 1) return result; // we outta here.
        
        // Doubled, which was expected.
        else if (nState == 0) {
          nState = 1;
          result.push(0);
        }
        
        // Doubled, from unknown. Previous was n and now at 2n
        else if (nState == -1) {
          nState = 1;
          result = makeArray(i + 1, 0);
        }
      }
      else if (distanceToHalf < distanceToDouble && distanceToHalf < distanceToSame) {        // Halved, which was unexpected
        if (nState == 0) return result;
        
        // Halved, which was expected
        else if (nState == 1) {
          nState = 0;
          result.push(1);
        }
        
        // Halved from unknown
        else if (nState == -1) {
          nState = 0;
          result = makeArray(i + 1, 1); 
        }
         
      }
      
      else if (distanceToSame < distanceToDouble && distanceToSame < distanceToHalf) {
        if (nState == -1) {
          // keep probing
        } else {
          result.push(nState);
        }
      }
      else {

        return result; // it's done
      }
    }
    return result;
      
  }

  //console.log('', longestCandidate.join(''));
  if (callback) callback( longestCandidate, fuzz1, fuzz2 );
  //else document.getElementById('show').innerHTML = '&mdash;';

  var putData = ctx.createImageData(scanW, scanH);
  
  for (var i = 0; i < scan.length; i++) {
    var v = (scan[i] < pivot) * 255;
    //console.log(v);
    putData.data[i * 4 + 0] = v;
    putData.data[i * 4 + 1] = v;
    putData.data[i * 4 + 2] = v;
    putData.data[i * 4 + 3] = 255;
  }

  ctx.putImageData(putData, 0, HEIGHT/2);
   
}


function findCandidate2(lines) {
  // s is the offset where we should start looking

  var linePivot = 8 * Math.random();// median(lines); //4 worked well
  //console.log('PIVOT', linePivot);
  var result = [];

  for (var i = 0; i < lines.length; i++) {
    // For every line
    result.push(lines[i].length > linePivot ? '1' : '0');
  }
  return result;
}

function median(values) {
 
    values.slice().sort( function(a,b) {return a.length - b.length;} );
 
    var half = Math.floor(values.length/2);
 
    if(values.length % 2)
        return values[half].length;
    else
        return (values[half-1].length + values[half].length) / 2.0;
}