const Page = require('./page');

class LoginPage extends Page {

    get inputEmailAddress () { return $('#username') }
    get btnNext () { return $("#usernameSubmitButton") }
    get inputPassword () { return $('#password') }
    get btnSubmit () { return $("#submitButton") }


    login (username, password) {
        this.inputEmailAddress.setValue(username);
        this.btnNext.click();
        this.inputPassword.waitForDisplayed({ timeout: 5 * 1000});
        this.inputPassword.setValue(password);
        this.btnSubmit.click(); 
    }

}

module.exports = new LoginPage();
