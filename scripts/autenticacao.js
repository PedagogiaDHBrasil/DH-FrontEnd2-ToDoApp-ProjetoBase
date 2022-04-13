const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");
const botao = document.getElementById("submit");

let usuarioLogin = {
    email: "",
    password: ""
}

const logarUsuario = function () {
    usuarioLogin = {
        email: email.value,
        password: senha.value
    }

    let usuarioJSON = JSON.stringify(usuarioLogin);

    fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: usuarioJSON

    }).then(response => {
        return response.json()
    }).then(response => {
        localStorage.setItem('jwt', response.jwt)
        console.log(localStorage.getItem('jwt'))
    }).catch(error => {
        console.log(error);
    });
}

botao.addEventListener("click", function (event) {
    event.preventDefault();
    let arrayErros = [];

    if (email.value.length <= 0) {
        arrayErros.push('Email é obrigatório');
    }
    if (senha.value.length <= 0) {
        arrayErros.push('Senha é obrigatório');
    }
    if (arrayErros.length > 0) {
        let stringErros = ''
        arrayErros.forEach(erro => {
            stringErros = stringErros + erro + '\n'
        });
        alert(stringErros);
    } else {
        logarUsuario();
    }
})