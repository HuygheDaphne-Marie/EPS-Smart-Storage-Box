const SerialPort = require('serialport');
const Ready = require('@serialport/parser-ready')
const {StringStream} = require('scramjet');
const EventEmitter = require('events');

// Need sleep to wait for serial ready
const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))};


class SerialComms extends EventEmitter {
  constructor(portname) {
    super();
    // Init the port
    let _ready = false;
    const port = new SerialPort(portname, {baudRate: 9600}); // Is there a way to make portname (1st param) dynamic??
    port.pipe(new Ready({ delimiter: 'READY' })).on('ready', () => {_ready = true});
    const reader = port.pipe(new StringStream).lines('\n').each(data => this.receive(data));
  }

  async write(data) {
    // maybe get data in JSON format and then make it a message for the adruino??
    // Would allow for jsonschema validation
    while(!this._ready) {
      await sleep(10);
    }
    port.write(data)
  }

  receive(data) {
    // console.log('Received:', data);
    this.emit('message', data)
    // Take message & make proper json out of it
    // send message to correct receiver
  }
}

module.exports = SerialComms;
