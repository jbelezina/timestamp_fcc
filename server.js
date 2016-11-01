"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    parseDate = require('parse-date/silent'),
    portNo = process.env.PORT || 8080,
    app = express();
    
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  
  res.render('home');

});

app.get('/:timestamp', function (req, res) {
  
  let passedIn = req.params.timestamp,
      isNumber = /^[0-9.]+$/.test(passedIn),
      result;
  
  if (isNumber) {
    result = new Date(parseInt(passedIn)*1000);
  } else {
    result = parseDate(passedIn)
  }
    
  let unix = result.getTime().toString().slice(0,10),
    locale = "en-us",
    month = result.toLocaleString(locale, { month: "long" }),
    day = result.getDate(),
    year = result.getFullYear(),
    natural = month + " " + day + ", " + year;
    
  res.json({
  "unix" : unix,
  "natural" : natural
  });
  
}); 
    
app.listen(portNo, function () {
  console.log('Example app listening on env port or 8080');
});