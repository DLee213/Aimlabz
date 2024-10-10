import "./module.signin.css";
import { motion } from "framer-motion";
import AimLabzSVG from "./AimLabzSVG"

import { useState } from "react";

export const SignIn = ({ login, userName, setUserName }) => {
  const [blankUserName, setBlankUserName] = useState(false);

  function handleLogin(e) {
    e.preventDefault()
    setBlankUserName(false)

    if (userName.length > 0) {
      login();
    } else {
      setBlankUserName(true)
    }
  }

  return (
    <div className="signin-screen">
      <motion.div
        className="signin-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        drag
        dragConstraints={{ left: -400, right: 400, bottom: 300, top: -300 }}
      >
        <form className="form-container">
          {/* <h1 id="aimlabz">Welcome</h1> */}
          <label className="signin">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={blankUserName ? "blank-username" : "signin-input"}
          />
          <motion.button
            onClick={handleLogin}
            id="login-button"
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            Login
          </motion.button>
        </form>

        {blankUserName && <p id="error-message">Can not have an empty username</p>}
      </motion.div>

      <AimLabzSVG />
    </div>
  );
};
