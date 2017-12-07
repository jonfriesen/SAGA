
// https://docs.microsoft.com/en-us/azure/cognitive-services/Face/QuickStarts/JavaScript

const msApiKey = "e40530824cf348878e0ed2ecaa4754ee";
const msRegion = "westcentralus";

// Below are options for request:
// "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
const queryAttrs = ["emotion", "age", "gender"];
const queryParams = `returnFaceAttributes=${queryAttrs.join(",")}`;
// https://westcentralus.api.cognitive.microsoft.com/face/v1.0
const msUrl = `https://${msRegion}.api.cognitive.microsoft.com/face/v1.0/detect?${queryParams}`;


function makeAPICall(image) {
    const options = {
        method: "POST",
        body: image,
        headers: {
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": msApiKey
        }
    };

    return fetch(msUrl, options);
}

var AnalyzeImage = function (img) {
  return makeAPICall(img);
};

export {
    AnalyzeImage
}



// Sample response:
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