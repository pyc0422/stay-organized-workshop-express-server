import { capitalize } from "./helper.js";
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

export const renderCatergoryOptions = (id) => {
    const parent = document.getElementById(id);
    fetch('/api/categories')
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error('Failed to fetch categories');
        }
    })
    .then((data) => {
        data.forEach(cat => {
            parent.appendChild(createOption(cat.name, capitalize(cat.name)));
        })
    })
    .catch(err => console.error(err))
}

export const createOption = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerHTML = text;
    return option;  
}