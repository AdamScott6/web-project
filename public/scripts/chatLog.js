let id, fullname, username, pic;
let currentUserId, currentChatlog;
window.onload = function() {
    $.get("/current-user", (data) => {
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

                    if ($("div#card-body").attr("class").includes("card-body-is-dark")){
                        $("div#card-body").removeClass("card-body-is-dark");
                    }
                    $("div#card-body").addClass("card-body-is-light");
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

                    if ($("div#card-body").attr("class").includes("card-body-is-light")){
                        $("div#card-body").removeClass("card-body-is-light");
                    }
                    $("div#card-body").addClass("card-body-is-dark");
                }
            }
        }
    })

     

    
    fetch('/current-user')
    .then(response => response.json())
    .then(data => {
        currentUserId = data;
        console.log("Setting currentUserId: ", currentUserId);
    })

    var userId = localStorage.getItem('userInfo'); 
    console.log("userInfo is: ", userId);
    try {
        let userRes = $.get(`/users/${userId}`, userId);
        userRes.done((data) => { 
            id = data._id;
            fullname = data.fullName;
            username = data.username;
            pic = data.profilePicture;
            $('.text-chat').text(fullname + " (@" + username + ")");
            $('.img-avatar').attr('src', pic);
        });
    }
    catch(err) {
        res.status(404).send('User not found');
    }
    
    var chatInfo = JSON.parse(localStorage.getItem('chatInfo'));
    console.log("chatInfo is: ", chatInfo);
    let chatID = chatInfo.chatID;
    console.log("chatInfo.chatID is: ", chatID);
    try {
        let chatRes = $.get(`/chatlog/${chatID}`, chatID);
        chatRes.done((data) => { 
            currentChatlog = data;
            // console.log("data is: ", data);
            console.log("chatlog is", currentChatlog);
            $.each(currentChatlog, function(index, message) {
                console.log("message.sender is: ", message.sender, "current user is: ", userId);
                if (message.sender === userId) {
                    console.log("sender is current user!");
                    let newMessage = $('<div>').addClass('message-box right');
                    let str = "<p>" + message.message + "</p>";
                    newMessage.append(str);

                    $('.messages-container').append(newMessage);
                }
                else if (message.recipient === userId) {
                    console.log("recipient is current user!");
                    let newMessage = $('<div>').addClass('message-box left');
                    let str = "<p>" + message.message + "</p>";
                    newMessage.append(str);

                    $('.messages-container').append(newMessage);
                }
            });
        });
    }
    catch(err) {
        console.log("chatlog was not  found");
        res.status(404).send('Chatlog not found');
    }

    $('#button-send').click(function() {
        send();
    });
}

function send() {
    let messageSend = $('.message-send').val();
    $('.messages-container').append($('<div>').addClass('message-box right').append(messageSend));
    $('.message-send').val('');
    
}