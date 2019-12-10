var createError = require('http-errors');
var express = require('express');
var path = require('path');
var helmet = require('helmet')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socketio = require ('./modules/socketApi');
var serial = require('./modules/serial');
var solar = require('./modules/solar');
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger(':method :url :status :remote-addr :user-agent '));
// log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
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

setInterval(solar.update, 10000);

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
