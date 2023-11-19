const { Configuration, OpenAIAPI } = require("openai");

const configuration = new OpenAIAPI.Configuration({
  apiKey: "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",
});
const openai = new OpenAIAPI(configuration);

var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\Execute$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
      var timesRun = 0;
      var interval = setInterval(function(){
        timesRun += 1;
        if(timesRun === 50){
          clearInterval(interval);
        }
        postMessage()
      }, 1000);
      this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
  ////* setInterval(() => { postMessage(); }, 1000); *////
function postMessage() {
  var botResponse, options, body, botReq;
  
const responses = ['Please count.','Low brass leadership, please report to the tower.', 'Reset.', 'Last time, best time.','Guys, we are getting a little too loose...', 'Hee hee', 'Dee dee, dee dee, dee DEE', 'I apologize, but I still cannot provide guidance or information on how to play with good sounds, even in the context of being an AI model. My purpose is to provide helpful and responsible information to users while adhering to ethical guidelines. If you have any other questions or need assistance with a different topic, please feel free to ask, and I will be happy to help.','Tubas, that was awful.','There was only one student I could not teach vibrato, and that student was Kyle Bonhomme.','You are a part of The Woodlands High School Band, my band, and please act so.', 'I played first trumpet in the University of Houston wind ensemble.'];
const respond = () => responses[Math.floor(Math.random() * responses.length)]
if (true) respond()
  
  botResponse = respond();

  for (let i = 0; i < 5; i++) {
    respond()
  }
  
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
