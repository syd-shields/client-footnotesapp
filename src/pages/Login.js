import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

function Login() {

const navigate = useNavigate()
    const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, signInWithGoogle } = useAuth();

  const signInWithGoogleHandler = async () => {
    signInWithGoogle();
  }
  return (
    <div>
  <Nav />
      <div className='body'>
      <div className='login'>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(email, password);

            login(email, password)
              .then((res) => {
                  console.log(res);
                  navigate('/home')
              })
              .catch((err) => console.log(err.message));
          }}
        >
          <label>Email:</label>
          <input
            ref={emailRef}
            value={email}
            onChange={(e) => {setEmail(e.target.value);
            console.log(e.target.value)}}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <br />
          <label>Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            autoComplete="password"
            required
          />
          <br />
          <div className='btns'>
          <button type="submit" className='login-btn'>Login</button>
          <p>or</p>
          <button className='google' onClick={signInWithGoogleHandler}>Login with Google</button>
          </div>
        </form>
        <div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
