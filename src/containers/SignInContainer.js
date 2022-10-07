import react, { useState } from "react";

import { actions } from '../store'

export default function LoginPage({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event){
        event.preventDefault()

        actions.loginUser(email, password)
    }

    function handleRegister(){
        actions.registerUser(email, password)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <input
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button type='submit'>Sign In</button>
                <button onClick={handleRegister}>Sign Up</button>
            </form>
        </div>
    )
}