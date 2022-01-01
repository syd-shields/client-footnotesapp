import { Link } from "react-router-dom";
import "./styles/previews.css";

function MediaPrev({ medium }) {
  return (
    <div className="preview">
      <div className="media">
          <Link to={`/media/${medium._id}`}>
            <h4>{medium.title}</h4>
          </Link>
          <div className='content'>
          <h5>{medium.author}</h5>
          <p>{medium.summary}</p>
          </div>
      </div>
    </div>
  );
}

export default MediaPrev;
