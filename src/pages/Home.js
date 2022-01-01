import { useState, useEffect } from "react";
import Comment from "../components/Data/Comment";
import Media from "../components/Data/Media";
import Nav from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";


function Home() {
  const { currentUser } = useAuth();

  const [library, setLibrary] = useState(false);
  const [media, setMedia] = useState([])
  const [displayButton, setDisplayButton] = useState("Switch to Library");
  const [comments, setComments] = useState([])

  const libraryHandler = () => {
    if (!library) {
      setDisplayButton("Switch to Activity");
      setLibrary(true);
    } else if (library) {
      setDisplayButton("Switch to Library");
      setLibrary(false);
    }
  };

  const getMedia = async () => {
    try{
        const res = await axios.get('/api/media');
        setMedia(res.data)
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

const getComments = async () => {
  try {
    const res = await axios.get('/api/comment')
    setComments(res.data)
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}

useEffect(() => {
    getMedia();
    getComments()
}, [])


  return (
    <div>
          <Nav />
          <div className='body'>
          <div className='home'>
          <div className='head'>
          <button className='btn' onClick={libraryHandler}>{displayButton}</button>
          <Link to='/myaccount'><button className='btn'>Edit Profile</button></Link>
          </div>
          <div className='activity-feed'>
          {library ? <div><h3>My Library:</h3></div> : <div><h3>Activity:</h3></div>}
          {library ? <Media media={media}/> : <Comment comments={comments}/>}
          </div>
          </div>
          </div>
    </div>
  );
}

export default Home;
