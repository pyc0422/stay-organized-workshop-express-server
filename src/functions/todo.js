import { capitalize, renderNavBarAndLoggedUser } from "./helper.js";
import { renderUsersOptions, getTodoData, deleteTodo, updateTodoStatus, getCategories } from "./fetchData.js";
import { filterColor } from "./const.js";

var filterObj = {completed:[], category:[], priority:[]}
var user = {id: 'all', name: 'all'}

window.onload = () => {
    renderNavBarAndLoggedUser('todo');
    const urlParams = window.location.pathname.split('/');
    user.id = urlParams[urlParams.length - 1] ==='todos' ? JSON.parse(sessionStorage.getItem('user')).id : urlParams[urlParams.length - 1];
    renderUsersOptions(user.id, 'user-select');
    const select = document.getElementById("user-select")
    renderfilterCat()
    // render logged in user's todo list as default
    if (user.id !== 'all') {
        user.name = JSON.parse(sessionStorage.getItem('user')).name;
        renderTodos(user.id, user.name)
    } else {
        renderTodos('all')
    }
    // handle dynamic render todo by select different user
    select.addEventListener('change', (e) => {
        user.id = e.target.value;
        user.name = e.target.options[e.target.selectedIndex].text;
        renderTodos(user.id, user.name, filterObj);
    })
    // handle clier filter
    const clearFilter = document.getElementById('clear');
    clearFilter.addEventListener('click', () => {
        filterObj = {completed:[], category:[], priority:[]}
        const allFilters = document.querySelectorAll('.filter')
        allFilters.forEach(filter => {
            filter.classList.remove(...Object.values(filterColor))
        })
        renderTodos(user.id, user.name, filterObj)
    })
}

function renderfilterCat() {
    const filterCat = document.getElementById('filter-category');
    getCategories()
    .then(data => {
        data.forEach(category => {
            const name = category.name.split(" ")[0]
            const child = document.createElement('div');
            child.id = name+ '-filter';
            child.className = "filter px-2 border border-blue-300 border-2 hover:bg-blue-300 active:bg-blue-300"
            child.innerText = name
            child.setAttribute('data-value', category.name)
            filterCat.appendChild(child)
        })
        addClickFuncToFilters()
    })
    .catch(err => console.error(err))
}

function addClickFuncToFilters() {
    const allFilters = document.querySelectorAll('.filter')
    allFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            const cur = e.target
            const choice = cur.getAttribute('data-value')
            // get the type of filter from parent element id
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
function renderTodos(userId, name, filterObj){
    getTodoData(userId)
    .then((data) => {
        const todoList = document.getElementById('todo-list');
        const filter = document.getElementById('filter');
        // if no todo data hide filter secion and show message
        if (!data || !data.length) {
            todoList.innerHTML =
            `
            <div class="m-2 w-72">
                <h3 class="text-center">No Task found</h3>
                <h3 class="text-center">Try to create a new task for ${capitalize(name)}!</h3>
            </div>`;
            filter.classList.add('hidden');
            return
        } 
        filter.classList.remove('hidden');
        
        // filter data based on filterObj and resign the data
        for (const type in filterObj) {
            if (filterObj[type] && filterObj[type].length) {
                data = data.filter(todo => filterObj[type].includes(todo[type].toString()))
            }
        }
        // refresh todolist content with new render data
        todoList.innerHTML = ''
        data.forEach(todo => {
            const curCard = document.createElement('div');
            curCard.classList.add("todo-card");
            curCard.innerHTML = createToDoCard(todo);
            todoList.appendChild(curCard)
        });
        const deleteBtns = document.querySelectorAll('[id^="delete-"]');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', deleteTodo);
        });
        const checkboxes = document.querySelectorAll('.todo-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateTodoStatus);
        })
        
    })
}
        
function createToDoCard(todo) {
    const color = {
        high:'red',
        medium:'orange',
        low:'green'
    }
    const curColor = color[todo.priority.toLowerCase()]
    return `
        <div class="text-2xl p-2 cursor-pointer">
            <label>
                <input type="checkbox" id="todo-${todo.id}" class="todo-checkbox peer" ${todo.completed ? "checked" : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="todo-checkbox-icon" style="margin-top:-28px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </label>
        </div>
        <div class="flex flex-col gap-3 w-full">
            <div class="flex justify-between items-center gap-3 w-full">
                <div class="text-sm font-normal">${todo.description}</div>
                <div class="flex justify-center items-center gap-1">
                    <div style="background-color:${curColor}; height:0.75rem; width:0.75rem"></div>
                    <div class="text-xs font-light" style="color:${curColor}">${todo.priority}</div>     
                </div>
            </div>
            <div class="flex text-xs justify-between font-light items-center">
                <div class="flex gap-3 items-center justify-start">
                    <div class="bg-gray-200 px-1.5 py-0.5 rounded-md">${todo.deadline}</div>
                    <div class="text-gray-400">${todo.category.split(" ")[0] || todo.category}</div>
                </div
                <div class="justify-end"">
                    <svg id="delete-${todo.id}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"  class="w-6 h-6 border bg-gray-100 rounded-full border-gray-600 p-0.5 opacity-50 hover:opacity-80 cursor-pointer focus:opacity-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
            </div>        
        </div>
    ` 
}
