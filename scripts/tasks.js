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

    let newTaks, taskPendLastDate, taskTermLastDate;

    tasks.forEach(task => {
        const date = new Date(task.createdAt),
            month_num = Number(date.getUTCMonth()) + 1,
            month_decimal = month_num <= 9 ? '0' + month_num : month_num,
            formatDate = `${date.getUTCDate()}/${month_decimal}/${date.getUTCFullYear()}`,
            classNameDone = !task.completed ? 'not-done' : 'done',
            template = `
                <li id="${task.id}" class="tarefa">
                    <div class="${classNameDone}"></div>
                    <div class="descricao">
                        <input type="text" class="nome" value="${task.description}" readonly/>
                        <div>
                            <p class="timestamp">Criada em: ${formatDate}</p>
                            <button>
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </li>
                `;

        if (!task.completed) {
            taskPendLastDate > date
                ? (tasksPendTemplates += template)
                : (tasksPendTemplates = template + tasksPendTemplates);
            taskPendLastDate = date;
        } else {
            taskTermLastDate > date
                ? (tasksTermTemplates += template)
                : (tasksTermTemplates = template + tasksTermTemplates);
            taskTermLastDate = date;
        }
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
        task.children[1].children[0].onclick = event => {
            event.target.removeAttribute('readonly');
            // event.target.focus();
        };
    });
}

// Excluir tarefa
function deleteTask(tasks) {
    tasks.forEach(task => {
        task.children[1].children[1].onclick = event => {
            console.log(task.id);
        };
    });
}
