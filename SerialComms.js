const SerialPort = require('serialport');
const Ready = require('@serialport/parser-ready')
const {StringStream} = require('scramjet');
const EventEmitter = require('events');

const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));};

class SerialComms extends EventEmitter {
  constructor(portname) {
    super();
    // Init the port
    this._ready = false;
    this.port = new SerialPort(portname, {baudRate: 9600}); // Is there a way to make portname (1st param) dynamic??
    this.port.pipe(new Ready({ delimiter: 'READY' })).on('ready', () => {this._ready = true});
    this.reader = this.port.pipe(new StringStream).lines('\n').each(data => this.receive(data));
  }

  async write(data) {
    if(this._ready) {
      this.port.write(data);
    } else {
      await sleep(100);
      this.write(data);
    }
  }

  receive(data) {
    console.log(JSON.parse(data));
    // const message = JSON.parse(data)
    const message = {
      type: 'SENSOR',
      boxes: [
        {value: 120},
        {value: 12}
      ]
    }
    this.emit('message', message)
  }
}

module.exports = SerialComms;
