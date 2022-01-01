import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Nav from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import './styles/pages.scss'

function AddMedia() {
  const navigate = useNavigate();
  //media states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [medium, setMedium] = useState("");
  const [source, setSource] = useState("");
  const [summary, setSummary] = useState("");
  const [user, setUser] = useState("");
  const [tags, setTags] = useState("");

  //get current user
  const { currentUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(
        `/api/user/${currentUser.email}`
      );
      setUser(res.data);
      console.log(currentUser.email);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  //post new media to api
  const newMediaHandler = async () => {
    console.log(title);
    console.log(author);
    console.log(medium);
    console.log(source);
    console.log(summary);
    console.log(tags);
    console.log(user);
    try {
      const res = await axios.post(`/api/media/new/`, {
        title: title,
        author: author,
        medium: medium,
        source: source,
        summary: summary,
        tags: tags,
        contributor: user,
      });
      setUser(res.data.username);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div >
        <Nav />
        <div className='body'>
        <div className='add-media'>
        <div className='head'>
        <h2>Add Media</h2>
        </div>
        <div className='form'>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            newMediaHandler()
            .then(() => {
              navigate('/home')
            }
            )
            .catch((err) => console.log(err.message))
          }}
        >
          <label>Title:</label>
          <input
            value={title}
            name="title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <br />
          <label>Author:</label>
          <input
            value={author}
            name="Author"
            type="text"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          ></input>
          <br />
          <label>Medium:</label>
          <select
            value={medium}
            name="media"
            onChange={(e) => {
              setMedium(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="book">Book</option>
            <option value="article">Article</option>
            <option value="film">Film</option>
            <option value="song">Song</option>
            <option value="video">Video</option>
          </select>
          <br />
          <label>Source:</label>
          <input
            value={source}
            type="text"
            placeholder="paste link here..."
            onChange={(e) => {
              setSource(e.target.value);
            }}
          ></input>
          <br />
          <label>Summary:</label>
          <textarea
            value={summary}
            name="summary"
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          ></textarea>
          <br />
          <label>Tags:</label>
          <input
            value={tags}
            name="tags"
            type="text"
            placeholder="tags must be separated by a comma"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          ></input>
          <br />
          <button type="submit">Add Media</button>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedia;
