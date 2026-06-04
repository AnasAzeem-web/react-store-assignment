import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
  
        const response = await fetch(`http://localhost:8000/products/${id}`);
        
        if (!response.ok) {
          setItem(null); // Triggers the "Item not found" message if 404
        } else {
          const data = await response.json();
          setItem(data);
        }
      } catch (error) {
        console.error("Backend error:", error);
        setItem(null);
      } finally {
        setIsLoading(false); 
      }
    }

    fetchItem();
  }, [id]);

  if (isLoading) {
    return <div className="page empty-state">Loading item details...</div>;
  }

  if (!item) {
    return <div className="page empty-state">Item not found.</div>;
  }

  return (
    <main className="page detail-page">
      <Link to="/" className="back-link">
        ← Back to shop
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <span className="item-card-label">{item.category}</span>
            <h1 className="detail-name">{item.name}</h1>
            <p className="detail-desc">{item.description}</p>
          </div>

          <div className="detail-price">₹{item.price}</div>
        </div>

        <hr className="detail-divider" />

        <div className="detail-actions">
          <span className="item-meta">Fast shipping · 30-day returns</span>
        </div>
      </div>
    </main>
  );
}

export default ItemPage;