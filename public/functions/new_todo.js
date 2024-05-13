import { renderNavBarAndLoggedUser } from "./helper.js";
import { renderUsersOptions, renderCatergoryOptions } from "./fetchData.js";
window.onload = ()=>{
    renderNavBarAndLoggedUser('newTodo');
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    renderUsersOptions(userId || 'all', 'user-select');
    renderCatergoryOptions('categories');
    const form = document.getElementById('new-todo-form');
    form.addEventListener('submit', handleNewTodoSubmit);
    form.addEventListener('reset', handleReset);
}

function handleNewTodoSubmit(e){
    e.preventDefault();
    const target = e.target
   console.log(e.target['user-select'].value)
    const data = {
        userid: target['user-select'].value,
        category: target['categories'].value,
        description: target['description'].value,
        deadline: target['deadline'].value,
        priority: target['priority'].value
    }
    console.log('data', data)
    fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => {
        if(res.status === 201) {
            alert('Create new task successfully!')
            window.location.href = '/todos';
        } else {
            throw new Error('Failed to create todo');
        }
    })
    .catch(err => console.error('Add New Todo Fetch Error', err));
}

