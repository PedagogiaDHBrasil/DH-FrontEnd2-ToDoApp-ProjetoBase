!localStorage.userJwt ? location.replace('index.html') : '';

const urlBase = 'https://ctd-fe2-todo-v2.herokuapp.com/v1';
const token = localStorage.userJwt;
let userInfo;

window.onload = event => {
    dataUser();
    fetchTasks();
    createTask();
};

// Dados do usuário
function dataUser() {
    const userName = document.querySelector('.user-name');
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
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
function fetchTasks() {
    fetch(urlBase + '/tasks', {
        method: 'GET',
        headers: {
            authorization: token,
        },
    })
        .then(response => response.json())
        .then(tasksList => {
            document.querySelectorAll('.tarefa').forEach(task => {
                task.remove();
            });
            listTasks(tasksList);
        });
}

function listTasks(tasks) {
    const tarefasPendentes = document.querySelector('.tarefas-pendentes'),
        tarefasTerminadas = document.querySelector('.tarefas-terminadas');

    let tasksPendTemplates = '',
        tasksTermTemplates = '';

    // let taskPendLastDate, taskTermLastDate;

    let newTaks;

    tasks.forEach(task => {
        const date = new Date(task.createdAt),
            month_num = Number(date.getUTCMonth()) + 1,
            month_decimal = month_num <= 9 ? '0' + month_num : month_num,
            formatDate = `${date.getUTCDate()}/${month_decimal}/${date.getUTCFullYear()}`,
            classNameDone = !task.completed ? 'not-done' : 'done',
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>`,
            template = `
                <li id="${task.id}" class="tarefa">
                    <div class="${classNameDone}"></div>
                    <div class="descricao">
                        <input type="text" class="nome" value="${task.description}" readonly/>
                        <div>
                            <p class="timestamp">Criada em: ${formatDate}</p>
                            <button>
                                ${svg}
                            </button>
                        </div>
                    </div>
                </li>
                `;

        !task.completed ? (tasksPendTemplates += template) : (tasksTermTemplates += template);
    });

    tarefasPendentes.innerHTML = tasksPendTemplates;
    tarefasTerminadas.innerHTML = tasksTermTemplates;

    newTaks = document.querySelectorAll('.tarefa');

    switchcompleted(newTaks);
    renameTask(newTaks);
    deleteTask(newTaks);
}

// Criar tarefa
function createTask() {
    const form = document.forms[0];
    form.onsubmit = event => {
        event.preventDefault();

        const desc = form['novaTarefa'].value.trim();
        console.log(desc);
        const data = {
            description: desc,
        };
        fetch(urlBase + '/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
        })
            .then(response => response.json())
            .then(task => {
                fetchTasks();
                form['novaTarefa'].value = '';
            })
            .catch(error => console.log(error));
    };
}

// Editar tarefa
function switchcompleted(tasks) {
    tasks.forEach(task => {
        task.children[0].onclick = event => {
            const status = event.target.classList[0] == 'done' ? false : true;
            const data = {
                completed: status,
            };

            fetch(urlBase + '/tasks/' + task.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    Authorization: token,
                    'Content-type': 'application/json',
                },
            })
                .then(response => {
                    fetchTasks();
                })
                .catch(error => console.log(error));
        };
    });
}
function renameTask(tasks) {
    tasks.forEach(task => {
        const inputTask = task.children[1].children[0];
        inputTask.onclick = event => {
            event.target.removeAttribute('readonly');
            event.target.focus();
        };
        inputTask.onblur = event => {
            event.target.setAttribute('readonly', 'readonly');
        };
        inputTask.onchange = event => {
            const data = {
                description: inputTask.value,
            };

            fetch(urlBase + '/tasks/' + task.id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    Authorization: token,
                    'Content-type': 'application/json',
                },
            })
                .then(response => {
                    fetchTasks();
                })
                .catch(error => console.log(error));
        };
    });
}

// Excluir tarefa
function deleteTask(tasks) {
    tasks.forEach(task => {
        task.children[1].children[1].onclick = event => {
            fetch(urlBase + '/tasks/' + task.id, {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                },
            }).then(response => {
                fetchTasks();
            });
        };
    });
}
