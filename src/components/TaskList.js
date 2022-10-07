import React from "react";

import Task from './Task'

export default function TaskList({ list, todos, onUpdate, onDelete, onSelect}) {

    return (
        <div className='TaskList'>
            <div className='TaskListTitle'>
                {list.title}
            </div>
            <ul className='TaskListItems'>
                {todos.map(todo =>
                    <Task
                        key={todo.id}
                        todo={todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onSelect={onSelect}
                    ></Task>  
                )}
            </ul>
        </div>
    );
}