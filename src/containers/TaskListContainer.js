import React, { useState, useEffect, useContext } from "react";
import { useParams, useMatch } from "react-router-dom";

import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import TaskDescription from '../components/TaskDescription'

import { actions } from '../store'
import DataContext from "../context/data";

export default function TaskListContainer() {
    const { state, dispatch } = useContext(DataContext)
    const [selectedTodo, setSelectedTodo] = useState(null)

    const { listId } = useParams()
    const match = useMatch(listId)

    console.log(state)
    console.log(match)

    // useEffect(() => {
    //     setSelectedTodo(null)
        
    //     if(match.pattern.path === 'all') {
    //         actions.getTodos(state.user.uid, dispatch)
    //     } else if(match.pattern.path === 'planned') {
    //         actions.getPlannedTodos(state.user.uid, dispatch)
    //     } else {
    //         actions.getListTodos(match.pattern.path, dispatch)
    //     }
        

    //     // if (match.pattern.path === 'all') {
    //     //     actions.get('todos')(collection => collection)
    //     //         .then(setTodos)
    //     // } else {
    //     //     actions.get('todos')(collection => collection
    //     //         /*.where('listId', '==', match.pattern.path)*/)
    //     //         .then(setTodos)
    //     // }

    // }, [dispatch, match.pattern.path])

    function handleSubmit(title) {
        actions.addTask({
            title,
            userId: state.user.uid,
            listId: list.id || '',
        }, dispatch)
    }

    function handleDelete(todoId) {
        console.log('Removed id: ', todoId)
        actions.deleteTask(todoId, dispatch)
    }

    function handleUpdate(todoId, data) {
        actions.updateTask(todoId, data, dispatch)
    }

    function handleSelect(todo) {
        setSelectedTodo(todo, dispatch)
    }

    const list = state.lists.find(list => list.id === match.pattern.path) || { title: 'Tasks'}
    const path = match.pattern.path

    const getTodosByFilter = ({
        'all': todos => todos.filter(todo => todo.listId == ''),
        'planned': todos => todos.filter(todo => todo.date)
    })

    const getTodosByList = (path, todos) => todos.filter(todo => todo.listId === path)

    let todos
    if(path !== 'all' && path != 'planned'){
        todos = getTodosByList(path, state.todos)
    } else {
        todos = getTodosByFilter[path](state.todos)
    }
    
    if (!list || !todos) {
        return (
            <div className="Loader">
                <div className="ContentLoading"></div>
            </div>
        );
    }

    // useEffect(()=>{
    //     const raw = localStorage.getItem('state.tasks') || []
    //     setState({tasks: JSON.parse(raw)})
    // }, [])

    // useEffect(()=>{
    //     localStorage.setItem('state.tasks', JSON.stringify(state.tasks))
    // }, [state])


    // const addTask = () => {
    //     if (taskTitle.current.value) {
    //         var arr = state.tasks
    //         arr.push({ id: arr.length, title: taskTitle.current.value, done: false })
    //         taskTitle.current.value = ""
    //         setState({ tasks: arr })
    //     }
    // }

    // const checkTask = (i) => {
    //     var arr = state.tasks
    //     arr[i].done = !arr[i].done
    //     setState({ tasks: arr })
    // }

    // const removeTask = (i) => {
    //     var arr = state.tasks
    //     arr.splice(i, 1)
    //     setState({ tasks: arr })
    // }

    // const eachElem = (item, i) => {
    //     return (
    //         <Task key={i} index={i} checkElement={checkTask} deleteElement={removeTask}>
    //             {item}
    //         </Task>
    //     );
    // }


    return (
        <div className='TaskListContainer'>
            <TaskList
                list={list}
                todos={todos}
                selectedTodo={selectedTodo}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            ></TaskList>
            <TaskForm
                onSubmit={handleSubmit}
            ></TaskForm>

            {selectedTodo &&
                <TaskDescription
                    todo={selectedTodo}
                    onClose={() => setSelectedTodo(null)}
                ></TaskDescription>
            }

        </div>

    );
}