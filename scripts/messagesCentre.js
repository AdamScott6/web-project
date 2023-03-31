
const app = Vue.createApp({
        data() {
            return {
                users: [],
                photos: [],
                userData: []
            }
        },
        methods: {
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
                console.log("pictures from load pictures");
                console.log(this.photos);
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
                console.log("userData");
                console.log(this.userData);
        
            }            
        },
        mounted() {
            this.loadUsers(),
            this.loadPictures()
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