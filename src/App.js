import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Routes, Route, Link, NavLink, useMatch, Navigate } from "react-router-dom";

// import useStore from './hooks/useStore'

import { reducer, initialState, actions } from './store'
import DataContext from './context/data'

import TaskListContainer from './containers/TaskListContainer'
import SignInContainer from './containers/SignInContainer'

import moment from 'moment'

function App() {
  // const { state, actions } = useStore()

  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [state, dispatch]) //trouble here

  const format = 'DD-MM-YYYYTH:mm'

  useEffect(() => {
    actions.setAuth(dispatch)
  }, [dispatch])

  useEffect(() => {
    if (state.user) {
      actions.getLists(state.user.uid, dispatch)
      actions.getTodos(state.user.uid, dispatch)
    }
  }, [dispatch, state.user])


  const [isListFormOpen, setListFormOpen] = useState(false)
  const [listTitle, setListTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    actions.addList({
      title: listTitle,
      userId: state.user.uid
    }, dispatch).then(() => {
      setListTitle('')
      setListFormOpen(false)
    })
  }

  function handleChange(event) {
    setListTitle(event.target.value)
  }

  function handleDelete(listId) {
    state.todos.map(todo => (todo.listId === listId) && actions.deleteTask(todo.id, dispatch))
    console.log('Removed list id: ', listId)
    actions.deleteList(listId, dispatch)
  }

  // useEffect(() => {
  //   state.todos.map(todo =>
  //     setInterval(() => {
  //       if (todo.date !== '') {
  //         console.log(todo.title + ' tick')
  //         console.log(moment().format(format) + ' now')
  //         console.log(moment(todo.date).format(format))
  //         if (moment(todo.date).format(format) === moment().format(format)) {
  //           console.log('REMIND!!!')
  //           console.log('REMIND!!!')
  //           console.log('REMIND!!!')
  //           console.log('REMIND!!!')
  //           console.log('REMIND!!!')
  //         }
  //       }
  //     }, 30000)
  //   )
  // })


  if (!state.user) {
    return <SignInContainer />
  } else {
    return (
      <DataContext.Provider value={contextValue}>
        <div className="App">
          <div className="header">
            <div className='headerText'>
              <h1>Todo.My</h1>
            </div>
            <div className="headerUser">
              <h3>{state.user ? state.user.email : '---'}</h3>
              <button type='button' className="logoutBtn" title='LogOut' onClick={() => actions.logoutUser()}>LogOut</button>
            </div>

          </div>

          {/* <Routes>
            <Route path='/login' element={
              !state.user
                ? <SignInContainer />
                : <Navigate replace to='/' />
            }
            />
          </Routes> */}

          <div className="content">
            <div className="dropDown">
              <button className="dropBtn"></button>
              <div className="leftMenu">
                <ul className="leftMenuList">
                  <li className="leftMenuListElem">
                    <Link className="leftMenuLink" to="/all">Tasks</Link>
                  </li>
                  <li className="leftMenuListElem">
                    <Link className="leftMenuLink" to="/planned">Planned</Link>
                  </li>
                  <hr className="leftMenuSeparator"></hr>
                  {state.lists.map(item =>
                    <li className="leftMenuListElem" key={item.id}>
                      <Link className="leftMenuLink" to={item.id}>
                        <div>{item.title}</div>
                        <button type='button' className='RemClBtn' onClick={() => { handleDelete(item.id) }} >✖</button>
                      </Link>

                    </li>
                  )}
                  <li className="leftMenuListElem">
                    <div>
                      <form onSubmit={handleSubmit}>
                        <input
                          className="InputList"
                          type='text'
                          placeholder=' New list...'
                          value={listTitle}
                          onChange={handleChange}
                          style={{ width: '100%' }}
                        ></input>
                      </form>
                    </div>

                  </li>
                </ul>
              </div>
            </div>
            <div className="lists">
              <Routes>
                <Route path='/:listId' element={<TaskListContainer />} />
                <Route path='/login' element={<SignInContainer />} />
                <Route path='/:listId/:todoId?' element={<TaskListContainer />} />
              </Routes>
            </div>
          </div>
        </div>
      </DataContext.Provider>
    )
  }
}

export default App;
