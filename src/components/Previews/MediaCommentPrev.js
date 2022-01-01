import axios from "axios";
import { useState, useEffect } from 'react'
import './styles/previews.scss'

function MediaCommentPrev({comment}) {
    const userId = comment.contributorId

    const [ user, setUser ] = useState('')
    const [ newLike, setNewLike] = useState(comment.likes)
    
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const res = await axios.get('http://localhost:8000/api/user/id/' + userId)
        setUser(res.data.username)
        console.log(res.data.username)
    }

    const likeHandler = async () => {
        const res = await axios.put(`http://localhost:8000/api/comment/${comment._id}`, {
            likes: (comment.likes) + 1
        })
        setNewLike(res.data.likes)
        console.log(res.data.likes)
    }
    
    return(
        <div className='preview'>
        <div className='comment-strip'>
            <h4>{user}</h4>
            <p>{comment.comment}</p>
            <p>{newLike}</p>
            <button type='submit' onClick={() => {likeHandler()}}></button>
        </div>
        </div>
    )
}

export default MediaCommentPrev;