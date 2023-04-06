let settings = {
    "theme": "Dark",
    "visibility": "Private"
}

let currentPageTitle = "Appearance";
let menuButtons = []

$(document).ready(function () {
    initializeSettings();
});

function initializeSettings(){
    menuButtons = [$("button#appearance_button"), $("button#privacy_button")];
    initializeAppearance();
}

function initializeAppearance(){
    // Theme label
    let settingLabel = $("td#setting_label");
    settingLabel.append("<div class=\"container\">Theme</div>")

    // Theme dropdown menu initialization
    let dropdownLabel = $("button#dropdown_label");
    dropdownLabel.append(
        "<div>" + settings["theme"] + "&nbsp;&nbsp;</div>" +
        "<span class=\"icon is-small\">" + 
        "<i id=\"arrow\" class=\"fas fa-angle-down\"></i>" +
        "</span>"
    );

    let dropdownMenu = $("div#dropdown_menu");
    dropdownOptions = "<a class=\"dropdown-item\"";
    if (settings["theme"] === "Light"){
        dropdownOptions += "id=\"selectedOption\"";
    }
    dropdownOptions += ">Light</a><a class=\"dropdown-item\"";
    if (settings["theme"] === "Dark"){
        dropdownOptions += "id=\"selectedOption\"";
    }
    dropdownOptions += ">Dark</a>";
    dropdownMenu.append(dropdownOptions);

    $("a.dropdown-item").click(function(){
        settings["theme"] = this.text;
        dropdownLabel.children("div").html(this.text + "&nbsp;&nbsp;");

        for (child of dropdownMenu.children("a")){
            if (child.text == this.text){
                child.id = "selectedOption";
            }
            else{
                child.id = "";
            }
        }
        updateDatabase();
    });
}

function initializePrivacy(){
    let settingLabel = $("td#setting_label");
    settingLabel.empty();
    settingLabel.append("<div class=\"container\">Visibility</div>")

    let radio = $("div#visibility_radio");
    radio.empty();
    let radioOptions = 
    "<label class=\"radio\">" +
        "<input class=\"radio_option\" type=\"radio\" answer=\"Public\"";
    if (settings["visibility"] === "Public"){
        radioOptions += "checked";
    }
    radioOptions += ">Public&nbsp;&nbsp;&nbsp;&nbsp;" +
    "</label>" +
    "<label class=\"radio\">" +
        "<input class=\"radio_option\" type=\"radio\" answer=\"Private\"";
    if (settings["visibility"] === "Private"){
        radioOptions += "checked";
    }
    radioOptions += ">Private" + "</label>";
    radio.append(radioOptions);

    $("input.radio_option").click(function(){
        updateVisiblity($(this).attr("answer"));
    });
}

function updateVisiblity(visibility){
    settings["visibility"] = visibility;
    initializePrivacy();
}

function updateSettingsMenu(index){
    currentPageTitle = menuButtons[index].html();
    for (buttonIndex in menuButtons){
        if (buttonIndex != index){
            menuButtons[buttonIndex].attr("class", "button is-light has-text-grey-lighter has-background-grey")
        }
        else{
            menuButtons[buttonIndex].attr("class", "button is-light has-text-grey-lighter has-background-grey is-outlined")
        }
    }
    updateSettingsList();
}

function updateSettingsList(){
    $("p#settings_header").html(currentPageTitle);
    let settingsBody = $("tr#settings_body");
    let bodyElement = "";

    settingsBody.empty();

    if (currentPageTitle == "Appearance"){
        bodyElement += 
        "<td id=\"setting_label\"></td>" +
        "<td><div class=\"dropdown is-hoverable\">" +
            "<div id=\"dropdown_button\" class=\"dropdown-trigger\">" +
                "<button id=\"dropdown_label\" class=\"button\"></button>" +
            "</div>" +
            "<div class=\"dropdown-menu\" role=\"menu\">" +
                "<div id=\"dropdown_menu\" class=\"dropdown-content\"></div>" +
            "</div>" +
        "</div>";
        settingsBody.append(bodyElement + "</td>");
        initializeAppearance();
    }
    else{
        bodyElement += 
        "<td id=\"setting_label\"></td><td><div id=\"visibility_radio\" class=\"control\"></div>";
        settingsBody.append(bodyElement + "</td>");
        initializePrivacy();
    }
}

function updateDatabase(){
    // CODE TO WRITE "settings" TO DATABASE
}