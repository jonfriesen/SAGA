/*
 * A wrangler file to retrieve oData and make it meaningful
 */

 let datapointgrid = [
        [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0], [5,0,0], [6,0,0], [7,0,0],
        [0,1,0], [1,1,0], [2,1,0], [3,1,0], [4,1,0], [5,1,0], [6,1,0], [7,1,0],
        [0,2,0], [1,2,0], [2,2,0], [3,2,0], [4,2,0], [5,2,0], [6,2,0], [7,2,0],
        [0,3,0], [1,3,0], [2,3,0], [3,3,0], [4,3,0], [5,3,0], [6,3,0], [7,3,0],
        [0,4,0], [1,4,0], [2,4,0], [3,4,0], [4,4,0], [5,4,0], [6,4,0], [7,4,0],
        [0,5,0], [1,5,0], [2,5,0], [3,5,0], [4,5,0], [5,5,0], [6,5,0], [7,5,0],
        [0,6,0], [1,6,0], [2,6,0], [3,6,0], [4,6,0], [5,6,0], [6,6,0], [7,6,0],
        [0,7,0], [1,7,0], [2,7,0], [3,7,0], [4,7,0], [5,7,0], [6,7,0], [7,7,0]
      ];
const oEmotionTable = {
  "anger": 0,
  "contempt": 1,
  "disgust": 2,
  "fear": 3,
  "happiness":4,
  "neutral": 5,
  "sadness": 6,
  "surprise": 7
};
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
 * @return object format is listed below
 *  {
 *    persons: [
 *      {
 *        gender: "male",
 *        age: 24,
 *        emotions: {
 *          "anger": 0,
 *          "contempt": 0,
 *          "disgust": 0,
 *          "fear": 0,
 *          "happiness": 0,
 *          "neutral": 0.986,
 *          "sadness": 0.009,
 *          "surprise": 0.005
 *        },
 *        feeling: "neutral"
 *      } // or more person objects
 *    ],
 *    time: 1512686380559,  // miliseconds
 *    aggregatedAnalysis: {
 *    "anger": 0,
 *      "contempt": 0,
 *      "disgust": 0,
 *      "fear": 0,
 *      "happiness": 0,
 *      "neutral": 0.986,
 *      "sadness": 0.009,
 *      "surprise": 0.005
 *    }
 *  }
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
    },
    heatmapdp: []
  };


  // for any addtional person in the input, add the person and cumulate emotions
  for (let i = 0; i < aResponses.length; i++) {
    for (let key in oData.aggregatedAnalysis) {
      oData.aggregatedAnalysis[key] += aResponses[i].faceAttributes.emotion[key];
    }
    oData.persons.push(_generatePerson(aResponses[i]));
    const iAge = aResponses[i].faceAttributes.age;
    const iAgeIndex = (iAge > 70) ? 7 : Math.floor(iAge % 10);
    const iEmotionIndex = oEmotionTable[_getEmotionValue(aResponses[i].faceAttributes.emotion)];
    datapointgrid[iAgeIndex * 8 + iEmotionIndex][2]++;
  }

  // calculate the average value for each emotion
  for (let key in oData.aggregatedAnalysis) {
    oData.aggregatedAnalysis[key] /= aResponses.length;
  }

  // update datapointgrid
  oData.heatmapdp = datapointgrid;

  return oData;
}

/*
Sample oData - return value from wrangleNew()


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