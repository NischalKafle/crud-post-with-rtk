import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { editBody } from '../redux/postSlice';

const Body = () => {
  const [newEdit, setNewEdit] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleChange4 = (event) => {
    setNewEdit(event.target.value);
  };

  const handleSave = () => {
    if (newEdit.trim() === '') {
      alert('Please enter a new description.');
    } else {
      dispatch(editBody({ id: Number(id), body: newEdit }));
    }
  };

  return (
    <div style={{ border: '2px black solid', marginLeft: '200px', marginRight: '200px' }}>
      <div className="card-body">
        <h1>Enter new Description</h1>
        <div>
          <div style={{ display: 'flex', marginLeft: '200px', marginRight: '200px', marginTop: '20px' }}>
            <textarea onChange={handleChange4} rows={5} cols={80} />
          </div>
          <div style={{ display: 'flex', marginLeft: '400px', marginTop: '20px' }}>
            <Link to='/'>
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
