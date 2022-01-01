import axios from "axios";
import { useRef, useState, } from "react";
import { useNavigate } from "react-router";
import Nav from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
  const navigate = useNavigate()
  const emailRef = useRef();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { currentUser, register, signInWithGoogle } = useAuth()

  const signUpWithEmailHandler = async () => {
    try {
      register(email, password)
      try{
        const res = await axios.post('/api/auth/signup', {
          username: email,
          email: email,
          })
          console.log(res)
       } catch (err) {
         console.log(err)
       }
       navigate('/create-account')
    }
    catch (err) {
      console.log(err)
    }
  }

  const signUpWithGoogleHandler = async () => {
    try {
        signInWithGoogle()
        try{
          const res = await axios.post('/api/auth/signup', {
            username: currentUser.email,
            email: currentUser.email
            })
            console.log(res)
         } catch (err) {
           console.log(err)
         }
        }
        catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Nav />
      <div className='body'>
      <div className='signup'>
      <form onSubmit={ async e => {
        e.preventDefault();
        console.log(email, password);
        signUpWithEmailHandler();  
    }}>
          <label>Email:</label>
          <input ref={emailRef} value={email} onChange={(e) => {setEmail(e.target.value); console.log(e.target.value)}} name='email' type='email' autoComplete='email' required />
          <br />
          <label>Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' type='password' autoComplete='password' required />
          <br />
          <div className='btns'>
          <button className='signup-btn' type='submit'>Sign Up</button>
          <p>or</p>
          <button className='google' clonClick={signUpWithGoogleHandler}>Sign Up with Google</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default SignUp;
