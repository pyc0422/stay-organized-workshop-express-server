import { renderNavBarAndLoggedUser } from "./helper.js";
window.onload = () => {
    renderNavBarAndLoggedUser('homepage');
    const user = sessionStorage.getItem('user');
    
    const form = document.getElementById('login-form');
    if (user) {
        const dynamicDiv = document.getElementById('dynamic-div');
        form.classList.add('hidden')
       const welcome = document.createElement('h3');
       welcome.innerHTML = `Welcome back, ${JSON.parse(user).name}`
        dynamicDiv.innerHTML = 
        `
        <h3 class="m-2 p-2 font-bold">Welcome back <span style="color:rgb(3 105 161)">${JSON.parse(user).name}</span> !</h3>
        `
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target)
        const name = form['username'].value;
        const password = form['password'].value;
        if (!name || !password) {
            alert('Please fill in all fields');
            return;
        }
        fetch('/api/login', {method: 'POST', headers:{ "Content-Type": "application/json"}, body: JSON.stringify({name, password})})
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw res.json();
            }
        })
        .then((user) => {
            const {name, username, id} = user
            sessionStorage.setItem('user', JSON.stringify({id, name, username}))
            window.location.href = '/todos'
        })
        .catch(err => alert(err))
    })
}