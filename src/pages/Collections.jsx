import { useState, useEffect } from "react";

// ✂️ SURGERY 1: The massive hardcoded COLLECTIONS array is completely deleted.

export default function Collections() {
  // 🔌 SURGERY 2: The Memory Bank
  const [categories, setCategories] = useState([]);

  // ⚡ SURGERY 3: The Ignition Switch
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Knocks on the /categories door in FastAPI
        const response = await fetch("http://localhost:8000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <main className="page collections-page">
      <section className="page-hero">
        <p className="hero-eyebrow">Curated collections</p>
        <h1 className="hero-title">
          Ready-made collections for every room and routine.
        </h1>
        <p className="hero-copy">
          Explore thoughtfully grouped product sets with their own style, use
          case, and curated brand mix.
        </p>
      </section>

      <div className="collections-grid">
        {/* 🔄 SURGERY 4: Mapping over the real backend data */}
        {categories.map((category) => (
          <article className="collection-card" key={category.id}>
            <div className="collection-card-head">
              {/* Uses the 'name' from your Python database */}
              <h2>{category.name}</h2>
              {/* Fallback text since our Python DB doesn't have descriptions yet */}
              <p>Explore our premium selection of {category.name.toLowerCase()} designed for your everyday needs.</p>
            </div>
            
            <ul className="collection-features">
              <li>Premium quality</li>
              <li>Curated selection</li>
              <li>Top-rated items</li>
            </ul>
          </article>
        ))}
        
        {/* Optional: Show a message if the database is completely empty */}
        {categories.length === 0 && (
          <p>No categories found. Go to Swagger (POST /categories) to add some!</p>
        )}
      </div>
    </main>
  );
}