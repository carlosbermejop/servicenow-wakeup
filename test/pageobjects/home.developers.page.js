const Page = require("./page");

class HomePage extends Page {

    get navigationHeader () { return $("/html/body/dps-app").shadow$("dps-navigation-header"); }
    get btnAvatar () { return this.navigationHeader.shadow$("dps-login").shadow$$("button")[0]; }
    get btnSignOut () { return this.navigationHeader.shadow$("header").$("dps-navigation-login-management")
        .shadow$("dps-navigation-header-dropdown-content").$$("dps-navigation-section")[1]
        .$(".dps-navigation-login-management-button-container").$("dps-button"); }
    get btnSignIn () { return this.navigationHeader.shadow$("dps-login").shadow$("dps-button"); }
    get textInstanceStatus () { return this.navigationHeader.shadow$("dps-navigation-header-dropdown").$("dps-navigation-login-management")
        .shadow$("dps-navigation-header-dropdown-content").$$("dps-navigation-section")[0].$("dps-navigation-instance-management")
        .shadow$("dps-content-stack").$("span") }
}

module.exports = new HomePage();