import './App.css';
import React from 'react';
import Create from './components/Create';
import Edit from './components/Edit';
import Show from './components/Show';
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<Show/> }/>
       <Route path="/create" element={<Create/> }/>
       <Route path="/edit/:id" element={<Edit/> }/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
