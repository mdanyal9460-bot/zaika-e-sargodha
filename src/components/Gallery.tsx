import Image from "next/image";

export default function Gallery() {
  const images = [
    { src: "/hero.png", alt: "Authentic Spread" },
    { src: "/biryani.png", alt: "Chicken Biryani Close-up" },
    { src: "/karahi.png", alt: "Chicken Karahi" },
    { src: "/biryani.png", alt: "Food Packaging" },
    { src: "/karahi.png", alt: "Fresh Ingredients" },
    { src: "/hero.png", alt: "Family Deals" },
  ];

  return (
    <section className="section container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2>Food Gallery</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          Feast your eyes on our culinary creations. We believe people eat with their eyes first.
        </p>
      </div>

      <div className="masonry-grid">
        {images.map((img, idx) => (
          <div className="masonry-item" key={idx}>
            {/* Standard img tag is often easier for masonry layouts since heights vary naturally */}
            <img 
              src={img.src} 
              alt={img.alt} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
