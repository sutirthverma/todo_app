let key = 'list';
let add = document.querySelector('button');
let textfield = document.querySelector('.textfield');
let list = document.querySelector('ul');
let list_item = document.querySelectorAll('li');
let no_tasks = document.querySelector('.no-tasks');

let todo_list =
    localStorage.getItem(key) !== null
        ? JSON.parse(localStorage.getItem(key))
        : [];

todo_list.forEach((element, index) => {
    if (!no_tasks.classList.contains('display-none')) {
        no_tasks.classList.add('display-none');
    }
    appendInList(element.title, element.isActive, index)
});


add.addEventListener('click', function () {

    if (textfield.value.length <= 0) {
        return;
    }

    let todo = new Object();
    todo.title = textfield.value;
    todo.isActive = false;
    todo_list.push(todo);
    localStorage.setItem(key, JSON.stringify(todo_list));

    if (!no_tasks.classList.contains('display-none')) {
        no_tasks.classList.add('display-none');
    }

    appendInList(todo.title, todo.isActive, todo_list.length - 1);
    textfield.value = '';
})


function generateEventListner(item, index) {
    item.addEventListener('click', function () {
        if (item.classList.contains('unchecked')) {
            item.classList.replace('unchecked', 'checked');
            item.querySelector('img').src = '/assets/checked.png';
            console.log(index);
            todo_list[index].isActive = true;
            localStorage.setItem(key, JSON.stringify(todo_list));

        } else {
            item.classList.replace('checked', 'unchecked');
            item.querySelector('img').src = '/assets/unchecked.png';
            console.log(index);
            todo_list[index].isActive = false;
            localStorage.setItem(key, JSON.stringify(todo_list));

        }
    })

    if (todo_list.length > 0) {

        item.querySelector('.cross').addEventListener('click', function () {
            item.remove();
            todo_list.splice(index, 1);
            console.log('leeennggtthhh::' + todo_list.length);
            if (todo_list.length == 0) {
                no_tasks.classList.remove('display-none');
            }
            console.log(todo_list);
            localStorage.setItem(key, JSON.stringify(todo_list));

        })

    }
}

function appendInList(title, check, index) {
    let li = document.createElement('li');
    (check) 
        ? li.classList.add('checked')
        : li.classList.add('unchecked');

    let checkboxImg = document.createElement('img');
    checkboxImg.classList.add('checkbox');
    checkboxImg.src = (check) ? '/assets/checked.png' : '/assets/unchecked.png';

    let p = document.createElement('p');
    p.textContent = title;

    let cross = document.createElement('img');
    cross.classList.add('cross');
    cross.src = '/assets/cross.svg';

    li.appendChild(checkboxImg);
    li.appendChild(p);
    li.appendChild(cross);

    list.appendChild(li);
    generateEventListner(li, index);
}
