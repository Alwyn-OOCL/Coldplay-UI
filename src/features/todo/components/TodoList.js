import TodoGenerator from "./TodoGenerator";
import TodoGroup from "./TodoGroup";
import '../css/TodoList.css';
import { useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
export default function TodoList() {
    const { loadTodos } = useTodos();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { loadTodos(); }, []);

    return (
        <div className='todo-list'>
            <h1>Todo List</h1>
            <TodoGroup />
            <TodoGenerator />
        </div>
    );
}