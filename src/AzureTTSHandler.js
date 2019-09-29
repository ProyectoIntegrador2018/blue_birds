/*global SpeechSDK*/
export default class AzureTTSHandler {
  static SUBSCRIPTION_KEY = process.env.REACT_APP_AZURE_KEY;
  static REGION = "SouthCentralUS";

  static initializeVoiceRecognition(
    warningDivID,
    contentDivID,
    phraseDivID,
    startVoiceRecordingButtonID
  ) {
    // status fields and start button in UI
    var phraseDiv;
    var startRecognizeOnceAsyncButton;

    // subscription key and region for speech services.
    var subscriptionKey, serviceRegion;
    var authorizationToken;
    var recognizer;

    startRecognizeOnceAsyncButton = document.getElementById(
      startVoiceRecordingButtonID
    );
    subscriptionKey = AzureTTSHandler.SUBSCRIPTION_KEY;
    serviceRegion = AzureTTSHandler.REGION;
    phraseDiv = document.getElementById(phraseDivID);

    startRecognizeOnceAsyncButton.addEventListener("click", function() {
      startRecognizeOnceAsyncButton.disabled = true;
      phraseDiv.innerHTML = "";

      // if we got an authorization token, use the token. Otherwise use the provided subscription key
      var speechConfig;
      if (authorizationToken) {
        speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
          authorizationToken,
          serviceRegion
        );
      } else {
        if (
          subscriptionKey.value === "" ||
          subscriptionKey.value === "subscription"
        ) {
          alert(
            "Please enter your Microsoft Cognitive Services Speech subscription key!"
          );
          return;
        }
        speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
          subscriptionKey,
          serviceRegion
        );
      }

      speechConfig.speechRecognitionLanguage = "es-MX";
      var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
      recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
      console.log(recognizer);
      recognizer.recognizeOnceAsync(
        function(result) {
          startRecognizeOnceAsyncButton.disabled = false;
          phraseDiv.innerHTML += result.text;
          console.log(result);

          recognizer.close();
          recognizer = undefined;
        },
        function(err) {
          startRecognizeOnceAsyncButton.disabled = false;
          phraseDiv.innerHTML += err;
          console.log(err);

          recognizer.close();
          recognizer = undefined;
        }
      );
    });

    if (!!SpeechSDK) {
      startRecognizeOnceAsyncButton.disabled = false;

      document.getElementById(contentDivID).style.display = "block";
      document.getElementById(warningDivID).style.display = "none";
    }
  }
}
