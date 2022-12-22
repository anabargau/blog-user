import React from 'react';

function PostPreview(props) {
  const { post } = props;
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.date_formatted}</div>
    </div>
  );
}

export default PostPreview;
