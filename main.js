//class task
class Task{
    constructor(message){
        this.message=message;
    }
}
var cnt=1;
//class Ui
class UI{

    static displayTasks(){
        const tasks = Store.getTasks();
        tasks.forEach((task) => UI.addTaskToList(task));
    }
    
    static addTaskToList(task){
        const li = document.querySelector('#todo-list');
        const row = document.createElement('tr');
        row.innerHTML="<td>"+task.message+"</td><td><a href='#' class='btn btn-danger'>DELETE</a></td>";
        cnt++;
        li.appendChild(row);
    }

    static deleteTask(e){
        e.parentElement.parentElement.remove();
        UI.showAlert('Task Deleted','success');
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = "alert alert-"+className;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.form');
        const form = document.querySelector('#task-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),2000);
    }

    static clearFields(){
        document.querySelector('#task').value = '';
    }
}

//class store
class Store{
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks')===null){
            tasks=[];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task){
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    static deleteTask(message){
        const tasks = Store.getTasks();
        tasks.forEach((task,index)=>{
            if(task.message==message){
                tasks.splice(index,1);
            }
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
}

//event: display all tasks
document.addEventListener('DOMContentLoaded',UI.displayTasks());

//event: add task
document.querySelector('#task-form'),addEventListener('submit',(e) => {
    e.preventDefault();
    const message = document.querySelector('#task').value;
    if(message===''){
        UI.showAlert('Please Fill Task','danger');
    }else{
        const task = new Task(message);
        UI.addTaskToList(task);
        Store.addTask(task);
        UI.showAlert("Task Added",'success');
        UI.clearFields();

    }
})
//event: delete task
document.querySelector('#todo-list').addEventListener('click',(e)=>{
    UI.deleteTask(e.target);
    Store.deleteTask(e.target.parentElement.previousElementSibling.textContent);
})