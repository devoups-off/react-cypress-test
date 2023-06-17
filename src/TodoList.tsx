import React, { useState } from 'react';

import './TodoList.scss';

interface Todo {
    id: number;
    text: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputText.trim() !== '') {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputText,
            };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    };

    const handleDeleteTodo = (todoId: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={inputText} onChange={handleInputChange} />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
