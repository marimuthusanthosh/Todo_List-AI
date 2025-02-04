let tasks=[]; 

const addTask =()=>{
  const taskInput =document.getElementById('taskInput')
  const text = taskInput.value.trim()

  if(text){
    tasks.push({text:text,completed:false});

    updateTaskList();
  }

   
};
const updateTaskList =()=>{
  const taskList= document.getElementById('task-list')
  taskList.innerHTML=''
  tasks.forEach((task,index) =>{
    const listItem =document.createElement('li')

    listItem.innerHTML=`
    <div class="taskitem">  
    <div class="task  ${task.completed ? 'completed' : ''}">  
        <input type="checkbox" class="checkbox" />  
        <p>finish this project</p>  
    </div>  
    <div class="items">  
        <img src="./img/edit.png" />  
        <img src="./img/bin.png" />  
    </div>  
</div>
    `; 

    listItem.addEventListener('change',()=>toggletaskcomplete(index))
    taskList.append(listItem);
  })

}
document.getElementById('newTask').addEventListener('click',
  function(e){
    e.preventDefault()
    addTask();
  }


)