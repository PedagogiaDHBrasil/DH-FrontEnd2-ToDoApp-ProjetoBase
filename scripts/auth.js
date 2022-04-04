// stores the fields for the login form from the DOM elements, trimmed
// and sanitized

const loginForm = {
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value.trim(),
    submit: document.getElementById("submit")
};

loginForm.submit.addEventListener("click", function(event) {
    event.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    if (username.length > 0 && password.length > 0) {
        login(username, password);
    } else {
        alert("Please enter a username and password");
    }
});
loginForm.username.addEventListener("blur", function(event) {
    const username = loginForm.username.value.trim();
    if (username.length > 0) {
        loginForm.password.focus();
    }
});

loginForm.password.addEventListener("blur", function(event) {
    const password = loginForm.password.value.trim();
    if (password.length > 0) {
        loginForm.submit.focus();
    }
});
