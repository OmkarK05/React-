import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/createPost";

function HomePage() {
  let [posts, setPosts] = useState({});
  let [comment, setComment] = useState("");
  let [postId, setPostId] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios
      .get("http://localhost:4004/events")
      .then((res) => {
        console.log(res);
        setPosts(res.data ? { ...res.data } : {});
      })
      .catch((err) => console.log(err));
  };

  let handleNewPostUpdate = (post) => {
    console.log(post);
    let newPosts = { ...posts };
    newPosts[post["id"]] = post;
    setPosts(newPosts);
  };

  let handleComment = (e) => {
    setComment(e.target.value);
  };

  let handleSubmitComment = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4002/posts/${postId}/comment`, {
        content: comment,
      })
      .then((res) => {
        let updatedComment = res.data.comment;
        let postId = res.data.postId;
        let post = posts[postId];
        post["comments"] = post["comments"] || [];
        post.comments.push(updatedComment);
        setPosts({ ...posts });
      })
      .catch((err) => console.log(err))
      .finally(() => setComment(""));
  };

  return (
    <div>
      <CreatePost onNewPostUpdate={handleNewPostUpdate}></CreatePost>
      <div className="posts-container">
        <h3>Posts</h3>
        {posts !== {} &&
          Object.entries(posts).map(([key, value]) => (
            <div className="card" key={key}>
              <div>
                <p>{value.title}</p>
              </div>
              <div>
                <p>Comments</p>
                <ul>
                  {value["comments"] &&
                    value["comments"].length > 0 &&
                    value["comments"].map((comment, i) => (
                      <li key={Comment["id"]}>{comment["content"]}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmitComment}>
                  <input
                    value={comment}
                    onChange={handleComment}
                    placeholder="Add Comment"
                  ></input>
                  <button type="submit" onClick={() => setPostId(key)}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
