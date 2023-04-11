let settings = {
    "theme": "Light",
    "visibility": "Private"
}

let currentPageTitle = "Appearance";
let menuButtons = []
let selectedMenuOption = 0;

$(document).ready(function () {
    initializeSettings();
    initializeTheme();
});

function initializeTheme(){
    if (settings["theme"] === "Light"){
        // Background behind the tiles
        if ($("body").attr("class").includes("body-dark")){
            $("body").removeClass("body-dark");
        }
        $("body").addClass("body-light");

        // Background of the tiles
        if ($("div#settings_list_container").attr("class").includes("dark-background")){
            $("div#settings_list_container").removeClass("dark-background");
        }
        $("div#settings_list_container").addClass("light-background");
        if ($("div#settings_option_container").attr("class").includes("dark-background")){
            $("div#settings_option_container").removeClass("dark-background");
        }
        $("div#settings_option_container").addClass("light-background");

        // Menu header
        if ($("p#menu_header").attr("class") == undefined || $("p#menu_header").attr("class").includes("menu_header_dark")){
            $("p#menu_header").removeClass("menu_header_dark");
        }
        $("p#menu_header").addClass("menu_header_light");

        // Settings header
        if ($("p#settings_header").attr("class") == undefined || $("p#settings_header").attr("class").includes("settings_header_dark")){
            $("p#settings_header").removeClass("settings_header_dark");
        }
        $("p#settings_header").addClass("settings_header_light");

        // Colour of the label for each setting
        if ($("td#setting_label").attr("class") == undefined || $("td#setting_label").attr("class").includes("setting_label_dark")){
            $("td#setting_label").removeClass("setting_label_dark");
        }
        $("td#setting_label").addClass("setting_label_light");

        // Radio button
        for (radio of $("label.radio")){
            if (radio.classList.contains("radio-dark")){
                radio.classList.remove("radio-dark");
            }
            radio.classList.add("radio-light");
        }
    }
    else {
        // Background behind the tiles
        if ($("body").attr("class").includes("body-light")){
            $("body").removeClass("body-light");
        }
        $("body").addClass("body-dark");

        // Background of the tiles
        if ($("div#settings_list_container").attr("class").includes("light-background")){
            $("div#settings_list_container").removeClass("light-background");
        }
        $("div#settings_list_container").addClass("dark-background");
        if ($("div#settings_option_container").attr("class").includes("light-background")){
            $("div#settings_option_container").removeClass("light-background");
        }
        $("div#settings_option_container").addClass("dark-background");
        
        // Menu header
        if ($("p#menu_header").attr("class") == undefined || $("p#menu_header").attr("class").includes("menu_header_light")){
            $("p#menu_header").removeClass("menu_header_light");
        }
        $("p#menu_header").addClass("menu_header_dark");

        // Settings header
        if ($("p#settings_header").attr("class") == undefined || $("p#settings_header").attr("class").includes("settings_header_light")){
            $("p#settings_header").removeClass("settings_header_light");
        }
        $("p#settings_header").addClass("settings_header_dark");

        // Colour of the label for each setting
        if ($("td#setting_label").attr("class") == undefined || $("td#setting_label").attr("class").includes("setting_label_light")){
            $("td#setting_label").removeClass("setting_label_light");
        }
        $("td#setting_label").addClass("setting_label_dark");

        // Radio button
        for (radio of $("label.radio")){
            if (radio.classList.contains("radio-light")){
                radio.classList.remove("radio-light");
            }
            radio.classList.add("radio-dark");
        }
    }
}

function initializeSettings(){
    menuButtons = [$("button#appearance_button"), $("button#privacy_button")];
    initializeAppearance();
}

function initializeAppearance(){
    // Theme label
    let settingLabel = $("td#setting_label");
    settingLabel.append("<div id=\"setting_label_text\" class=\"container\">Theme</div>")

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
        updateSettingsMenu(selectedMenuOption);
        updateDatabase();
        initializeTheme();
    });
    updateDatabase();
    initializeTheme();
}

function initializePrivacy(){
    let settingLabel = $("td#setting_label");
    settingLabel.empty();
    settingLabel.append("<div id=\"setting_label_text\" class=\"container\">Visibility</div>")

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
        updateDatabase();
        initializeTheme();
    });
    updateDatabase();
    initializeTheme();
}

function updateVisiblity(visibility){
    settings["visibility"] = visibility;
    initializePrivacy();
}

function updateSettingsMenu(index){
    selectedMenuOption = index;
    currentPageTitle = menuButtons[index].html();
    for (buttonIndex in menuButtons){
        if (settings["theme"] == "Dark"){
            if (buttonIndex != index){
                menuButtons[buttonIndex].attr("class", "button is-light has-text-grey-lighter has-background-grey")
            }
            else{
                menuButtons[buttonIndex].attr("class", "button is-light has-text-grey-lighter has-background-grey is-outlined")
            }
        }
        else{
            if (buttonIndex != index){
                menuButtons[buttonIndex].attr("class", "button is-light has-text-black has-background-info-light")
            }
            else{
                menuButtons[buttonIndex].attr("class", "button is-light has-text-white has-background-info-dark")
            }
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