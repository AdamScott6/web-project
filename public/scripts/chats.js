let isLight = true;
// let loadedData;

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
                // this.users = this.loadedData.participants;
                // console.log(this.loadedData.participants);
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
                                if (document.findElementById("body"))
                                if ($("body").attr("class").includes("body-dark")){
                                    $("body").removeClass("body-dark");
                                }
                                $("body").addClass("body-light");
            
                                // if ($("div.card").attr("class").includes("is-dark")){
                                //     $("div.card").removeClass("is-dark");
                                // }
                                // $("div.card").addClass("is-light");
                            }
                            else{
                                if ($("body").attr("class").includes("body-light")){
                                    $("body").removeClass("body-light");
                                }
                                $("body").addClass("body-dark");
            
                                // for (div of $("div.card")){
                                //     console.log(div);
                                //     if ($(this).attr("class").includes("is-light")){
                                //         $(this).removeClass("isLight");
                                //     }
                                //     $(this).addClass("is-dark");
                                // }
                            }
                        }
                    }
                })
            },
            log(name, username, pfp) {
                var userInfo = { name: name, username: username, pfp: pfp}; 
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location.href='/chatLog'
            },
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