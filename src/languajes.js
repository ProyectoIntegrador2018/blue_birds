/* This simple app performs a GET request to the /languages resource to
retrieve a list of languages supported by Microsoft Translator. */

const request = require('request');
const uuidv4 = require('uuid/v4');

var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
// if (!process.env[endpoint_var]) {
//   throw new Error('Please set/export the following environment variable: ' + endpoint_var);
// }
// var endpoint = process.env[endpoint_var];
var endpoint = "https://api.cognitive.microsofttranslator.com/"

export default function getLanguages() {
  let options = {
    method: 'GET',
    baseUrl: endpoint,
    url: 'languages',
    qs: {
      'api-version': '3.0',
    },
    headers: {
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    json: true,
  };

  request(options, function (err, res, body) {
    return JSON.stringify(body.translation);
  });
};
