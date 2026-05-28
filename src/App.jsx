import React, { useState } from 'react';
import Home from './Home';
// 1. We import the About page from that 'pages' folder you noticed
import About from './pages/About'; 

function App() {
  // 2. We give App a memory. It starts by remembering "home"
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {/* 3. This is the Navigation Bar at the absolute top of the screen */}
      <nav style={{ padding: '15px', backgroundColor: '#222', color: 'white', display: 'flex', gap: '20px' }}>
        <h3 style={{ margin: 0 }}>My Store</h3>
        
        {/* These buttons are tripwires. Click them, and they change the memory */}
        <button onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>Home</button>
        <button onClick={() => setCurrentPage('about')} style={{ cursor: 'pointer' }}>About</button>
      </nav>

      {/* 4. THE SWITCHBOARD LOGIC */}
      {/* This reads: "If the memory says 'home', draw <Home />. Otherwise (:), draw <About />." */}
      {currentPage === 'home' ? <Home /> : <About />}
    </div>
  );
}

export default App;