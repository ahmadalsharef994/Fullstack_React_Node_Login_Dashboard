import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div>

    <BrowserRouter>
    <Routes>
      <Route path="/login" exact element={<Login/>} />
      <Route path="/" exact element={<Login/>} />
      <Route path="/dashboard" exact element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
