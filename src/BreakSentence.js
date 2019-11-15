/* This simple app uses the '/breaksentence' resource to identify the source
language and determines the number of characters in each sentence. */

const request = require('request');
const uuidv4 = require('uuid/v4');

var key_var = '58243708a0894f12b5a380ead62425e9'; 
if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
}
var subscriptionKey = process.env[key_var];
var endpoint_var = 'https://translatortextbb.cognitiveservices.azure.com/sts/v1.0/issuetoken';

if (!process.env[endpoint_var]) {
    throw new Error('Please set/export the following environment variable: ' + endpoint_var);
}
var endpoint = process.env[endpoint_var];
let phraseInput = document.getElementById("phraseInput");
let message = phraseInput.value;

function breakSentence(){
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'breaksentence',
        qs: {
          'api-version': '3.0',
        },
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        body: [{
              'text': message
        }],
        json: true,
    };

    request(options, function(err, res, body){
        console.log(JSON.stringify(body, null, 4));
    });
};

// Call the function to detect sentence length.
breakSentence();