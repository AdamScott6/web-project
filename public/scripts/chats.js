let isLight = true;

const app = Vue.createApp({
        data() {
            return {
                users: [],
                photos: [],
                userData: [],
                currentUserId: String,
                loadedData: [],
                chatData: []
            }
        },
        methods: {
            async loadChats() {
                console.log("in loadChats");
                const res = await fetch("/chats-user-data");
                const data = await res.json();
                this.loadedData = data;
                console.log("data in chats: ", this.loadedData); 
                
                const r = await fetch("/current-user");
                const d = await r.json();
                console.log("Setting currentUserId: ", d._id);
                this.currentUserId = d._id;

                this.mapChats();
            },
            mapChats() {
                this.loadedData.forEach((chat, index) => {
                    let p;
                    chat.participants.forEach((user, index) => {
                        if (user != this.currentUserId){
                            p = user;
                        }
                    })
                    this.chatData.push({
                        _id: chat._id,
                        name: chat.name,
                        user: p
                    }); 
                    // console.log("this is chatData", this.chatData);
                    this.mapUser(p);
                });
            },
            mapUser(userId) {
                console.log("data in mapUser: ", userId);                
                
                let userRes = $.get(`/users/${userId}`, userId);
                userRes.done((data) => {
                    // console.log(data); 
                    this.userData.push( {
                        id: data._id,
                        name: data.fullName,
                        username: data.username,
                        pic: data.profilePicture
                    })
                    console.log("this is userData", this.userData);
                });
            },
            async initializeTheme() {
                $.get("/settings-data", (data) => {
                    if (typeof(data) != "string"){
                        if (data.isLightMode !== undefined){
                            if (data.isLightMode){
                                if ($("body").attr("class").includes("body-dark")){
                                    $("body").removeClass("body-dark");
                                }
                                $("body").addClass("body-light");

                                if ($("p#messageHeader").attr("class").includes("is-dark")){
                                    $("p#messageHeader").removeClass("is-dark");
                                }
                                $("#messageHeader").addClass("is-light");

                                // if ($("html").attr("class").includes("is-dark")){
                                //     $("html").removeClass("is-dark");
                                // }
                                // $("html").addClass("is-light");
                            }
                            else{
                                if ($("body").attr("class").includes("body-light")){
                                    $("body").removeClass("body-light");
                                }
                                $("body").addClass("body-dark");

                                if ($("p#messageHeader").attr("class").includes("is-light")){
                                    $("p#messageHeader").removeClass("is-light");
                                }
                                $("p#messageHeader").addClass("is-dark");

                                // if ($("html").attr("class").includes("is-light")){
                                //     $("html").removeClass("is-light");
                                // }
                                // $("html").addClass("is-dark");
                            }
                        }
                    }
                })
            },
            log(id) {
                let userInfo = id; 
                this.mapChatLog(userInfo);
                localStorage.setItem('userInfo', userInfo);
                console.log(userInfo);
                window.location.href='/chatLog'
            },
            mapChatLog(userInfo) {
                let chatData;
                $.get("/chatlog-details", (data) => {
                    chatData = data;
                    console.log("this is mapChatLog", chatData);
                    const foundChat = data.filter((chat) => {
                        return (
                            (chat.sender === this.currentUserId && chat.recipient === userInfo) ||
                            (chat.sender === userInfo && chat.recipient === this.currentUserId)
                        );
                    });
                    if (foundChat.length > 0) {
                        const foundChatJson = JSON.stringify(foundChat[0]);
                        console.log("foundchat is ", foundChatJson);
                        localStorage.setItem('chatInfo', foundChatJson);
                    }
                })
            }
        },
        mounted() {
            this.loadChats(),
            this.initializeTheme()
        },
    computed: {
        GetUsers: function () {
            return this.users;
        },
        GetPictures: function () {
            return this.photos;
        }
    }
}).mount('#app')