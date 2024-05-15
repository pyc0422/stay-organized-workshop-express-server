
import { renderNavBarAndLoggedUser } from "./helper.js";

window.onload = () => {
    renderNavBarAndLoggedUser('newUser');
    const form = document.getElementById('new-user-form');
    form.addEventListener('submit', (e) => handleNewUserSubmit(e));

}

function handleNewUserSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form['name'].value;
    const username = form['username'].value;
    const pw1 = form['pw1'].value;
    const pw2 = form['pw2'].value;
    if (!name || !username || !pw1 || !pw2) {
        alert('Please fill in all fields');
        return;
    }
    if (pw1 !== pw2) {
        alert('Passwords do not match');
        return;
    }
    if (!checkUserName(username)) {
        alert('Username already exists');
        return;
    }
    if (!checkPassword(pw1)) {
        alert('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 and 20 characters long');
        return;
    }
    fetch(('/api/users'), {
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ name, username, password: pw1 })}
    )
    .then((res) => {
        if (res.status === 201) {
            alert('New user created successfully')
            window.location.href = '/';
            return
        } else if (res.status === 403) {
            alert('Username already exists');
            return;
        }
    })
    .catch(error => console.error(error));
}

function checkPassword (pw) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{6,20}$/;
    return reg.test(pw);
}

async function checkUserName (username) {
    return fetch(`/api/username_available/${username}`)
    .then((res) => res.status === 200)
    .catch(err => console.error(err));
}