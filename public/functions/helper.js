export const capitalize = (str) => {
    const arr = str.split(" ");
    arr.forEach((word, i) => {
        arr[i] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return arr.join(" ");
}

export const renderNavBarAndLoggedUser = (page) =>{
    const h3 = document.querySelector('h3');
    const {name, username} = JSON.parse(sessionStorage.getItem('user'));
    var navHtml = `
        <nav class="bg-blue-300 w-screen">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
        
        <div class="flex flex-1 items-stretch justify-start">
            <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="../imgs/logo.svg" alt="Your Company">
            </div>
            <div class="sm:ml-6 sm:block">
            <div class="flex justify-center items-center sm:space-x-4">
                <a href="/" class="hidden sm:block ${page==='homepage' ? 'current-a' : 'nav-a'}">HomePage</a>
                <a href="/todos" class=${page==='todo' ? 'current-a' : 'nav-a'}>Tasks</a>
                <a href="/newUser" class=${page==='newUser' ? 'current-a' : 'nav-a'}>New User</a>
            </div>
            
            </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a href="/newTodo" class="bg-blue-700 text-white hover:bg-gray-600 hover:text-white rounded-md px-5 py-2 text-sm font-medium">
                <span class="text-md">+</span> New Task
            </a>
            ${name && page !== 'homepage' ? '<a href="/" class="nav-a" id="logout-btn">Logout</a>' : ''}
        </div>
        </div>
        </div>
        </nav>
        ${name && `<h3 class="m-2 p-2 font-bold">Welcome <span style="color:rgb(3 105 161)">${capitalize(name)}</span></h3>`}
        `
    document.body.insertAdjacentHTML('afterbegin', navHtml);
}

