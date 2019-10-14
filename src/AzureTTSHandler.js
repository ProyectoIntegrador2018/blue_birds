/*global SpeechSDK*/
export default class AzureTTSHandler {
  static SUBSCRIPTION_KEY = process.env.REACT_APP_AZURE_KEY;
  static REGION = "SouthCentralUS";

  static initializeVoiceRecognition(
    warningDivID,
    phraseInputID,
    startVoiceRecordingButtonID
  ) {
    // status fields and start button in UI
    var phraseInput;
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
    phraseInput = document.getElementById(phraseInputID);

    startRecognizeOnceAsyncButton.addEventListener("click", function() {
      startRecognizeOnceAsyncButton.disabled = true;
      startRecognizeOnceAsyncButton.style.backgroundColor = "red";
      phraseInput.value = "";

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

      recognizer.recognizeOnceAsync(
        function(result) {
          startRecognizeOnceAsyncButton.disabled = false;
          startRecognizeOnceAsyncButton.style.backgroundColor = "transparent";
          phraseInput.value += result.text;

          recognizer.close();
          recognizer = undefined;
        },
        function(err) {
          startRecognizeOnceAsyncButton.disabled = false;
          startRecognizeOnceAsyncButton.style.backgroundColor = "transparent";
          phraseInput.value += err;

          recognizer.close();
          recognizer = undefined;
        }
      );
    });

    if (!!SpeechSDK) {
      startRecognizeOnceAsyncButton.disabled = false;
      startRecognizeOnceAsyncButton.style.backgroundColor = "transparent";

      document.getElementById(warningDivID).style.display = "none";
    }
  }
}
