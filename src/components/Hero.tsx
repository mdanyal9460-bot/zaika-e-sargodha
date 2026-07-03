import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg">
        <Image 
          src="/hero.png" 
          alt="Authentic Pakistani Food" 
          fill 
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1>Authentic Homemade Pakistani Food</h1>
        <p>Freshly prepared with premium ingredients, delivered with care.</p>
        <div className="hero-buttons">
          <button className="btn-primary">Order Now</button>
          <button className="btn-secondary">View Menu</button>
        </div>
      </div>
    </section>
  );
}
