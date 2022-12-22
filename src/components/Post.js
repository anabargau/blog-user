import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import CommentForm from './CommentForm';
import Nav from './Nav';

function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/post/${params.id}`, {
      function: 'GET',
      'Content-Type': 'application/json',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
        setErrors(data.errors);
        setUser(data.user);
      })
      .catch((err) => console.log(err.message));
  });
  return (
    <div>
      <Nav user={user} />
      {post ? (
        <div>
          <div>{post.title}</div>
          <div>{post.date_formatted}</div>
          <div>{post.content}</div>
        </div>
      ) : (
        <div>No post</div>
      )}
      {comments ? (
        comments.map((comment) => {
          return (
            <div key={uniqid()}>
              <div>{comment.title}</div>
              <div>{comment.date_formatted}</div>
              <div>{comment.content}</div>
              <div>{comment.user}</div>
            </div>
          );
        })
      ) : (
        <div>No comments</div>
      )}
      {errors
        ? errors.map((error) => {
            return <div>{error.msg}</div>;
          })
        : null}
      <CommentForm id={params.id} />
    </div>
  );
}

export default Post;
