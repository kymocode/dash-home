const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
});
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data

module.exports = parser;
