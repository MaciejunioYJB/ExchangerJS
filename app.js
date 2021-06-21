var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var nodeCron = require('node-cron');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//Download currencies
function getCurrencies() {
  var responseFile = null;
  const url = "https://u7u0iwpuhc.execute-api.eu-central-1.amazonaws.com";
  const method = "/Prod/currExchangeQuery";
  var headers = new Headers();
  headers.append("x-api-key", "uhu63XPxEc8cy9gkfVcVi01Nv1bYjco4gtjxxES6");

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  console.log(`Sending request: ${requestOptions.method}${method} to ${url}`);

  fetch(url + method, requestOptions)
    .then(response => response.json())
    .then(jsonResponse => responseFile = jsonResponse)
    .catch(error => console.log('error', error));
  return responseFile;
}

//Download crypto currencies
function getCryptoCurrencies() {
  var responseFile = null;
  const method = "https://u7u0iwpuhc.execute-api.eu-central-1.amazonaws.com";
  const url = "/Prod/cryptoQuery";

  var headers = new Headers();
  headers.append("x-api-key", "uhu63XPxEc8cy9gkfVcVi01Nv1bYjco4gtjxxES6");

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  console.log(`Sending request: ${requestOptions.method}${method} to ${url}`);

  fetch(url + method, requestOptions)
    .then(response => response.json())
    .then(jsonResponse => responseFile = jsonResponse)
    .catch(error => console.log('error', error));
  return responseFile;
}

function saveToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data), function(err) {
    if (err) {
        console.log(err);
    }
  });
}

//CRON JOB
nodeCron.schedule('0 */4 * * *', () => {
  saveToFile("public/js/currencies1.json", getCurrencies());
  saveToFile("public/js/crypto1.json", getCryptoCurrencies());
});
