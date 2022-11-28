import react, { useState } from "react";

import { actions } from '../store'

export default function LoginPage({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        actions.loginUser(email, password)
    }

    function handleRegister() {
        actions.registerUser(email, password)
    }

    return (
        <div className="authContainer">
            <form onSubmit={handleSubmit}>
                <div className="authTitle">
                    <img className="authTitleIcon"></img>
                </div>
                <div className="authTitle">
                    <h3 className="authTitleText">Todo.My</h3>
                </div>
                <div className="authFields">
                    <div className="authEmailWrap">
                        <input
                            className="authEmail"
                            type='email'
                            placeholder="E-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="authPasswordWrap">
                        <input
                            className="authPassword"
                            type='password'
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>


                </div>
                <div className="authButtons">
                    <button className="signInBtn" type='submit'>Sign In</button>
                    <button className="signUpBtn" onClick={handleRegister}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}