import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:8000/products");
        const data = await response.json();
        setItems(data); 
      } catch (error) {
        console.error("Failed to fetch from backend. Is Uvicorn running?", error);
      }
    }
    
    fetchProducts();
  }, []); 

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div>
          <p className="hero-eyebrow">Curated marketplace</p>
          <h1 className="hero-title">
            Discover premium products that feel made for you.
          </h1>
          <p className="hero-copy">
            Shop everyday favorites across home, tech, fitness, and lifestyle.
            Every item is selected for quality, value, and real usefulness.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="product-list">
        {items.map((item) => (
          <div key={item.id} className="product-line">
            <div>{item.name}</div>
            <div>{item.category}</div> 
            <div>₹{item.price}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;