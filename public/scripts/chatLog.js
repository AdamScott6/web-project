window.onload = function() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    let name = userInfo.name; 
    let username = userInfo.username; 
    // console.log(name, username);
    $('.text-chat').text(name + " @" + username + ")");
}