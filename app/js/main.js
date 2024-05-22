let add = document.querySelector('button');
let textfield = document.querySelector('.textfield');
let list = document.querySelector('ul');
let list_item = document.querySelectorAll('li');
let no_tasks = document.querySelector('.no-tasks');
let todo_list = [];

//Check or uncheck task
function listOperation(){
    list_item.forEach((item, index) => {
        generateEventListner(item, index);
        }
    );
}

function generateEventListner(item, index){
    item.addEventListener('click', function (){
        if(item.classList.contains('unchecked')){
            item.classList.replace('unchecked', 'checked');
            item.querySelector('img').src = '/assets/checked.png';
        }else{
            item.classList.replace('checked', 'unchecked');
            item.querySelector('img').src = '/assets/unchecked.png';
        }
    })

    item.querySelector('.cross').addEventListener('click', function(){
        item.remove();
        todo_list.splice(index, 1);
        console.log('leeennggtthhh::' + todo_list.length);
        if(todo_list.length == 0){
            no_tasks.classList.remove('display-none');
        }
        console.log(todo_list);
    })
}


add.addEventListener('click', function(){
    let todo = new Object();
    todo.title = textfield.value;
    todo.isActive = false;
    todo_list.push(todo);

    if(!no_tasks.classList.contains('display-none')){
        no_tasks.classList.add('display-none');
    }

    appendInList(todo.title);
    textfield.value = '';
})

function appendInList(title){
    let li = document.createElement('li');
    li.classList.add('unchecked');

    let checkboxImg = document.createElement('img');
    checkboxImg.classList.add('checkbox');
    checkboxImg.src = '/assets/unchecked.png';

    let p = document.createElement('p');
    p.textContent = title;

    let cross = document.createElement('img');
    cross.classList.add('cross');
    cross.src = '/assets/cross.svg';

    li.appendChild(checkboxImg);
    li.appendChild(p);
    li.appendChild(cross);

    list.appendChild(li);
    generateEventListner(li);
}

// function showList(){
//     todo_list.forEach(element => {
//         let element = document.createElement(li);
//         element.classList.add('unchecked');
        
//         list.appendChild()
//     });
// }

if(todo_list.length > 0){
    listOperation();
}