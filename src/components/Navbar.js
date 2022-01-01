import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Nav() {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  return (
    <div className='nav'>
      <Link to="/">
        <h1>footnotes*</h1>
      </Link>
      {currentUser && (
        <div className='nav-btns'><Link to="/">
          <button
            name="logout"
            onClick={async (e) => {
              e.preventDefault()
                navigate('/')
                logout()
              
              console.log("logout user");
            }}
          >
            logout
          </button>
        </Link>
        <Link to='/add-media'><button>+</button></Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
