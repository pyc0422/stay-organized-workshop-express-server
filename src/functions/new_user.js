
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
        swal('<h3 class="font-bold text-xl">Please fill in all fields</h3>','','warning');
        return;
    }
    if (pw1 !== pw2) {
        swal('<h3 class="font-bold text-xl">Passwords do not match</h3>','','warning');
        return;
    }
    if (!checkUserName(username)) {
        swal('<h3 class="font-bold text-xl">Username already exists</h3>','','warning');
        return;
    }
    if (!checkPassword(pw1)) {
        swal('<h3 class="font-bold text-xl">Password not meet the requirement</h3>','','warning');
        return;
    }
    fetch(('/api/users'), {
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ name, username, password: pw1 })}
    )
    .then((res) => {
        if (res.status === 201) {
            swal('<h3 class="font-bold text-xl">New user created successfully</h3','','success')
            window.location.href = '/';
            return
        } else if (res.status === 403) {
            swal('<h3 class="font-bold text-xl">Username already exists</h3>','','warning');
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