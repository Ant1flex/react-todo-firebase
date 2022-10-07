import React, { useState } from "react";

export default function Task({ todo, onUpdate, onDelete, onSelect }) {

    function handleChange(completed) {
        onUpdate(todo.id, { completed: completed.target.checked })
    }

    return (
        <div>
            <li className='Task'>
                <label className="ChckbxWrapper">
                    <input type='checkbox' className='Chckbx' defaultChecked={todo.completed} onChange={handleChange} />
                    <label className="ChckbxCustom"></label>
                    {todo.title}
                </label>

                <button type='button' className='RemindBtn' onClick={() => onSelect(todo)} title='More Details'>📋</button>
                <button type='button' className='RmBtn' onClick={() => onDelete(todo.id)} title='Remove'>❌</button>
            </li>
        </div>


    );

}
