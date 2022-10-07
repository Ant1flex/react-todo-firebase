import * as api from './api'

export function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload.user
            }

        case 'LOGOUT_USER':
            return {
                ...state,
                user: null
            }

        case 'GET_LISTS':
            return {
                ...state,
                // lists: [ ...state.lists, action.paload]
                lists: action.payload.lists
            }

        case 'GET_TODOS':
            return {
                ...state,
                todos: action.payload.todos
            }

        case 'GET_LIST_TODOS':
            return {
                ...state,
                todos: action.payload.todos
            }

        case 'ADD_TODO':
            return {
                ...state,
                todos: state.todos.concat(action.payload.todo)
            }

        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.todo.id) {
                        return {
                            ...todo,
                            ...action.payload.todo
                        }
                    }
                    return todo
                })
            }

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.todoId)
            }

        default:
            return state
    }

}

export const initialState = {
    user: null,
    lists: [],
    todos: []
}

export function loginUser(email, password, dispatch) {
    return api.loginUser(email, password)
}

export function logoutUser(dispatch) {
    return api.logoutUser()
}

export function registerUser(email, password, dispatch) {
    return api.registerUser(email, password)
}

export function setAuth(dispatch) {
    api.onAuth((user) => {
        if (user) {
            // User is signed in
            dispatch({
                type: 'LOGIN_USER',
                payload: {
                    user
                }
            })
        } else {
            // User is signed out
            dispatch({
                type: 'LOGOUT_USER'
            })
        }
    })

}

export function getLists(userId, dispatch) {
    return api.getLists(userId)
        .then(lists => dispatch({
            type: 'GET_LISTS',
            payload: {
                lists
            }
        }))
}

export function getTodos(userId, dispatch) {
    return api.getTodos(userId)
        .then(todos => dispatch({
            type: 'GET_TODOS',
            payload: {
                todos
            }
        }))
}

// export function getPlannedTodos(userId, dispatch) {
//     return api.getPlannedTodos(userId)
//         .then(todos => dispatch({
//             type: 'GET_TODOS',
//             payload: {
//                 todos
//             }
//         }))
// }

export function getListTodos(listId, dispatch) {
    return api.getListTodos(listId)
        .then(todos => dispatch({
            type: 'GET_LIST_TODOS',
            payload: {
                todos
            }
        }))
}

export function addTask(data, dispatch) {
    return api.addTask(data)
        .then(todo => dispatch({
            type: 'ADD_TODO',
            payload: {
                todo
            }
        }))
}

export function updateTask(todoId, data, dispatch) {
    return api.updateTask(todoId, data)
        .then(todo => dispatch({
            type: 'UPDATE_TODO',
            payload: {
                todo
            }
        }))
}

export function deleteTask(todoId, dispatch) {
    return api.deleteTask(todoId)
        .then(todoId => dispatch({
            type: 'DELETE_TODO',
            payload: {
                todoId
            }
        }))
}

export const actions = {
    loginUser,
    logoutUser,
    registerUser,
    setAuth,
    getLists,
    getTodos,
    // getPlannedTodos,
    getListTodos,
    addTask,
    updateTask,
    deleteTask
}

