import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Routes, Route, Link, NavLink, useMatch, Navigate } from "react-router-dom";

// import useStore from './hooks/useStore'

import { reducer, initialState, actions } from './store'
import DataContext from './context/data'

import TaskListContainer from './containers/TaskListContainer'
import SignInContainer from './containers/SignInContainer'

function App() {
  // const { state, actions } = useStore()

  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [state, dispatch]) //trouble here

  useEffect(() => {
    actions.setAuth(dispatch)
  }, [dispatch])

  useEffect(() => {
    if (state.user) {
      actions.getLists(state.user.uid, dispatch)
      actions.getTodos(state.user.uid, dispatch)
    }
  }, [dispatch, state.user])


  if (!state.user) {
    return <SignInContainer />
  } else {
    return (
      <DataContext.Provider value={contextValue}>
        <div className="App">
          <div className="header">
            <div className='headerText'>
              <h1>My ToDo list</h1>
            </div>
            <div className="headerUser">
              <h3>{state.user ? state.user.email : '---'}</h3>
              <button type='button' className="logout" title='Sign Out' onClick={() => actions.logoutUser()}>Sign Out</button>
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
                      <Link className="leftMenuLink" to={item.id}>{item.title}</Link>
                      {console.log(item)}
                    </li>
                  )}
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
