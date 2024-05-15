import { renderNavBarAndLoggedUser, createOption  } from "./helper.js";
import { renderUsersOptions, getCategories} from "./fetchData.js";
window.onload = ()=>{
    renderNavBarAndLoggedUser('newTodo');
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    renderUsersOptions(userId || 'all', 'user-select');
    renderCategoriesOptions()
    const form = document.getElementById('new-todo-form');
    form.addEventListener('submit', handleNewTodoSubmit);
}

function renderCategoriesOptions(){
    getCategories()
    .then(data => {
        const select = document.getElementById('categories');
        data.forEach(category => {
            select.appendChild(createOption(category.name, category.name))
        })
    })
}
function handleNewTodoSubmit(e){
    e.preventDefault();
    const target = e.target
    const data = {
        userid: target['user-select'].value,
        category: target['categories'].value,
        description: target['description'].value,
        deadline: target['deadline'].value,
        priority: target['priority'].value
    }
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

