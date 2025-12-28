import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import icons
import "../styles.css/Todo.css";

export const Todo = ({ task, deleteTodo, editTodo }) => {  // Named export
    return (
        <div className="todo">
            <p>
                {task.task}
            </p>
            <div className="icons">
                <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={()=> editTodo(task.id)} />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={()=> deleteTodo(task.id)} />
            </div>
        </div>
    );
};
