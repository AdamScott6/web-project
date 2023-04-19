let isLight = true;
// let loadedData;

const app = Vue.createApp({
        data() {
            return {
                users: [],
                photos: [],
                userData: [],
                loadedData: []
            }
        },
        methods: {
            async loadChats() {
                console.log("in loadChats");
                const res = await fetch("/chats-user-data");
                const data = await res.json();
                this.loadedData = data;
                console.log("data in chats: ", this.loadedData); 
            },
            async loadUsers() {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                const finalRes = await res.json();
                this.users = finalRes;
                
            },
            async loadPictures() {
                const res = await fetch("https://jsonplaceholder.typicode.com/photos");
                const finalRes = await res.json();
                
                this.photos = finalRes;
                this.photos = this.photos.slice(0,10);
                // console.log("pictures from load pictures");
                // console.log(this.photos);
                this.mapPicture();
            },
            mapPicture() {
                this.users.forEach((user, index) => {
                    this.userData.push({
                        name: user.name,
                        username: user.username,
                        pic: this.photos[index].url,
                    }); 
                });
                // console.log("userData");
                // console.log(this.userData);
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
                window.location='chatLog.html'
            },
        },
        mounted() {
            this.loadUsers(),
            this.loadPictures(),
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