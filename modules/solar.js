var get = require('./http-get');
var socketio = require ('./socketApi');

exports.update = function () {
  var hostname = 'http://192.168.1.105';
  var generation = hostname + '/solar_api/v1/GetInverterRealtimeData.cgi?Scope=System';
  var usage = hostname + '/solar_api/v1/GetMeterRealtimeData.cgi?Scope=System';

  var generating = 0;

  get.request(generation)
  .then(function(result){
    generating = result.Body.Data.PAC.Values[1];
    socketio.emit("generation", generating.toString());
  })
  .then(function(){
    get.request(usage)
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
