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
