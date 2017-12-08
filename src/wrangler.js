/*
 * A wrangler file to retrieve data and make it meaningful
 */

// Do magic
function wrangle(aResponses) {
  var aMagic = [];
  const iTimeStamp = (new Date()).getTime();

  for (var i = 0; i < aResponses.length; i++) {
    let sGender = aResponses[i].faceAttributes.gender;
    let iAge = aResponses[i].faceAttributes.age;
    let oEmotion = aResponses[i].faceAttributes.emotion;
    let sEmotion = getEmotionValue(aResponses[i].faceAttributes.emotion);

    let oPerson = {
      gender: sGender,
      age: iAge,
      emotions: oEmotion,
      feeling: sEmotion,
      time: iTimeStamp
    };

    aMagic.push(oPerson);
  }

  return aMagic;
}

/**
 * data wrangler function
 * @param response array from faceapi 
 */ 
function wrangleNew(aResponses) {
  if(!aResponses || !Array.isArray(aResponses) || aResponses.length === 0) {
    return null;
  }
  let data = {
    aggregatedAnalysis: aResponses[0].faceAttributes.emotion,
    time: (new Date()).getTime(),
    persons: []
  }
  if(aResponses.length === 1) {
    data.persons.push({
      gender: aResponses[0].faceAttributes.gender,
      age: aResponses[0].faceAttributes.age,
      emotions: aResponses[0].faceAttributes.emotion,
      feeling: getEmotionValue(aResponses[0].faceAttributes.emotion)
    })
  } else {
    for (var i = 0; i < aResponses.length; i++) {
      let oPerson = {
        gender: aResponses[i].faceAttributes.gender,
        age: aResponses[i].faceAttributes.age,
        emotions: aResponses[i].faceAttributes.emotion,
        feeling: getEmotionValue(aResponses[i].faceAttributes.emotion)
      };
      if(i > 0) {
        for(let key in data.aggregatedAnalysis){
          data.aggregatedAnalysis[key] += aResponses[i].faceAttributes.emotion[key];
        }
      }
      data.persons.push(oPerson);
    }
    for(let key in data.aggregatedAnalysis){
        data.aggregatedAnalysis[key] /= aResponses.length;
    }
  }
  return data;
}

/*
Sample data - return value from wrangleNew()
{
  aggregatedAnalysis: {

  },
  persons: [
    {
      gender: "male",
      age: 24,
      emotions: {
        "anger": 0,
        "contempt": 0,
        "disgust": 0,
        "fear": 0,
        "happiness": 0,
        "neutral": 0.986,
        "sadness": 0.009,
        "surprise": 0.005
      },
      feeling: "neutral"
    } // or more person objects
  ],
  time: 1512686380559  // miliseconds
}

*/

/**
 * get the most emotion as a string
 * @param oEmotion object is the emotion part of the response
 */
function getEmotionValue(oEmotion) {
  let sEmotion = '',
    iMaxEmotionValue = 0;
  for (let key in oEmotion) {
    if (oEmotion[key] > iMaxEmotionValue) {
      sEmotion = key;
      iMaxEmotionValue = oEmotion[key];
    }
  }
  return sEmotion;
}

export {
  wrangle,
  wrangleNew
};