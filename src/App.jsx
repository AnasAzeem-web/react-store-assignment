import React, { useState } from 'react';
import Home from './Home';
import About from './pages/About'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      <nav style={{ padding: '15px', backgroundColor: '#222', color: 'white', display: 'flex', gap: '20px' }}>
        <h3 style={{ margin: 0 }}>My Store</h3>
        
        <button onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>Home</button>
        <button onClick={() => setCurrentPage('about')} style={{ cursor: 'pointer' }}>About</button>
      </nav>

      {currentPage === 'home' ? <Home /> : <About />}
    </div>
  );
}

export default App;