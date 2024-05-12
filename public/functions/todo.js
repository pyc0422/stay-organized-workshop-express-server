import { capitalize } from "./helper.js";

window.onload = () => {
    const h3 = document.querySelector('h3');
    const urlParams = window.location.pathname.split('/');
    let userId = urlParams[urlParams.length - 1];
    const {name, username} = JSON.parse(sessionStorage.getItem('user'));
    h3.innerHTML = `Welcome <span style="color:rgb(3 105 161)">${capitalize(name)}</span> !`;
    renderUsers(userId);
    const select = document.getElementById("user-select")
    // render logged in user's todo list as default
    renderTodos(userId)
    select.addEventListener('change', (e) => {
        const selected = e.target.value;
        renderTodos(selected);
    })
}

function renderUsers(defualtUser) {
    const select = document.getElementById('user-select');
    fetch('/api/users')
    .then((res) => {
        if(res.status === 200){
            return res.json();
        } else {
            throw new Error('Failed to fetch users');
        }
    })
    .then((data) => {
        const allOption = document.createElement('option')
        allOption.value ='all'
        allOption.innerHTML = 'All'
        select.appendChild(allOption);
        data.forEach(user => {
            const option = document.createElement('option');
            if(user.id === Number(defualtUser)) {
                option.selected = true;
            }
            option.value = user.id;
            option.classList.add('user-option')
            option.innerHTML = capitalize(user.name);
            select.appendChild(option);
        });
       
    })
    .catch(err => console.error(err))
}

function getTodoData(userId){
    if(!userId) {
        alert('Provide a valid user id');
        return;
    }
    if (userId === 'all') {
        return fetch(`/api/todos`)
        .then((res) => {
            if(res.status === 200){
                return res.json();
            } else {
                throw new Error('Failed to fetch todos');
            }
        })
        .catch(err => console.error(err));

    }
    return fetch(`/api/todos/byuser/${userId}`)
    .then((res) => {
        if(res.status === 200){
            return res.json();
        } else {
            throw new Error('Failed to fetch todos');
        }
    })
    .catch(err => console.error(err));
}

function renderTodos(userId){
    getTodoData(userId)
    .then((data) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = ''
        data.forEach(todo => {
            const curCard = document.createElement('div');
            curCard.classList.add("todo-card");
            curCard.innerHTML = createToDoCard(todo);
            todoList.appendChild(curCard)
        });
    })
}
        
function createToDoCard(todo) {
    const color = {
        high:'red',
        medium:'orange',
        low:'green'
    }
    const curColor = color[todo.priority.toLowerCase()]
    const deadline = todo.deadline.split("-").reverse().join("/");
    console.log(typeof todo.completed )
    return `

        <div class="checkbox-div">
            <label>
                <input type="checkbox" id="todo-${todo.id}" class="todo-checkbox peer" ${todo.completed ? "checked" : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="todo-checkbox-icon" style="margin-top:-28px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </label>
        </div>
        <div class="task-div">
            <div class="task-main">
                <div class="task-title">${todo.description}</div>
                <div class="task-priority">
                    <div style="background-color:${curColor}; height:0.75rem; width:0.75rem"></div>
                    <div class="task-priority-text" style="color:${curColor}">${todo.priority}</div>     
                </div>
            </div>
            <div class="task-bottom">
                <div class="task-ddl">${deadline}</div>
                <div class="ask-category">${todo.category.split(" ")[0] || todo.category}</div>
            </div>
        </div>
    `

}