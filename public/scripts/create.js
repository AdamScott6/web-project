window.onload = function () {
    // const email = localStorage.getItem('email');
    const mainBody = document.getElementById('mainBody');

    $.get("/account-data", (accounts) => {

        // const currentAccount = accounts.find(account => account._id === localStorage.getItem('Id'));

        mainBody.addEventListener('submit', (event) => {
            // Prevent the form from submitting
            event.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let cpassword = document.getElementById("cPassword").value;

            if (accounts.find(account => account.username === username)){
                document.getElementById("Error").textContent = "Error: Username Already Exists";
            }
            else if (password != cpassword){
                document.getElementById("Error").textContent = "Error: Password does not match Confirm Password";
            }
            else {
                // Redirect to the login page
                $.ajax({
                    url: "/create-account",
                    type: "POST",
                    data: { username: username, 
                            password: password },
                    success: function (data) {
                        window.location.href = 'login.html';
                    },
                    error: function (error) {
                        console.log(error);
                        alert("Error creating account");
                    },
                });
            }
        });
    });
};