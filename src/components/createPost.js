import React, { useState } from "react";
import axios from "axios";

function CreatePost({ onNewPostUpdate }) {
  let [title, setTitle] = useState("");

  let handlePost = (e) => {
    setTitle(e.target.value);
  };

  let handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8003/post", {
        title,
        headers: {},
      })
      .then((res) => {
        setTitle("");
        onNewPostUpdate(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitForm}>
          <div>Create Post</div>
          <input onChange={handlePost} placeholder="Post"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
