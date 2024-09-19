import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './components/Landing';
import Proceed from './components/Proceed';
import Zipcode from './components/Zipcode';
import International from './components/International';
import IntlMap from './components/IntlMap';
import StateMap from './components/StateMap';
import Atlanta from './components/Atlanta';
import Admin from './components/Admin';
import Final from './components/FinalPage';
import AtlMap from './components/AtlMap';
import State from './components/State';

function App() {
  return (
    <BrowserRouter>
    <div className="App">  
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/proceed" element={<Proceed />} />
          <Route path="/zipcode" element={<Zipcode />} />
          <Route path="/international" element={<International />} />
          <Route path="/intlmap" element={<IntlMap />} />
          <Route path="/statemap" element={<StateMap />} />
          <Route path="/atlanta" element={<Atlanta />} />
          <Route path="/atlmap" element={<AtlMap />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/state" element={<State />} />
          <Route path="/finalpage" element={<Final />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
