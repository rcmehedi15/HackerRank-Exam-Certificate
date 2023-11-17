"use strict";

const fs = require("fs");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (chunk) => {
  inputString += chunk;
});

process.stdin.on("end", () => {
  inputString = inputString.trim().split("\n");
  main();
});

function readLine() {
  return inputString[currentLine++];
}

class User {
  constructor(username) {
    this.name = username;
  }

  getUsername() {
    return this.name;
  }

  setUsername(userName) {
    this.name = userName;
  }
}

class ChatUser extends User {
  constructor(userName) {
    super(userName);
    this.count = 0;
  }

  giveWarning() {
    this.count++;
  }

  getWarningCount() {
    return this.count;
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const initialUsername = readLine().trim();
  const chatUserObj = new ChatUser(initialUsername);

  const numberOfOperations = parseInt(readLine().trim(), 10);
  for (let i = 0; i < numberOfOperations; i++) {
    const [operation, username] = readLine().trim().split(" ");

    switch (operation) {
      case "GiveWarning":
        chatUserObj.giveWarning();
        break;
      case "SetName":
        chatUserObj.setUsername(username);
        break;
      default:
        break;
    }
  }

  ws.write(`User ${chatUserObj.getUsername()} has a warning count of ${chatUserObj.getWarningCount()}\n`);
  ws.write(`ChatUser extends User: ${(chatUserObj instanceof User).toString()}`);
  ws.end();
}
