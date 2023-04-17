window.onload = function () {
    const userInput = document.getElementById('user');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('mainBody');
    // let accounts;

    $.get("/account-data", (accounts) => {
        console.log(accounts);
        // accounts = data;
        loginForm.addEventListener('submit', (event) => {
            // Prevent the form from submitting
            event.preventDefault();

            // Get the username and password values
            const username = userInput.value;
            const password = passwordInput.value;

            // Check if the username and password are correct
            const foundAccount = accounts.find(account => account.username === username && account.password === password);
            if (foundAccount) {
                // Save the username in local storage
                localStorage.setItem('username', username);
                console.log(foundAccount._id);

                // Redirect to the account page
                // window.location.href = `/account.html?currentUserId=${foundAccount._id}`;
                fetch(`/account?currentUserId=${foundAccount._id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        window.location.href = response.url;
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            } else {
                // Display an error message
                const errorMessage = document.getElementById('wrongLogin');
                errorMessage.textContent = 'Invalid username or password.';
            }
        });
    });
};