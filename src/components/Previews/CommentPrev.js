import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/previews.scss'

function CommentPrev({ comment }) {

  const userId = comment.contributorId
  const mediaId = comment.mediaId

  const [username, setUsername] = useState("");
  const [mediaTitle, setMediaTitle] = useState("")
  const [mediaAuthor, setMediaAuthor] = useState("")

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `/api/user/id/${userId}`
        );
        setUsername(res.data.username)
      } catch (err) {
        console.log(err);
      }
    }
    const getMedia = async () => {
      try {
        const res = await axios.get(
          `/api/media/${mediaId}`
        );
        setMediaTitle(res.data.title)
        setMediaAuthor(res.data.author)
        console.log(res.data.title)
      } catch (err) {
        console.log(err);
      }
    };
    
    getUser()
    .then(
      getMedia()
    )  
  }, []);

  return (
    <div className='preview'>
    <div className='comment'>
      <h4>{username}</h4>
      <div className='content'>
      <Link to={`/media/${mediaId}`}><p className='mediaTitle'>{mediaTitle} by {mediaAuthor}: </p></Link>
      <p>{comment.comment}</p>
      <p className='likes'>Likes: {comment.likes}</p>
      </div>
    </div>
    </div>
  );
}

export default CommentPrev;
