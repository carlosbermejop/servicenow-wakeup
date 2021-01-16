let keyFile = require("./key.json");
let key = keyFile["key"];
let CryptoJS = require("crypto-js");
let password;
console.log(`Your key is: ${key}.`);
for (let i = 2; i < process.argv.length; i++) {
    
    if (process.argv[i].split("=").length == 2 && process.argv[i].split("=")[0] == "--password") {
        process.env.PASSWORD = process.argv[i].split("=")[1];
    }
}
if (process.env.PASSWORD) {
    password = process.env.PASSWORD;
} else {
    password = "admin";
}
let encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
console.log(`This is the encrypted password you need to copy: ${encryptedPassword}`);

let decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, key).toString(CryptoJS.enc.Utf8);
console.log(`This is what WebdriverIO will write: ${decryptedPassword}`);