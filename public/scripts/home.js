
// This code was adapted from "app.js" by Beyond Fireship (2023-04-05)
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        //console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else{
            entry.target.classList.remove('show');
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const parent = document.querySelector(".page");
    
    fetch("/all-posts")
        .then(response => response.json())
        .then(data => {
            let number_of_elements = 0;

            for (let i = 0; i < data.length; i++) {
                let post = data[i];

                //Get author of post
                fetch("/getUser/" + post.createdBy, {
                    params: {userId: post.createdBy}
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.json();
                    })
                    .then((user) => {
                        if (!(user.accountIsPrivate)){
                            console.log("User retrieved");

                            let  section = document.createElement('section');

                            section.classList.add("post", "hidden");

                            let  header = document.createElement('div');
                            header.classList.add("header");

                            let  img = document.createElement("img");
                            img.src = user.profilePicture;
                            header.appendChild(img);

                            let  h2 = document.createElement("h2");
                            h2.textContent = ("@" + user.username);
                            header.appendChild(h2);

                            section.appendChild(header);

                            let  content = document.createElement("div");
                            content.classList.add("content");

                            let  p = document.createElement("p");
                            p.textContent = post.content;
                            content.appendChild(p);

                            section.appendChild(content);

                            if (parent) {
                                number_of_elements++;
                                //console.log(number_of_elements)
                                parent.appendChild(section);
                                observer.observe(section)
                            } else {
                                console.log("Parent element not found.");
                            };
                            //console.log(number_of_elements)
                        }
                        
                    })
                    .catch(function(error) {
                        console.error('There was a problem with the fetch operation:', error);
                    });


                
            }
        })
        .catch(error => console.log(error));

});

let isLight = true;

$(document).ready(function () {
    $.get("/home-user-data", (data) => {
        if (data !== undefined){
            if (data["isLightMode"] !== undefined){
                isLight = data["isLightMode"];
            }
        }
        initializeTheme();
    });
});

function initializeTheme(){
    if (isLight){
        if ($("#body").attr("class").includes("body-dark")){
            $("#body").removeClass("body-dark");
        }
        $("#body").addClass("body-light");
        $("div.page").addClass("page-is-light");
    }
    else{
        if ($("#body").attr("class").includes("body-light")){
            $("#body").removeClass("body-light");
        }
        $("#body").addClass("body-dark");
        $("div.page").addClass("page-is-dark");
    }
}