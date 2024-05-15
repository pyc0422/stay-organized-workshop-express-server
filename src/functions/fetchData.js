import { capitalize, createOption } from './helper.js';

export const renderUsersOptions = (defualtUser, id) => {
    const select = document.getElementById(id);
    fetch('/api/users')
    .then((res) => {
        if(res.status === 200){
            return res.json();
        } else {
            throw new Error('Failed to fetch users');
        }
    })
    .then((data) => {
        select.appendChild(createOption('all', 'all'));
        data.forEach(user => {
            const option = createOption(user.id, capitalize(user.name));
            if(user.id === Number(defualtUser)) {
                option.selected = true;
            }
            option.classList.add('user-option')
            select.appendChild(option);
        });
       
    })
    .catch(err => console.error(err))
}

export const getCategories = () => {
    // from server get categories
    return fetch('/api/categories')
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Failed to fetch categories');
            }
        })
        .catch(err => console.error(err))
}


export const getTodoData = async (userId) => {
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

export function deleteTodo(){
    const todoId = this.id.split('-')[1];
    fetch(`/api/todos/${todoId}`, {
        method: 'DELETE'
    })
    .then((res) => {
        if(res.status === 200){
            alert('Delete todo successfully');
            window.location.reload();
        } else {
            throw new Error('Failed to delete todo');
        }
    })
    .catch(err => console.error(err));
}

export function updateTodoStatus(){
    const todoId = this.id.split('-')[1];
    fetch(`/api/todos/${todoId}`, {
        method: 'PUT'
    })
    .then((res) => {
        if(res.status === 200){
            alert('Update todo status successfully');
        } else {
            throw new Error('Failed to update todo status');
        }
    })
    .catch(err => console.error(err));
}