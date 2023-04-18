window.onload = function() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    let name = userInfo.name; 
    let username = userInfo.username; 
    let pfp = userInfo.pfp;
    // console.log(name, username);
    $('.text-chat').text(name + " (@" + username + ")");
    $('.img-avatar').attr('src', pfp);
}