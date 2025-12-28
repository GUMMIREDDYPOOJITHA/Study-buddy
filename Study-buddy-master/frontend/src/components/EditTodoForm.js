import {React,useState} from "react";

const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);
    function handleTask(e){
        setValue(e.target.value);

    }
    function handleSubmit(e){
        e.preventDefault(); //To prevent page loading after adding
        if (value.trim()) { // Avoid adding empty tasks
            editTodo(value, task.id); 
            setValue(""); // Clear the input field after adding the task
          }
    }
    

    return(
        <form className="todo-form" onSubmit={handleSubmit}>
            <input type="text" className="input-text"  value={value} placeholder="Update todo" onChange={handleTask} />
            <button type="submit" className="add-task">Update Task</button>
        </form>
    )
}
export default EditTodoForm;