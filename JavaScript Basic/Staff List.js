'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

class StaffList {
  constructor() {
    this.staffList = [];
  }

  add(name, age) {
    if (Number(age) > 20) {
      if (!this.staffList.find(i => i.name === name)) {
        this.staffList.push({ name, age });
      } else {
        throw new Error('Staff member already exists in the collection');
      }
    } else {
      throw new Error('Staff member age must be greater than 20');
    }
  }

  remove(name) {
    const foundIndex = this.staffList.findIndex(i => i.name === name);
    if (foundIndex !== -1) {
      this.staffList.splice(foundIndex, 1);
      return true;
    }
    return false;
  }

  getSize() {
    return this.staffList.length;
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  
  const obj = new StaffList();
  const operationCount = parseInt(readLine().trim());
  
  for (let i = 1; i <= operationCount; i++) {
    const operationInfo = readLine().trim().split(' ');
    try {
      let res;
      if (operationInfo[0] === 'add') {
        obj.add(operationInfo[1], parseInt(operationInfo[2]));
      } else if (operationInfo[0] === 'remove') {
        res = obj.remove(operationInfo[1]);
        ws.write(`${res}\n`);
      } else if (operationInfo[0] === 'getSize') {
        res = obj.getSize();
        ws.write(`${res}\n`);
      }
    } catch (e) {
      ws.write(`${e}\n`);
    }
  }
  ws.end();
}
