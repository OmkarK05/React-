import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/createPost";

function HomePage() {
  let [posts, setPosts] = useState([]);
  let [comment, setComment] = useState("");
  let [postId, setPostId] = useState(null);
  let [comments, setComments] = useState({});

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios
      .get("http://localhost:8003/posts")
      .then((res) => {
        setPosts(res.data ? [...res.data] : []);
        console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:4001/comments")
      .then((res) => {
        console.log(res);
        setComments(res.data.comments ? res.data.comments : {});
      })
      .catch((err) => console.log(err));
  };

  let handleNewPostUpdate = (post) => {
    console.log(post);
    setPosts([...posts, post]);
  };

  let handleComment = (e) => {
    setComment(e.target.value);
  };

  let handleSubmitComment = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4001/posts/${postId}/comment`, {
        content: comment,
      })
      .then((res) => {
        let comment = res.data.comment;
        comments[postId] = comments[postId] || [];
        comments[postId] = [...comments[postId], comment];
        // setComments({ ...comments, postId: [...comments[postId], comment] });
        setComments({ ...comments });
        console.log(comments);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <CreatePost onNewPostUpdate={handleNewPostUpdate}></CreatePost>
      <div className="posts-container">
        {posts.length > 0 &&
          posts.map((post, i) => (
            <div className="card" key={post.id}>
              <div>
                <p>{post.title}</p>
              </div>
              <div>
                <p>Comments</p>
                <ul>
                  {comments[post["id"]] &&
                    comments[post["id"]].map((comment, i) => (
                      <li key={Comment["id"]}>{comment["content"]}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmitComment}>
                  <input
                    onChange={handleComment}
                    placeholder="Add Comment"
                  ></input>
                  <button type="submit" onClick={() => setPostId(post["id"])}>
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
