const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')
 
const ssh = new NodeSSH()
const password = "123456";
 
ssh.connect({
  host: '172.16.9.153',
  username: 'nexthink',
  port: 22,
  password,
  tryKeyboard: true
})
.then(() => {
    ssh.execCommand("cd mid-server-generator/ && sh removeMidServer.sh newyork dev84914").then((removeResult) => {
        console.log(`STDOUT: ${removeResult.stdout}`);
        if (removeResult.stderr.length !== 0) {
            console.log(`STDERR: ${removeResult.stderr}`);
        }
        
        ssh.execCommand("cd mid-server-generator/ && sh createMidServer.sh newyork dev84914").then((createResult) => {
            console.log(`STDOUT: ${createResult.stdout}`);
            if (createResult.stderr.length !== 0) {
                console.log(`STDERR: ${createResult.stderr}`);
            }
            ssh.dispose();
        });
    });
})