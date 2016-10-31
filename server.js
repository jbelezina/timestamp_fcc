"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    parse = require('parse-date/silent'),
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
    var convertedToInt = parseInt(passedIn);
    result = parse(convertedToInt);
  } else {
    result = parse(passedIn);
  }
  
  if (result instanceof Date) {
    
    let unix = result.getTime(),
        locale = "en-us",
        month = result.toLocaleString(locale, { month: "long" }),
        day = result.getDate(),
        year = result.getFullYear(),
        natural = month + " " + day + ", " + year;
    
    res.json({
      "unix" : unix,
      "natural" : natural
    });
  } else {
     res.json({
      "unix" : null,
      "natural" : null
    });
  }
  
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});