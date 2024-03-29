// GET call for current user (hardcoded user)
// fetch('/current-user')
//   .then(function(response) {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(function(data) {
//     console.log("John Retrieved")
//     console.log(data);
//     setUserValues(data);
//   })
//   .catch(function(error) {
//     console.error('There was a problem with the fetch operation:', error);
//   });

// function setUserValues(userData) {
//   // Set html with currentUser data
//   document.getElementById("user_about_me").innerText = userData.aboutMe;
//   document.getElementById("user_handle").innerText = ("@" + userData.username);
//   document.getElementById("user_name").innerText = userData.fullName;
// }





// window.onload = function() {
//   // to change image for banner when user clicks the banner
//   document.getElementById("banner_image").addEventListener("click", function() {
//     document.getElementById("banner_input").click();
//   });

//   document.getElementById("banner_input").addEventListener("change", function() {
//     const banner = this.files[0];
//     const fileReader = new FileReader();

//     fileReader.onload = function(event) {
//       document.getElementById("banner_image").src = event.target.result;
//     };

//     fileReader.readAsDataURL(banner);
//   });

//   //to change image for profile pic when user clicks the image
//   document.getElementById("profile_pic").addEventListener("click", function() {
//     document.getElementById("profile_input").click();
//   });

//   document.getElementById("profile_input").addEventListener("change", function() {
//     const profile = this.files[0];
//     const fileReader = new FileReader();

//     fileReader.onload = function(event) {
//       document.getElementById("profile_pic").src = event.target.result;
//     };

//     fileReader.readAsDataURL(profile);
//   });
// };



$(document).ready(() => {
    $.get("/profile-details", (data) => {
        const profile = data[0];
        $("#banner_image").attr("src", profile.bannerImage);
        $("#profile_pic").attr("src", profile.profilePicture);
        if (profile.fullName !== undefined) {
            $(".text").html(`${profile.fullName} <br> @${profile.username}`);
        }
        else {
            $(".text").html(`${profile.username} <br> @${profile.username}`);
        }
        // shows current users about me and an edit button
        if (profile.aboutMe !== undefined && profile.aboutMe.trim() !== "") {
            $(".about").html(`<p>${profile.aboutMe}</p>`);
        } else {
            $(".about").html("Please update your bio by clicking edit...");
        }
        $(".about").append(`<br><button id="edit-aboutMe-button" class="button is-link is-small">Edit</button>`);
        // handles click event of edit
        $("#edit-aboutMe-button").click(() => {
            // replaces current about me with a textarea element
            const currentBio = $(".about p").html();
            $(".about").html(`<textarea id="aboutme-textarea" class="textarea">${currentBio}</textarea>`);
            // save button is added to save any edits to about me for the current user
            $(".about").append(`<button id="save-aboutme-edit" class="button is-link is-small is-success">Save</button>`);
            // handles click event for save
            $("#save-aboutme-edit").click(() => {
                const changedAboutMe = $("#aboutme-textarea").val();
                //database is updated for the aboutme for current user
                $.post("/update-bio", { aboutMe: changedAboutMe }, (data) => {
                    //updated about me is displayed
                    $(".about").html(`<p>${changedAboutMe}</p>`);
                    // edit button is added back
                    $(".about").append(`<br><button id="edit-aboutMe-button" class="button is-link is-small">Edit</button>`);
                });
            });
        });
    });
});


fetch("/profile-details")
    .then(response => response.json())
    .then(profileData => {
        // use profileData to display users details on the page
        console.log(profileData);
        if (profileData[0].isLightMode !== undefined) {
            if (profileData[0].isLightMode) {
                if ($("body").attr("class").includes("body-dark")) {
                    $("body").removeClass("body-dark");
                }
                $("body").addClass("body-light");

                if ($("p#section-title").attr("class").includes("is-dark")){
                    $("p#section-title").removeClass("is-dark")
                }
                $("p#section-title").addClass("is-light");

                if ($("div#about-container").attr("class").includes("is-dark")){
                    $("div#about-container").removeClass("is-dark")
                }
                $("div#about-container").addClass("is-light");

                if ($("div#latest-posts").attr("class").includes("is-dark")){
                    $("div#latest-posts").removeClass("is-dark")
                }
                $("div#latest-posts").addClass("is-light");
            }
            else {
                if ($("body").attr("class").includes("body-light")) {
                    $("body").removeClass("body-light");
                }
                $("body").addClass("body-dark");
                
                if ($("p#section-title").attr("class").includes("is-light")){
                    $("p#section-title").removeClass("is-light")
                }
                $("p#section-title").addClass("is-dark");

                if ($("div#about-container").attr("class").includes("is-light")){
                    $("div#about-container").removeClass("is-light")
                }
                $("div#about-container").addClass("is-dark");

                if ($("div#latest-posts").attr("class").includes("is-light")){
                    $("div#latest-posts").removeClass("is-light")
                }
                $("div#latest-posts").addClass("is-dark");
            }
        }
    })
    .catch(error => console.error(error));

//---------------------------

// an ajax request is made to /profile-data
fetch("/profile-data")
    .then((res) => res.json())
    .then((posts) => {
        const latestPosts = document.getElementById("latest-posts");
        latestPosts.innerHTML = "";

        if (posts.length === 0) {
            const message = document.createElement("div");
            message.textContent = "Sorry, no posts yet. Click Add New Posts to start!";
            message.classList.add("empty-posts");
            latestPosts.appendChild(message);
        } else {
            posts.forEach((post) => {
                const postDiv = document.createElement("div");
                postDiv.textContent = post.content;
                postDiv.classList.add("post");

                const dateTime = document.createElement("span");
                const timestamp = new Date(post.createdAt).toLocaleString();
                dateTime.textContent = timestamp;
                dateTime.classList.add("timestamp");

                postDiv.appendChild(dateTime);

                latestPosts.appendChild(postDiv);
            });
        }
    })
    .catch((err) => console.error(err));



function createPost() {
    document.getElementById("postForm").style.display = "block";
}

function cancelPost() {
    document.getElementById("postForm").style.display = "none";
}
