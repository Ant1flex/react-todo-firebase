// import * as api from '../api'



// export function loginUser(email, password) {
//     return api.loginUser(email, password).then(() => ({}))
// }

// export function logoutUser() {
//     return api.logoutUser().then(() => ({}))
// }

// export function registerUser(email, password) {
//     return api.registerUser(email, password).then(() => ({}))
// }

// export function setAuth() {
//     return dispatch => api.initAuth(user => {
//         return user ? dispatch({
//             type: 'LOGIN_USER',
//             payload: {
//                 user
//             }
//         }) : dispatch({
//             type: 'LOGOUT_USER'
//         });
//     });
// }



// export function getLists() {
//     return api.getLists()
//         .then(lists => ({
//             type: 'GET_LISTS',
//             payload: {
//                 lists
//             }
//         }))
// }

// export function getTodos() {
//     return api.getTodos()
//         .then(todos => ({
//             type: 'GET_TODOS',
//             payload: {
//                 todos
//             }
//         }))
// }

// export function getListTodos(listId) {
//     return api.getListTodos(listId)
//         .then(todos => ({
//             type: 'GET_LIST_TODOS',
//             payload: {
//                 todos
//             }
//         }))
// }

// export function addTask(data) {
//     return api.addTask(data)
//         .then(todo => ({
//             type: 'ADD_TODO',
//             payload: {
//                 todo
//             }
//         }))
// }

// export function updateTask(todoId, data) {
//     return api.updateTask(todoId, data)
//         .then(todo => ({
//             type: 'UPDATE_TODO',
//             payload: {
//                 todo
//             }
//         }))
// }

// export function deleteTask(todoId) {
//     return api.deleteTask(todoId)
//         .then(todoId => ({
//             type: 'DELETE_TODO',
//             payload: {
//                 todoId
//             }
//         }))
// }

