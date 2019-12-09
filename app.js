var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socketio = require ('./socketApi');
const http = require('http');
const serial = require('./serial');
const helmet = require('helmet')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', indexRouter);
app.use('/users', usersRouter);

serial.on('data', data =>{
  socketio.emit("ambient", data.substring(6,11));

});

function Update() {
  var hostname = 'http://192.168.1.105';
  var generation = hostname + '/solar_api/v1/GetInverterRealtimeData.cgi?Scope=System';
  var usage = hostname + '/solar_api/v1/GetMeterRealtimeData.cgi?Scope=System';

  var generating = 0;

  Get(generation)
  .then(function(result){
    generating = result.Body.Data.PAC.Values[1];
    socketio.emit("generation", generating.toString());
  })
  .then(function(){
    Get(usage)
    .then(function(using){
        socketio.emit("usage", (generating - Math.abs(using.Body.Data[0].PowerReal_P_Sum)).toString());
      })
      .catch(function (err) {
        console.error(err);
      });
  })
  .catch(function (err) {
    console.error(err);
  });

}

function Get(path) {
    return new Promise(function(resolve, reject) {
      let chunks = [];
        const req = http.get(path, res => {
            res.on('data', d => {
              chunks.push(d);
            })
            .on('end', function() {
            let data   = Buffer.concat(chunks);
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            })
        })
        req.on('error', error => {
            reject(error);
        })
        req.end()
    })
}

setInterval(Update, 10000);

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
  res.json(err.message);
});

module.exports = app;
