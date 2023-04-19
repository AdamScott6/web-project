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


window.onload = function() {
  // to change image for banner when user clicks the banner
  document.getElementById("banner_image").addEventListener("click", function() {
    document.getElementById("banner_input").click();
  });

  document.getElementById("banner_input").addEventListener("change", function() {
    const banner = this.files[0];
    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
      document.getElementById("banner_image").src = event.target.result;
    };

    fileReader.readAsDataURL(banner);
  });

  //to change image for profile pic when user clicks the image
  document.getElementById("profile_pic").addEventListener("click", function() {
    document.getElementById("profile_input").click();
  });

  document.getElementById("profile_input").addEventListener("change", function() {
    const profile = this.files[0];
    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
      document.getElementById("profile_pic").src = event.target.result;
    };

    fileReader.readAsDataURL(profile);
  });
};



  $(document).ready(() => {
    $.get("/profile-details", (data) => {
      //data variable contains array of profiles from server
      const profile = data[0];
      
      // update the banner image
      $("#banner_image").attr("src", profile.bannerImage);
      
      // update the profile picture
      $("#profile_pic").attr("src", profile.profilePicture);
      
      // update the name and handle
      if (profile.fullName !== undefined){
        $(".text").html(`${profile.fullName} <br> @${profile.username}`);
      }
      else{
        $(".text").html(`${profile.username} <br> @${profile.username}`);
      }
      
      // update the about me section
      $(".about-me").html(profile.aboutMe);
    });
  });


  fetch("/profile-details")
  .then(response => response.json())
  .then(profileData => {
    // use profileData to display users details on the page
    console.log(profileData);
  })
  .catch(error => console.error(error));

//---------------------------

// an ajax request is made to /profile-data
fetch("/profile-data")
  .then((res) => res.json())
  .then((posts) => {
    //looping through posts which then are displayed in div=latest-posts
    const latestPosts = document.getElementById("latest-posts");
    
    // previous content is cleared
    latestPosts.innerHTML = "";
    
    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.textContent = post.content;
      postDiv.classList.add("post");

      // new element created for timestamp
      const dateTime = document.createElement("span");

      //took the text content of timestamp and formatted it
      const timestamp = new Date(post.createdAt).toLocaleString();
      dateTime.textContent = timestamp;
      dateTime.classList.add("timestamp");

      //added timestamp to post
      postDiv.appendChild(dateTime);

      //posts are added to the latestpost div
      latestPosts.appendChild(postDiv);
    });
  })
  .catch((err) => console.error(err));



function createPost() {
  document.getElementById("postForm").style.display = "block";
}

function cancelPost() {
  document.getElementById("postForm").style.display = "none";
}

