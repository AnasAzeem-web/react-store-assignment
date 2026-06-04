import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

function Home() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductsFromBackend() {
      const response = await fetch("http://localhost:8000/products");
      const data = await response.json();
      setProducts(data); 
    }
    fetchProductsFromBackend();
  }, []); 

  const addToCart = async (item) => {
    await fetch(`http://localhost:8000/cart/add/${item.id}`, {
      method: "POST"
    });
    setCart([...cart, item]); 
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

    const response = await fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 10000), 
        customer_name: "Guest Shopper",
        total_amount: totalCost
      })
    });

    if (response.ok) {
      alert("Success! Your order has been placed.");
      setCart([]); 
    }
  };

  const filteredItems = products.filter((item) => {
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
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <h2>🛒 Cart: {cart.length} items</h2>
          <button 
            onClick={handleCheckout}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Checkout
          </button>
        </div>
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