// Gets an access token.
function getAccessToken(subscriptionKey, text, language) {
  var options = {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey
    }
  };

  fetch(
    "https://southcentralus.api.cognitive.microsoft.com/sts/v1.0/issueToken",
    options
  )
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      textToSpeech(data, text, language);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// Change Text to Speech
async function textToSpeech(accessToken, text, language) {
  var femaleName = language === "es-MX" ? "HildaRUS" : "ZiraRUS";
  const options = {
    method: "POST",
    body: `<speak version='1.0' xml:lang='${language}'><voice xml:lang='${language}' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (${language}, ${femaleName})'>${text}</voice></speak>`,
    headers: {
      Authorization: "Bearer " + accessToken,
      "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm",
      "Content-Type": "text/plain"
    }
  };
  fetch("https://speech.platform.bing.com/synthesize", options)
    .then(function(response) {
      return response.blob();
    })
    .then(function(data) {
      var url = window.URL.createObjectURL(data);
      window.audio = TextToSpeech.audioWindow;
      window.audio.src = url;
      window.audio.play();
    })
    .catch(function(err) {
      console.log(err);
    });
}

export default class TextToSpeech {
  static audioWindow = new Audio();
  static initializeSpeech(text, language) {
    if (window.audio !== undefined) {
      window.audio.pause();
    }
    const subscriptionKey = process.env.REACT_APP_AZURE_KEY;
    if (!subscriptionKey) {
      throw new Error(
        "Environment variable for your subscription key is not set."
      );
    }

    getAccessToken(subscriptionKey, text, language);
  }
}
