const Page = require("./page");

class HomePage extends Page {

    get navigationHeader () { return $("/html/body/dps-app").shadow$("dps-navigation-header"); }
    get btnAvatar () { return this.navigationHeader.shadow$("dps-login").shadow$$("button")[0]; }
    get btnSignOut () { return this.navigationHeader.shadow$("header").$("dps-navigation-login-management")
        .shadow$("dps-navigation-header-dropdown-content").$$("dps-navigation-section")[1]
        .$(".dps-navigation-login-management-button-container").$("dps-button"); }
    get btnSignIn () { return this.navigationHeader.shadow$("dps-login").shadow$("dps-button"); }
    get sidebarInstanceInfo () { return $("/html/body/dps-app").shadow$("dps-home-auth").shadow$("dps-instance-sidebar"); }
    get textInstanceStatus () { return this.sidebarInstanceInfo.shadow$(".dps-instance-sidebar-content-header-status"); }
    get btnWakeInstance () { return this.sidebarInstanceInfo.shadow$("dps-button").shadow$$("button")[0]; }
}

module.exports = new HomePage();