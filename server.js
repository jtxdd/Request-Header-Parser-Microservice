// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
//------------------------------------------------------------------------------

/*
  - get the IP address
  - preferred languages (from header Accept-Language)
  - system infos        (from header User-Agent)
  
  ex. output: 
    {
      "ipaddress": "159.20.14.100",
      "language": "en-US,en;q=0.5",
      "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
    }
*/

//this setting from - https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
//the setting lets req.ip return ipv4 instead of ipv6 (if I understood it correctly)
app.enable('trust proxy');

app.get('/api/whoami', (req, res) => {
  var headerParsed = {
    'ipaddress': req.ip,
    'language': req.headers['accept-language'],
    'software': req.headers['user-agent']
  };
  res.send(headerParsed);
});


//------------------------------------------------------------------------------
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
