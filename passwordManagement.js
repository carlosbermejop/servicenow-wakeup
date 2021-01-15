let keyFile = require("./key.json");
let key = keyFile["key"];
let CryptoJS = require("crypto-js");
console.log(key);
let password = "admin";
let encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
console.log(encryptedPassword);

let decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, key).toString(CryptoJS.enc.Utf8);
console.log(decryptedPassword);