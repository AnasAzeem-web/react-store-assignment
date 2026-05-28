import React, { useState } from 'react';
import ItemCard from './ItemCard';

function Home() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [maxPrice, setMaxPrice] = useState(200); 

  const sampleItems = [
    { id: 1, name: "Wireless Headphones", price: 99, category: "Electronics" },
    { id: 2, name: "Mechanical Keyboard", price: 120, category: "Electronics" },
    { id: 3, name: "Coffee Mug", price: 15, category: "Home" }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]); 
  };

  const filteredItems = sampleItems.filter((item) => {
    
    const textMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const priceMatches = item.price <= maxPrice;
    
    return textMatches && priceMatches;
  });

  const themeStyles = {
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={themeStyles}>
      
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)} 
        style={{ marginBottom: '20px', padding: '10px 15px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: isDarkMode ? '#ffffff' : '#333333', color: isDarkMode ? '#000000' : '#ffffff', fontWeight: 'bold' }}
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isDarkMode ? '#333333' : '#f0f0f0', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Our Products</h2>
        <h2>🛒 Cart: {cart.length} items</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
        
        <input 
          type="text"  
          placeholder="Search items..." 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{ padding: '10px', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: isDarkMode ? '#444' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Max Price: ${maxPrice}</label>
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            style={{ cursor: 'pointer' }}
          />
        </div>

      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredItems.map((currentItem) => (
          <ItemCard key={currentItem.id} item={currentItem} addToCart={addToCart} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
}

export default Home;