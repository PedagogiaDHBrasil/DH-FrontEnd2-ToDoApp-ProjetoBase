window.onload = event => {
    const url = 'https://ctd-todo-api.herokuapp.com/v1/users',
        form = document.forms[0],
        inputName = document.querySelector('#inputName'),
        lastName = document.querySelector('#inputLastName'),
        email = document.querySelector('#inputEmail'),
        password = document.querySelector('#inputPassword'),
        passwordConfirm = document.querySelector('#inputPasswordConfirm'),
        passwordTest = password != passwordConfirm;

    if (password != passwordConfirm) {
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const payload = {
                firstName: inputName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            },
            settings = {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

        console.log('Lanzando la consulta a la API');
        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                if (data.jwt) {
                    const usuario = {
                        jwt: data.jwt,
                        name: inputName.value,
                    };
                    localStorage.setItem('user', JSON.stringify(usuario));

                    location.replace('tarefas.html');
                }
                form.reset();
            });
    });
};
