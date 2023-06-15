import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, add, remove, editTitle, editBody } from '../redux/postSlice';
import { Link } from 'react-router-dom';

const Post = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [edit, setEdit] = useState('');
  const dispatch = useDispatch();

  const handleChange1 = (event) => {
    setTitle(event.target.value);
  };

  const handleChange2 = (event) => {
    setBody(event.target.value);
  };

  const handleChange3 = (event) => {
    setEdit(event.target.value);
  };

  const handleSave1 = (post) => {
    if (edit.trim() === '') {
      alert('Please enter a new title.');
    } else {
      dispatch(editTitle({ id: post.id, title: edit }));

    }

  };

  const posts = useSelector((state) => state.post.value.posts);
  const loading = useSelector((state) => state.post.loading);

  const handleAddPost = () => {
    if (title.trim()==='' || body.trim()===''){
        alert('Please enter complete values')
    }
    else{
    dispatch(
      add({
        id: posts[posts.length - 1].id + 1,
        title: title,
        body: body,
      })
    );
    setTitle('');
    setBody('');
  }
  };

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card" style={{ width: '25rem', border: '2px solid black', margin: 'auto' }}>
        <div className="card-body">
          <h5 className="card-title">Enter Title</h5>
          <textarea value={title} onChange={handleChange1} rows={1} cols={40} />
          <h5 className="card-title">Enter Description</h5>
          <textarea value={body} onChange={handleChange2} rows={4} cols={40} />
          <div style={{ display: 'flex' }}>
            <button className="btn btn-warning" onClick={handleAddPost} style={{ margin: '5px', marginLeft: '150px' }}>
              Add Post
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="card" style={{ width: '25rem', border: '2px solid black', margin: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <div>
                  <div style={{ display: 'flex' }}>
                    <textarea value={edit.id} onChange={handleChange3} rows={1} cols={40} />
                  </div>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave1(post)}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                  >
                    Edit Title
                  </button>
                  <div style={{ display: 'flex', marginLeft: '80px', marginTop: '20px' }}>
                    <Link to={`/body/${post.id}`}>
                      <button className="btn btn-warning" style={{ marginRight: '5px' }}>
                        Edit Description
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        dispatch(remove({ id: post.id }));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Post;

