let isLight = true;

window.onload = function () {
    // const email = localStorage.getItem('email');
    const mainBody = document.getElementById('mainBody');

    $.get("/account-data", (accounts) => {

        const currentAccount = accounts.find(account => account._id === localStorage.getItem('Id'));

        console.log(currentAccount);
        if (currentAccount !== undefined){
            if (currentAccount["isLightMode"] !== undefined){
                isLight = currentAccount["isLightMode"];
            }
        }
        initializeTheme();

        document.getElementById('username').textContent = currentAccount.username;
        if (currentAccount.profilePicture != null) {
            document.getElementById('profilePicture').src = currentAccount.profilePicture;
        }

        mainBody.addEventListener('submit', (event) => {
            // Prevent the form from submitting
            event.preventDefault();

            // Delete the account details from local storage
            localStorage.setItem('Id', "-1");

            $.ajax({
                url: "/logout-function",
                type: "POST",
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                    alert("Error logging out");
                },
            });

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
            location.reload();
        });

        const changeFullName = document.getElementById('changeFullName');
        changeFullName.addEventListener("submit", (event) => {
            event.preventDefault();
            const newFullName = document.getElementById("newFullName").value;

            $.ajax({
                url: "/change-fullName",
                type: "POST",
                data: { newFullName: newFullName },
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                    alert("Error updating username");
                },
            });
            location.reload();
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
            location.reload();
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
                },
                error: function (error) {
                    console.log(error);
                    alert("Error updating Password");
                },
            });
            location.reload();
        });
    });
};

function initializeTheme(){
    if (isLight){
        if ($("body").attr("class").includes("body-dark")){
            $("body").removeClass("body-dark");
        }
        $("body").addClass("body-light");
    }
    else{
        if ($("body").attr("class").includes("body-light")){
            $("body").removeClass("body-light");
        }
        $("body").addClass("body-dark");
    }
}