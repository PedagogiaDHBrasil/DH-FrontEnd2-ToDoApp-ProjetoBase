const usuario = document.getElementById("inputEmail")
const senha = document.getElementById("inputPassword")
const botao = document.getElementById("submit")

// const BASE_URL = "https://ctd-todo-api.herokuapp.com/v1"


const logarUsuario = function () {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "email": usuario.value,
            "password": senha.value
        }
    }
    fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", options)
        .then(response => {
            console.log(response);
        })
}

const criarUsuario = () => {
    fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "email": usuario.value,
            "password": senha.value
        }
    })
        .then(response => {
            console.log(response);
        })
}

botao.addEventListener("click", function (event) {
    event.preventDefault()
    if (usuario.value.length > 0 && senha.value.length > 0) {
        logarUsuario()
    }
    else {
        alert("Por favor insira usuário e senha")
    }

})