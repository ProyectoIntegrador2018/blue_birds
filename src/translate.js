/* This simple app uses the '/translate' resource to translate text from
one language to another. */

const request = require('request');
const uuidv4 = require('uuid/v4');

// var key_var = 'TRANSLATE_API_KEY';
// if (!process.env[key_var]) {
//     throw new Error('Please set/export the following environment variable: ' + key_var);
// }
// var subscriptionKey = process.env[key_var];
var subscriptionKey = '58243708a0894f12b5a380ead62425e9';
// var endpoint_var = 'TRANSLATION_ENDPOINT';
// if (!process.env[endpoint_var]) {
//     throw new Error('Please set/export the following environment variable: ' + endpoint_var);
// }
// var endpoint = process.env[endpoint_var];
var endpoint = 'https://api.cognitive.microsofttranslator.com/';

export default function translateText(languageTo, callback) {
    let phraseInput = document.getElementById("phraseInput");
    let message = phraseInput.value;
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'translate',
        qs: {
            'api-version': '3.0',
            'to': languageTo
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

    request(options, function (err, res, body) {
        callback(body[0].translations[0].text);
    });
};
