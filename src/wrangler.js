/*
 * A wrangler file to retrieve oData and make it meaningful
 */

function _generatePerson(oResponse) {
  let oPerson = {
    gender: oResponse.faceAttributes.gender,
    age: oResponse.faceAttributes.age,
    emotions: oResponse.faceAttributes.emotion,
    feeling: _getEmotionValue(oResponse.faceAttributes.emotion)
  };

  return oPerson;
}

/**
 * data wrangler function
 * @param response array from faceapi
 */
function wrangle(aResponses) {
  // validate input
  if(!aResponses || !Array.isArray(aResponses) || aResponses.length === 0) {
    return null;
  }

  // def data structure
  // initialized with the first person
  let oData = {
    persons: [],
    time: (new Date()).getTime(),
    aggregatedAnalysis: {
      "anger": 0,
      "contempt": 0,
      "disgust": 0,
      "fear": 0,
      "happiness": 0,
      "neutral": 0,
      "sadness": 0,
      "surprise": 0
    }
  };
  // for any addtional person in the input, add the person and cumulate emotions
  for (let i = 0; i < aResponses.length; i++) {
    for (let key in oData.aggregatedAnalysis) {
      oData.aggregatedAnalysis[key] += aResponses[i].faceAttributes.emotion[key];
    }
    oData.persons.push(_generatePerson(aResponses[i]));
  }

  // calculate the average value for each emotion
  for (let key in oData.aggregatedAnalysis) {
    oData.aggregatedAnalysis[key] /= aResponses.length;
  }

  return oData;
}

/*
Sample oData - return value from wrangleNew()
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
function _getEmotionValue(oEmotion) {
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
  wrangle
};