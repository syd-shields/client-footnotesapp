import { Link } from 'react-router-dom';
import Nav from "../components/Navbar";
import './styles/pages.scss'


function Landing() {

    return (
        <div>
            <Nav />
            <div className='body'>
            <div className='landing'>
            <input type='text' className="searchLarge"></input>
            <div className='authOptions'>
            <Link to='/login'><button className='btn'>Login</button></Link>
            <p>or</p>
            <Link to='/signup'><button className='btn'>Sign Up</button></Link>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Landing;