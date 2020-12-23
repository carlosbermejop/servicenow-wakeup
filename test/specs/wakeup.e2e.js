const fs = require("fs");
const path = require("path");

const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');

describe('My Login application', () => {
    it('should login with valid credentials', () => {
        var listOfInstances = getUpdateSetsFromManifest();
        HomePage.open();
        listOfInstances.forEach( (instance) => {
            LoginPage.inputEmailAddress.waitForDisplayed({ timeout: 10 * 1000 });
            LoginPage.login(instance.email, instance.password);
            HomePage.textInstanceStatus.waitForDisplayed({ timeout: 20 * 1000 });
            switch (HomePage.textInstanceStatus.getText()) {
                case "Online":
                    console.log(`The PDI for email address ${instance.email} is already online.`);
                    break;
                case "Hibernating":
                    HomePage.btnWakeInstance.click();
                    browser.pause(3 * 1000);
                    if (HomePage.textInstanceStatus.getText() !== "Waking Instance") {
                        HomePage.btnWakeInstance.click();
                    } else {
                        console.log(`The PDI for email address ${instance.email} is being awaken!`);
                    }
                    break;
                case "Waking Instance":
                    console.log(`The PDI for email address ${instance.email} is already being awaken!`);
                    break;
                case "Fulfilling Request":
                    console.log(`The PDI for email address ${instance.email} is currently fulfilling a request. Try again later.`);
                    break;
                default:
                    console.log(`The PDI for email address ${instance.email} is currently at status ${HomePage.textInstanceStatus.getText()}`);
                    break;
            }
            HomePage.btnAvatar.click();
            HomePage.btnSignOut.waitForDisplayed({ timeout: 5 * 1000 });
            HomePage.btnSignOut.click();
            HomePage.btnSignIn.click();
            HomePage.btnSignIn.click();
        })

    });
});

function getUpdateSetsFromManifest() {

    let file = path.resolve(__dirname, "../../sn-instances.json");
    const serviceNowInstances = JSON.parse(fs.readFileSync(file, "utf-8"));
    return serviceNowInstances.instances;
}


