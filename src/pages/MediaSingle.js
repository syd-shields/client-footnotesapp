import Nav from '../components/Navbar'
import Comment from '../components/Data/Comment'
import { useLocation } from 'react-router'
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './styles/pages.scss'

function MediaSingle() {
    const { currentUser } = useAuth();

    const stripComment = true;
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [medium, setMedium] = useState({});
    const [user, setUser] = useState('')
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

   useEffect(() => {
       if (currentUser) {fetchUser()
       getMedia().then(
           getComments()
       )
       }
   }, [currentUser])

   const getMedia = async () => {
    const res =  await axios.get(`/api/media/` + path);
    setMedium(res.data);
    console.log(medium)
   }

   const getComments = async () => {
    const res = await axios.get(`/api/comment/` + path);
    setComments(res.data)
    console.log(res.data)
   }

   const fetchUser = async () => {
    const res =  await axios.get(`/api/user/email/${currentUser.email}`);
    setUser(res.data);
    console.log(res.data)
   }

    const commentHandler = async () => {
        console.log(comment);
        console.log(user);
        console.log(path);
       try{
        const res = await axios.post('/api/comment/new', 
        {
            comment: comment,
            contributorId: user,
            mediaId: path
        });
        console.log(res);
       } catch (err) {
           console.log(err)
       }
    }


    return (
        <div>
           <Nav />
           <div className='body'>
           <div className='media-single'>
           <div className='media-block'>
            <h4>{medium.title}</h4>
            <h5>{medium.author}</h5>
            <p>{medium.summary}</p>
        </div>
            <div className='comment-block'>
            <Comment stripComment={stripComment} comments={comments}/>
            <div className='comment-form'>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    commentHandler()
                    .then(
                        getComments()
                    )
                    .then(
                        () => {
                            window.location.reload(false)
                        }
                    )
                    .catch((err) => console.log(err))
                  }}>
                    <textarea name='comment' onChange={(e) => setComment(e.target.value)}></textarea>
                    <button type='submit'>Comment</button>
                </form>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default MediaSingle;