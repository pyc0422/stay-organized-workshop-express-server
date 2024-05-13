export const capitalize = (str) => {
    const arr = str.split(" ");
    arr.forEach((word, i) => {
        arr[i] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return arr.join(" ");
}

export const renderNavBarAndLoggedUser = (page) =>{
    const h3 = document.querySelector('h3');
    const storaged = sessionStorage.getItem('user');
    const {name, username} = storaged ? JSON.parse(storaged) : {};
    var navHtml = `
        <nav class="bg-blue-300 w-screen">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
        
        <div class="flex flex-1 items-stretch justify-start">
            <div class="flex flex-shrink-0 items-center">
            <a href="/"><img class="h-8 w-auto" src="../imgs/logo.svg" alt="stay organized"></a>
            </div>
            <div class="sm:ml-6 sm:block">
            <div class="flex justify-center items-center sm:space-x-4">
                <a href="/" class="hidden sm:block ${page==='homepage' ? 'current-a' : 'nav-a'}">HomePage</a>
                ${name ? `<a href="/todos" class=${page==='todo' ? 'current-a' : 'nav-a'}>Tasks</a>` : ''}
                <a href="/newUser" class=${page==='newUser' ? 'current-a' : 'nav-a'}>New User</a>
            </div>
            
            </div>
        </div>
        ${name ? 
        `<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a href="/newTodo" class=${page === 'newTodo' ? 'current-a' : "add-new"}>
                <span class="text-md">+</span> New Task
            </a>
            <a class="nav-a ml-3 p-1" id="logout-btn">Logout</a>
        </div>`: ''}
        </div>
        </div>
        </nav>
        ${name && page !== 'homepage' ? `<h3 class="m-2 p-2 font-bold">Welcome <span style="color:rgb(3 105 161)">${capitalize(name)}</span></h3>` : ''}
        `
    document.body.insertAdjacentHTML('afterbegin', navHtml);
    const logoutBtn = document.getElementById('logout-btn');
    if(!logoutBtn) return;
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('user');
        alert(`${capitalize(name)} has been logged out!`)
        window.location.href = '/';
    })
}

export const createOption = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerHTML = text;
    return option;  
}

export function addClickFuncToFilters() {
    const allFilters = document.querySelectorAll('.filter')
    allFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            const cur = e.target
            console.log('cure  ',cur)
            const choice = cur.getAttribute('data-value')
            console.log('choice', choice)
            const type = cur.parentElement.id.split('-')[1]
            const colorClass = filterColor[choice] || 'bg-blue-300'
            if (cur.classList.contains(colorClass)) {
                cur.classList.remove(colorClass)
                filterObj[type] = filterObj[type].filter(cat =>cat!== choice)
            } else {
                cur.classList.add(colorClass)
                filterObj[type].push(choice)
            }
            renderTodos(user.id, user.name, filterObj)
        })
    })
}

