window.onload = event => {
    const url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login',
        form = document.forms[0];

    form.onsubmit = event => {
        event.preventDefault();
        const data = {
            email: form['inputEmail'].value,
            password: form['inputPassword'].value,
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (data.jwt) {
                    localStorage.setItem('userJwt', data.jwt);
                    location.replace('tarefas.html');
                }
            });
    };
};
