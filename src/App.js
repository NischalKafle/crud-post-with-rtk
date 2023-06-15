import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Post from './component/Post';
import Body from './component/Body';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Post />} />  
        <Route path="/body/:id" element={<Body />} />       
      </Routes>
    </div>
  );
}

export default App;
