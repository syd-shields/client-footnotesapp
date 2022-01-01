import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Nav from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import './styles/pages.scss'


function ThisUser() {

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [currentUserId, setCurrentUserId] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    findCurrentUser()
  }, [])

  const findCurrentUser = async () => {
    try { const res = await axios.get('/api/user/email/' + currentUser.email)
    setCurrentUserId(res.data);
    console.log(res.data) } 
    catch (err) {
      console.log(err)
    }
  }

  const updateUsername = async () => {
  try{ const res = axios.put(`/api/user/${currentUserId}`, {
      username: username
    })
    console.log(username)}
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Nav />
      <div className='body'>
      <div className='this-user'>
      <div className='form'>
        <form onSubmit={
          (e) => {
            e.preventDefault()
            updateUsername()
            .then (
              () => {
                navigate('/home')
              }
            )
          }
        }>
          <label>Username:</label>
          <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name='username' 
          type="text"></input>
          <button type='submit'>Update Username</button>
          <br />
          <label>New Password:</label>
          <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          name='password' 
          type="text"></input>
          <button type='submit'>Update Password</button>
          <br />
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ThisUser;
