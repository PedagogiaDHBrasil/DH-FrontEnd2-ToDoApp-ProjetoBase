window.onload = event => {
    const url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users',
        form = document.forms[0];

    if (form['inputPassword'] != form['inputPasswordConfirm']) {
        // form.reset();
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const payload = {
                firstName: form['inputName'].value,
                lastName: form['inputLastName'].value,
                email: form['inputEmail'].value,
                password: form['inputPassword'].value,
            },
            settings = {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                if (data.jwt) {
                    localStorage.setItem('userJwt', data.jwt);
                    location.replace('tarefas.html');
                }
            });
    });
};
