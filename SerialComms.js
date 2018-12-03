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
      await sleep(1000);
      this.write(data);
    }
  }

  receive(data) {
    data = data.split(':').map(elem => elem.replace('\r', ''))
    let message;
    if(data.length === 1) {
      if(!isNaN(data[0])) {
        message = {
          type: 'sensor',
          value: data[0]
        }
      } else {
        message = data[0];
      }
    } else {
      message = {
        type: data[0],
        value: data[1]
      }
    }
    
    this.emit('message', message)
  }
}

module.exports = SerialComms;
