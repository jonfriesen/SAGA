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

// Sample aResponses:
/*
[
  {
    "faceId": "49d55c17-e018-4a42-ba7b-8cbbdfae7c6f",
    "faceRectangle": {
      "top": 131,
      "left": 177,
      "width": 162,
      "height": 162
    },
    "faceAttributes": {
      "smile": 0,
      "headPose": {
        "pitch": 0,
        "roll": 0.1,
        "yaw": -32.9
      },
      "gender": "female",
      "age": 22.9,
      "facialHair": {
        "moustache": 0,
        "beard": 0,
        "sideburns": 0
      },
      "glasses": "NoGlasses",
      "emotion": {
        "anger": 0,
        "contempt": 0,
        "disgust": 0,
        "fear": 0,
        "happiness": 0,
        "neutral": 0.986,
        "sadness": 0.009,
        "surprise": 0.005
      },
      "blur": {
        "blurLevel": "low",
        "value": 0.06
      },
      "exposure": {
        "exposureLevel": "goodExposure",
        "value": 0.67
      },
      "noise": {
        "noiseLevel": "low",
        "value": 0
      },
      "makeup": {
        "eyeMakeup": true,
        "lipMakeup": true
      },
      "accessories": [],
      "occlusion": {
        "foreheadOccluded": false,
        "eyeOccluded": false,
        "mouthOccluded": false
      },
      "hair": {
        "bald": 0,
        "invisible": false,
        "hairColor": [
          {
            "color": "brown",
            "confidence": 1
          },
          {
            "color": "black",
            "confidence": 0.87
          },
          {
            "color": "other",
            "confidence": 0.51
          },
          {
            "color": "blond",
            "confidence": 0.08
          },
          {
            "color": "red",
            "confidence": 0.08
          },
          {
            "color": "gray",
            "confidence": 0.02
          }
        ]
      }
    }
  }
]
*/

export {
  wrangle
};