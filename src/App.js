import { useState } from "react";
import axios from "axios";
import DashBoard from "./Dashboard";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      email,
    };

    try {
      let response;
      if (isLogin) {
        response = await axios.post(
          "http://3.23.130.250:4000/api/login",
          newUser
        );
        if (!response.data.success) {
          setError("login failed");
        } else {
          setIsLoggedin(true);
        }
      } else {
        response = await axios.post(
          "http://3.23.130.250:4000/api/signup",
          newUser
        );
        setIsLoggedin(true);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {!isLoggedin ? (
        <>
          <p></p>
          <button onClick={handler}>
            Not an user, click here to {!isLogin ? "Login" : "Signup"}
          </button>
          <form onSubmit={handleSubmit} class="login-form">
            <div className="form-ctrl">
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
            </div>
            <div className="form-ctrl">
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
            </div>
            {!isLogin && (
              <div className="form-ctrl">
                <label>
                  Email ID:
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
              </div>
            )}

            <button type="submit">{isLogin ? "Login" : "Sign up"}</button>
          </form>
          {error && <p>{error}</p>}
        </>
      ) : (
        <DashBoard />
      )}
    </>
  );
}

export default App;
