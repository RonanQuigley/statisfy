export default class Tally {
    
    static tallyObjValue(obj, valueToTally) {
      let results = _initResultsObj();    
      for (let timeRange in obj) {
        let currentObj = obj[timeRange];
        let currentTally = _tallyValues(currentObj, valueToTally);
        let namedKeySigs = _nameKeySigs(currentTally);
        _formatResults(namedKeySigs, results, timeRange);
      }      
      // _countResults(results);    
      return results;
    }
  }

const tallyString = 'Tally';

var keySigs = {
  "C" : "C",
  "C#/Db" : "C#/Db",
  "D" : "D",
  "D#/Eb" : "D#/Eb",
  "E" : "E",
  "F" : "F",
  "F#/Gb" : "F#/Gb",
  "G" : "G",
  "G#/Ab" : "G#/Ab",
  "A" : "A",
  "A#/Bb" : "A#/Bb",
  "B" : "B"
};

function _initResultsObj(){
  return Object.keys(keySigs).map(k => {
    return {
      pitchClass : k, 
      fourWeeksTally: 0, 
      sixMonthsTally : 0, 
      allTimeTally : 0
    };
  })
}
  

function _numToPitchClass(num, keySigs) {
  num = parseInt(num, 10);
  switch (num) {
    case 0:
      return keySigs[num];
    case 1:
      return keySigs[num];
    case 2:
      return keySigs[num];
    case 3:
      return keySigs[num];
    case 4:
      return keySigs[num];
    case 5:
      return keySigs[num];
    case 6:
      return keySigs[num];
    case 7:
      return keySigs[num];
    case 8:
      return keySigs[num];
    case 9:
      return keySigs[num];
    case 10:
      return keySigs[num];
    case 11:
      return keySigs[num];
  }
}

function _tallyValues(arr, value) {
  // count the number of key signatures produced by spotify
  // from all of our tracks and return an array of objects
  return arr.reduce((obj, nextItem) => {
    obj[nextItem[value]] = (obj[nextItem[value]] || 0) + 1;
    return obj;
  }, {});
}

function _nameKeySigs(arr) {
  // convert the keys of tallied key sigs into a pitch class name
  return Object.keys(arr).map(k => {
    let pitchClass = _numToPitchClass(k, Object.keys(keySigs));
    return {
      pitchClass : pitchClass, 
      tally: arr[k]      
    };
  });  
}

function _formatResults(input, output, timeRange) {
  
  for(let outputKey in output){
    for(let inputKey in input){
      if(input[inputKey].pitchClass === output[outputKey].pitchClass){
        // initialise the property in current obj of output using the current 
        // time Range and assign the input key's tally to it i.e. 
        // for the pitch class of C allTimeTally = N, fourWeeksTally = N etc.        
        output[outputKey][timeRange + tallyString] = input[inputKey].tally;
      }
    }
  }
  // // produce the final output; an array of objects:
  // // each object uses a name:KEYSIG, value:TALLY convention
  // return Object.getOwnPropertyNames(keySigs).map(k => {
  //   let tally = 0;
  //   for (let element in obj) {
  //     if (k === obj[element].name) {
  //       tally = obj[element].tally;
  //       break;
  //     }
  //   }
  //   return {name: k, tally: tally};
  // });
}


// sanity check for debugging
function _countResults(results){
  let x = 0;
  let y = 0; 
  let z = 0;
  for(let i in results){
    x += results[i].fourWeeksTally;
    y += results[i].sixMonthsTally;
    z += results[i].allTimeTally;        
  }
  console.log(x + y + z);
}