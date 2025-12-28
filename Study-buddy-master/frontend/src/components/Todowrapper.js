import { React, useState } from "react";
import TodoForm from "./TodoForm";
import { Todo } from "./Todo"; // Ensure correct import with curly braces
import "../styles.css/Todowrapper.css";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import Home from "./Home";
import "../styles.css/Home.css";
const Todowrapper = () => {
    const [todos, setTodos] = useState([]);

    // Function to add a new todo
    const addTodo = (todo) => {

        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };
    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    function editTodo(id) {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));

    }
    function editTask(task, id) {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    }



    return (
        <div className="wrapper" style={{ display: "flex" }}>
            <div className="left-column" style={{ flex: 1 }}>
               <Home />
            </div>
            <div className="right-column" >
                <h2>Get things done by today!!!</h2>
                <TodoForm addTodo={addTodo} />
                {todos.map((todo, index) => (
                    todo.isEditing ? (<EditTodoForm editTodo={editTask} task={todo} key={index} />

                    ) : (
                        <Todo
                            task={todo}
                            key={index}
                            // Pass the toggle function
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                        />
                    )))
                }
            </div>
        </div>
    );
};

export default Todowrapper;
