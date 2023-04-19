window.onload = function() {
    $.get("/chats-user-data", (data) => {
        console.log(data)
        if (typeof(data) != "string"){
            if (data.isLightMode !== undefined){
                if (data.isLightMode){
                    if (document.findElementById("body"))
                    if ($("body").attr("class").includes("body-dark")){
                        $("body").removeClass("body-dark");
                    }
                    $("body").addClass("body-light");

                    if ($("div.card-container").attr("class").includes("is-dark")){
                        $("div.card-container").removeClass("is-dark");
                    }
                    $("div.card-container").addClass("is-light");

                    if ($("div.card-header").attr("class").includes("header-is-dark")){
                        $("div.card-header").removeClass("header-is-dark");
                    }
                    $("div.card-header").addClass("header-is-light");

                    if ($("div.text-chat").attr("class").includes("header-label-dark")){
                        $("div.text-chat").removeClass("header-label-dark");
                    }
                    $("div.text-chat").addClass("header-label-light");
                }
                else{
                    if ($("body").attr("class").includes("body-light")){
                        $("body").removeClass("body-light");
                    }
                    $("body").addClass("body-dark");

                    if ($("div.card-container").attr("class").includes("is-light")){
                        $("div.card-container").removeClass("is-light");
                    }
                    $("div.card-container").addClass("is-dark");

                    if ($("div.card-header").attr("class").includes("header-is-light")){
                        $("div.card-header").removeClass("header-is-light");
                    }
                    $("div.card-header").addClass("header-is-dark");

                    if ($("div.text-chat").attr("class").includes("header-label-light")){
                        $("div.text-chat").removeClass("header-label-light");
                    }
                    $("div.text-chat").addClass("header-label-dark");
                }
            }
        }
    })

    var userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    let name = userInfo.name; 
    let username = userInfo.username; 
    let pfp = userInfo.pfp;
    // console.log(name, username);
    $('.text-chat').text(name + " (@" + username + ")");
    $('.img-avatar').attr('src', pfp);
}