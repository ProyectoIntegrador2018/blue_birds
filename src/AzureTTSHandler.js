/*global SpeechSDK*/
export default class AzureTTSHandler {
    static initializeSDK(){
        // status fields and start button in UI
        var phraseDiv;
        var startRecognizeOnceAsyncButton;

        // subscription key and region for speech services.
        var subscriptionKey, serviceRegion;
        var authorizationToken;
        var recognizer;


        startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
        subscriptionKey = document.getElementById("subscriptionKey");
        serviceRegion = document.getElementById("serviceRegion");
        phraseDiv = document.getElementById("phraseDiv");

        startRecognizeOnceAsyncButton.addEventListener("click", function () {
            startRecognizeOnceAsyncButton.disabled = true;
            phraseDiv.innerHTML = "";

            // if we got an authorization token, use the token. Otherwise use the provided subscription key
            var speechConfig;
            if (authorizationToken) {
                speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, serviceRegion.value);
            } else {
                if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
                    alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
                    return;
                }
                speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);
            }

            speechConfig.speechRecognitionLanguage = "en-US";
            var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
            console.log(recognizer);
            recognizer.recognizeOnceAsync(
                function (result) {
                    startRecognizeOnceAsyncButton.disabled = false;
                    phraseDiv.innerHTML += result.text;
                    console.log(result);

                    recognizer.close();
                    recognizer = undefined;
                },
                function (err) {
                    startRecognizeOnceAsyncButton.disabled = false;
                    phraseDiv.innerHTML += err;
                    console.log(err);

                    recognizer.close();
                    recognizer = undefined;
                });
        });

        if (!!SpeechSDK) {

            startRecognizeOnceAsyncButton.disabled = false;

            document.getElementById('content').style.display = 'block';
            document.getElementById('warning').style.display = 'none';
        }

    }
}