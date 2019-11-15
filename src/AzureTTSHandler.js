// Gets an access token.
function getAccessToken(subscriptionKey, text, language) {
    var options = {
        method: 'POST',
        headers: {
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    };

    fetch('https://southcentralus.api.cognitive.microsoft.com/sts/v1.0/issueToken', options)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            console.log(data);
            textToSpeech(data, text, language);
        })
        .catch(function (err) {
            console.error(err);
        });
}

// Change Text to Speech
async function textToSpeech(accessToken, text, language) {
    var femaleName;
    if (language === "es-MX") {
        femaleName = "HildaRUS";
    } else {
        femaleName = "ZiraRUS";
    }
    const options = {
        method: 'POST',
        body: `<speak version='1.0' xml:lang='${language}'><voice xml:lang='${language}' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (${language}, ${femaleName})'>${text}</voice></speak>`,
        headers: {
            "Authorization": "Bearer " + accessToken,
            "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm",
            "Content-Type": "text/plain"
        }
    }
    fetch('https://speech.platform.bing.com/synthesize', options)
        .then(function (response) {
            console.log("response: ", response)
            return response.blob();
        })
        .then(function (data) {
            console.log("data: ", data)

            var url = window.URL.createObjectURL(data);
            window.audio = new Audio();
            window.audio.src = url;
            window.audio.play();

        })
        .catch(function (err) {
            console.log(err);
        });
    // console.log(speechFile);
}

export default class TextToSpeech {
    static initializeSpeech(text, language) {

        const subscriptionKey = process.env.REACT_APP_AZURE_KEY;
        if (!subscriptionKey) {
            throw new Error('Environment variable for your subscription key is not set.')
        };

        getAccessToken(subscriptionKey, text, language);
    }
}
