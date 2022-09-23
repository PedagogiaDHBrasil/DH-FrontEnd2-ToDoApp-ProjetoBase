!localStorage.userJwt ? location.replace('index.html') : '';

const urlBase = 'https://ctd-fe2-todo-v2.herokuapp.com/v1';
const token = localStorage.userJwt;
let userInfo = {};

window.onload = event => {
    dataUser(token);
    consultarListaTasks(token);
};

// Dados do usuário
function dataUser(jwt) {
    const userName = document.querySelector('.user-name');
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: jwt,
        },
    };
    fetch(urlBase + '/users/getMe', settings)
        .then(response => response.json())
        .then(data => {
            userInfo = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };
            userName.innerText = userInfo.firstName;
        });
}

// Listar tarefas
function consultarListaTasks(jwt) {
    const settings = {
        method: 'GET',
        headers: {
            authorization: jwt,
        },
    };
    fetch(urlBase + '/tasks', settings)
        .then(response => response.json())
        .then(tasks => {
            listasTasksDom(tasks);
        });
}

function listasTasksDom(tasksLista) {
    const tarefasPendentes = document.querySelector('.tarefas-pendentes'),
        tarefasTerminadas = document.querySelector('.tarefas-terminadas');
    let tarefasPendentesTemplate = '',
        tarefasTerminadasTemplate = '',
        date,
        formatDate;

    tasksLista.forEach(task => {
        date = new Date(task.createdAt);
        formatDate = `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;

        console.log(formatDate);

        if (!task.completed) {
            tarefasPendentesTemplate += `
                <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao">
                        <p class="nome">${task.description}</p>
                        <p class="timestamp">Criada em: ${formatDate}</p>
                    </div>
                </li>
                `;
        } else {
            tarefasTerminadasTemplate += `
                <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao">
                        <p class="nome">${task.description}</p>
                        <p class="timestamp">Criada em: ${formatDate}</p>
                    </div>
                </li>
                `;
        }
    });

    tarefasPendentes.innerHTML = tarefasPendentesTemplate;
    tarefasTerminadas.innerHTML = tarefasTerminadasTemplate;
}
