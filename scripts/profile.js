function changeimage(event) {
    var image = new FileReader();
    image.onload = function(){
      var output_image = document.getElementById('profile_pic');
      output_image.src = image.result;
    }
    image.readAsDataURL(event.target.files[0]);
  }



function changeBannerImage(event) {
    var banner = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
        document.getElementById("banner_image").src = event.target.result;
    };
    fileReader.readAsDataURL(banner);
}
