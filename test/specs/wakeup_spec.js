const fs = require("fs");
const path = require("path");

const LoginPage = require('../pageobjects/login.developers.page');
const HomePage = require('../pageobjects/home.developers.page');

describe('Wake up ServiceNow Instances', () => {
    it('should wake up my SN instances', () => {
        var listOfInstances = getUpdateSetsFromManifest();
        
        listOfInstances.forEach( (instance) => {
            HomePage.open();
            LoginPage.inputEmailAddress.waitForDisplayed({ timeout: 10 * 1000 });
            LoginPage.login(instance.email, instance.password);
            HomePage.textInstanceStatus.waitForDisplayed({ timeout: 20 * 1000 });
            switch (HomePage.textInstanceStatus.getText()) {
                case "Online":
                    console.log(`The PDI for email address ${instance.email} is already online.`);
                    break;
                case "Hibernating":
                   HomePage.btnWakeInstance.click(); //  browser.executeScript("arguments[0].click();", HomePage.btnWakeInstance)  
                    browser.pause(3 * 1000);
                    if (HomePage.textInstanceStatus.getText() !== "Waking Instance") {
                        HomePage.btnWakeInstance.click();
                        console.log(`The PDI for email address ${instance.email} is being awaken!`);
                    } 
                    else {
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
            browser.reloadSession();
        })

    });
});

function getUpdateSetsFromManifest() {

    let file = path.resolve(__dirname, "../../sn-instances.json");
    const serviceNowInstances = JSON.parse(fs.readFileSync(file, "utf-8"));
    return serviceNowInstances.instances;
}


