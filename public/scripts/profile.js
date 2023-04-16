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


  $(document).ready(() => {
    $.get("/profile-data", (data) => {
      // contains array of profile documents from the server
      const profile = data[0]; // assumes only 1 profile in collection
      
      // banner updated
      //$("#banner_image").attr("src", profile.bannerImageUrl);
      
      // profile pic updated
      $("#profile_pic").attr("src", profile.profilePicture);
      
      // name and handle updated
      $(".text").html(`${profile.fullName} <br> @${profile.username}`);
      
      // about me section updated
      $(".about-me").html(profile.aboutMe);

    });
  });


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
