import logo from './logo.svg';
import './App.css';
import { Home } from './Component/Home';
import { useState } from 'react';
import { Profile } from './Component/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Detail } from './Component/Detail';
import { Offer } from './Component/offer';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Offer/>}  />
      <Route path='/profile' element={<Profile/>}  />
      <Route path='/detail' element={<Detail/>} />
      
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
