window.onload = function () {
    // const email = localStorage.getItem('email');
    const mainBody = document.getElementById('mainBody');

    document.getElementById('username').textContent = "TEST";

    $.get("/account-data", (accounts) => {

        const currentAccount = accounts.find(account => account._id === localStorage.getItem('Id'));

        console.log(currentAccount);

        document.getElementById('username').textContent = currentAccount.username;
        if (currentAccount.profilePicture != null) {
            document.getElementById('profilePicture').src = currentAccount.profilePicture;
        }

        mainBody.addEventListener('submit', (event) => {
            // Prevent the form from submitting
            event.preventDefault();

            // Delete the account details from local storage
            localStorage.setItem('Id', "-1");

            // Redirect to the login page
            window.location.href = 'login.html';
        });

        const changeUsername = document.getElementById('changeUsername');
        changeUsername.addEventListener("submit", (event) => {
            event.preventDefault();
            const newUsername = document.getElementById("newUsername").value;

            $.ajax({
                url: "/change-username",
                type: "POST",
                data: { newUsername: newUsername },
                success: function (data) {
                    console.log(data);
                    // Update the displayed username with the new value
                    document.getElementById("username").textContent = newUsername;
                },
                error: function (error) {
                    console.log(error);
                    alert("Error updating username");
                },
            });
        });

        const changeProfilePicture = document.getElementById('changeProfilePicture');
        changeProfilePicture.addEventListener("submit", (event) => {
            event.preventDefault();
            const newProfilePicture = document.getElementById("newProfilePicture").value;

            $.ajax({
                url: "/change-profile-picture",
                type: "POST",
                data: { newProfilePicture: newProfilePicture },
                success: function (data) {
                    console.log(data);
                    // Update the displayed profile picture with the new value
                    document.getElementById("username").textContent = newProfilePicture;
                },
                error: function (error) {
                    console.log(error);
                    alert("Error updating username");
                },
            });
        });

        const changePassword = document.getElementById('changePassword');
        changePassword.addEventListener("submit", (event) => {
            event.preventDefault();
            const newPassword = document.getElementById("newPassword").value;

            $.ajax({
                url: "/change-password",
                type: "POST",
                data: { newPassword: newPassword },
                success: function (data) {
                    console.log(data);
                    // Update the displayed password with the new value
                    document.getElementById("Password").textContent = newPassword;
                },
                error: function (error) {
                    console.log(error);
                    alert("Error updating Password");
                },
            });
        });
    });
};