window.onload = function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('mainBody');

    loginForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting
        event.preventDefault();

        // Get the email and password values
        const email = emailInput.value;
        const password = passwordInput.value;

        // Check if the email and password are correct
        // if (email === 'user@example.com' && password === 'password') {
        if (email === 'user' && password === 'password') {
            // Save the email in local storage
            localStorage.setItem('email', email);

            // Redirect to the account page
            window.location.href = 'account.html';
        } else {
            // Display an error message
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Invalid email or password.';
            loginForm.appendChild(errorMessage);
        }
    });
};