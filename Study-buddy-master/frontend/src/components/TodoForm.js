import {React,useState} from "react";
import "../styles.css/TodoForm.css";
const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("");
    function handleTask(e){
        setValue(e.target.value);

    }
    function handleSubmit(e){
        e.preventDefault(); //To prevent page loading after adding
        if (value.trim()) { // Avoid adding empty tasks
            addTodo(value); 
            setValue(""); // Clear the input field after adding the task
          }
    }
    

    return(
        
        <form className="todo-form" onSubmit={handleSubmit}>
            <input type="text" className="input-text"  value={value} placeholder="What task should I finish?" onChange={handleTask} />
            <button type="submit" className="add-task">Add Task</button>
        </form>
    )
}
export default TodoForm;