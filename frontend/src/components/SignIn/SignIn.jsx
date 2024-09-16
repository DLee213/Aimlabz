import './module.signin.css';
import { useState } from "react";


export const SignIn = ({ login, userName, setUserName }) => {

  return (
    <div className="signin-screen">
        <form>
            <label className="signin">Username:
                <input 
                    type="text"
                    value={userName}
                    onChange={(e) =>setUserName(e.target.value)}/>
            </label>
        </form>
        <hr/>

        <button 
          onClick={login}
          className="login-game-btn"
        >
          Login!
        </button>
    </div>
  )
}
