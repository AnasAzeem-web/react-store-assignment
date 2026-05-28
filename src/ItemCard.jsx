import React from 'react';

// We now accept the 'isDarkMode' variable from Home.jsx
function ItemCard({ item, addToCart, isDarkMode }) {
  
  // The card styles change depending on the theme
  const cardStyle = {
    border: isDarkMode ? '10px solid #555' : '10px solid #ccc',
    backgroundColor: isDarkMode ? '#0f0e0e' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    padding: '16px', 
    margin: '8px',
    borderRadius: '8px',
    width: '300px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={cardStyle}>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category}</p>
      
      <button 
        onClick={() => addToCart(item)} 
        style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', width: '100%' }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ItemCard;