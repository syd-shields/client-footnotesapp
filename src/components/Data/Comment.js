import CommentPrev from "../Previews/CommentPrev";
import MediaCommentPrev from '../Previews/MediaCommentPrev'

function Comment({stripComment, comments}) {
    return (
        <div>
            { stripComment ? 
                <div>
                {comments.map((comment) => (
                    <MediaCommentPrev comment={comment}/>
                  ))}
                </div> : <div> {comments.map((comment) => (
                    <CommentPrev comment={comment}/>
                ))}
                </div>
            }
        </div>
    )
}

export default Comment;