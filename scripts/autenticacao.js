const usuario = document.getElementById("inputEmail")
const senha = document.getElementById("inputPassword")
const botao = document.getElementById("submit")

// const BASE_URL = "https://ctd-todo-api.herokuapp.com/v1"

let usuarioLogin = {
    email: "",
    password: ""
}


const logarUsuario = function () {
    usuarioLogin = {
        email: usuario.value,
        password: senha.value
    }

    let usuarioJSON = JSON.stringify(usuarioLogin)

    fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: usuarioJSON
        
    })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(response => {
            localStorage.setItem('jwt', response.jwt)
            console.log(localStorage.getItem('jwt'))
        }).catch(error => {
            console.log(error);
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