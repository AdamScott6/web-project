let isLight = true;

window.onload = function () {
    // const email = localStorage.getItem('email');
    const mainBody = document.getElementById('mainBody');

    const message = localStorage.getItem('message');
    if (message) {
      document.getElementById('message').textContent = message;
      localStorage.removeItem('message');
    }

    $.get("/account-data", (accounts) => {

        const currentAccount = accounts.find(account => account._id === localStorage.getItem('Id'));

        console.log(currentAccount);
        if (currentAccount !== undefined) {
            if (currentAccount["isLightMode"] !== undefined) {
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

        const changeUsername = document.getElementById('changeUsernameModal');
        changeUsername.addEventListener("submit", (event) => {
            event.preventDefault();
            const newUsername = document.getElementById("newUsername").value;

            $.ajax({
                url: "/change-username",
                type: "POST",
                data: { newUsername: newUsername },
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error);
                    alert("Error updating username");
                },
            });
            localStorage.setItem('message', 'Username changed successfully!');
            location.reload();
        });

        var userModal = document.getElementById("usernameModal");
        var showUserModalButton = document.getElementById("changeUsernameButton");
        var modalUserCancelButton = document.getElementById("cancelUsernameModal");

        showUserModalButton.onclick = function () {
            userModal.style.display = "block";
        }
        modalUserCancelButton.onclick = function () {
            document.getElementById("newUsername").value = "";
            userModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == userModal) {
                document.getElementById("newUsername").value = "";
                userModal.style.display = "none";
            }
        }

        const changeFullName = document.getElementById('changeFullNameModal');
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
            localStorage.setItem('message', 'Fullname changed successfully!');
            location.reload();
        });

        var nameModal = document.getElementById("fullNameModal");
        var showNameModalButton = document.getElementById("changeFullNameButton");
        var modalNameCancelButton = document.getElementById("cancelFullNameModal");

        showNameModalButton.onclick = function () {
            nameModal.style.display = "block";
        }
        modalNameCancelButton.onclick = function () {
            document.getElementById("newFullName").value = "";
            nameModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == nameModal) {
                document.getElementById("newFullName").value = "";
                nameModal.style.display = "none";
            }
        }

        const changeProfilePicture = document.getElementById('changeProfilePictureModal');
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
            localStorage.setItem('message', 'Profile Picture changed successfully!');
            location.reload();
        });

        var pictureModal = document.getElementById("profilePictureModal");
        var showPictureModalButton = document.getElementById("changeProfilePictureButton");
        var modalPictureCancelButton = document.getElementById("cancelProfilePictureModal");

        showPictureModalButton.onclick = function () {
            pictureModal.style.display = "block";
        }
        modalPictureCancelButton.onclick = function () {
            document.getElementById("newProfilePicture").value = "";
            pictureModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == pictureModal) {
                document.getElementById("newProfilePicture").value = "";
                pictureModal.style.display = "none";
            }
        }

        const changePassword = document.getElementById('changePasswordModal');
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
            localStorage.setItem('message', 'Password changed successfully!');
            location.reload();
        });

        var passwordModal = document.getElementById("passwordModal");
        var showPasswordModalButton = document.getElementById("changePasswordButton");
        var modalPasswordCancelButton = document.getElementById("cancelPasswordModal");

        showPasswordModalButton.onclick = function () {
            passwordModal.style.display = "block";
        }
        modalPasswordCancelButton.onclick = function () {
            document.getElementById("newPassword").value = "";
            passwordModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == passwordModal) {
                document.getElementById("newPassword").value = "";
                passwordModal.style.display = "none";
            }
        }
    });
};

function initializeTheme() {
    if (isLight) {
        if ($("body").attr("class").includes("body-dark")) {
            $("body").removeClass("body-dark");
        }
        $("body").addClass("body-light");
    }
    else {
        if ($("body").attr("class").includes("body-light")) {
            $("body").removeClass("body-light");
        }
        $("body").addClass("body-dark");
        document.querySelectorAll('.modal-content').forEach(function(element) {
            element.style.backgroundColor = '#505050';
          });
    }
}