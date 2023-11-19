import { OpenAI } from "bot.js";
import dotenv from 'dotenv';
dotenv.config();
// Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
const openAI = new OpenAI(process.env.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);
const topic = 'NodeJs';
const model = 'text-davinci-003';
// Function to generate the prompt for the OpenAI API 
// In the future, it will be moved to a helper class in the next code review
const generatePrompt = (topic) => {
    return `Write an blog post about "${topic}", it should in HTML format, include 5 unique points, using informative tone.`
};
// Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
await openAI.generateText(generatePrompt(topic), model, 800)
    .then(text => {
        // Logging the generated text to the console
        // In the future, this will be replaced to upload the returned blog text to a WordPress site using the WordPress REST API
        console.log(text);
    })
    .catch(error => {
        console.error(error);
    });

var http, director, cool, bot, router, server, port;

http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
bot         = require('./bot.js');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("The Terminator Bot");
}
