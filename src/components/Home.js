import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import Nav from './Nav';
import PostPreview from './PostPreview';

function Home() {
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/', {
      method: 'GET',
      'Content-Type': 'application/json',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setUser(data.user);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <Nav user={user} />
      {posts ? (
        posts.map((post) => {
          return (
            <Link to={'post/' + post._id} key={uniqid()}>
              <PostPreview post={post} />
            </Link>
          );
        })
      ) : (
        <div>No posts</div>
      )}
    </div>
  );
}

export default Home;
