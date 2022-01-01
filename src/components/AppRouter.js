import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import MediaSingle from '../pages/MediaSingle';
import ThisUser from '../pages/ThisUser';
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import CreateAccount from '../pages/CreateAccount';
import { useAuth } from '../contexts/AuthContext';
import AddMedia from '../pages/AddMedia';

function AppRouter() {
    const { currentUser } = useAuth();
  return (
    <Routes>
      <Route exact path='/' element={ !currentUser ? <Landing /> : <Navigate replace to='/home'/>}></Route>
      <Route exact path='/login' element={ !currentUser ? <Login /> : <Navigate replace to='/home'/>}></Route>
      <Route exact path='/signup' element={ !currentUser ? <SignUp /> : <Navigate replace to='/home'/>}></Route>
      <Route exact path='/home' element={ currentUser ? <Home /> : <Navigate replace to='/'/>}></Route>
      <Route exact path='/media/:id' element={ currentUser ? <MediaSingle /> : <MediaSingle />}></Route>
      <Route exact path='/profile' element={ currentUser ? <Profile /> : <Navigate replace to='/'/>}></Route>
      <Route exact path='/myaccount' element={ currentUser ? <ThisUser /> : <Navigate replace to='/'/>}></Route>
      <Route exact path='/forgot-password' element={<ForgotPassword />}></Route>
      <Route exact path='/reset-password' element={<ResetPassword />}></Route>
      <Route exact path='/create-account' element={currentUser ? <CreateAccount /> : <Navigate replace to='/signup'/> }></Route>
      <Route exact path='add-media' element={ currentUser ? <AddMedia /> : <Navigate replace to='/signup'/> }></Route>
      <Route exact path='/*' element={<NotFound />}></Route>
    </Routes>
  )
}

export default AppRouter;
