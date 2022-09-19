const url = 'https://ctd-todo-api.herokuapp.com/v1/users',
    form = document.forms[0],
    inputName = document.querySelector('#inputName'),
    lastName = document.querySelector('#inputLastName'),
    email = document.querySelector('#inputEmail'),
    password = document.querySelector('#inputPassword'),
    passwordTest = document.querySelector('#inputPasswordTest');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const payload = {
        firstName: inputName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    };

    const settings = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    };
});
