window.onload = function () {
    const email = localStorage.getItem('email');
    const loginForm = document.getElementById('mainBody');

    document.getElementById('username').textContent = `${email}`;

    loginForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting
        event.preventDefault();

        // Delete the account details from local storage
        localStorage.setItem('email', "");
        localStorage.setItem('password', "");

        // Redirect to the login page
        window.location.href = 'login.html';
    });
};