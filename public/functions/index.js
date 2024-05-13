import { renderNavBarAndLoggedUser } from "./helper.js";
window.onload = () => {
    renderNavBarAndLoggedUser('homepage');
    const form = document.getElementById('login-form');
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