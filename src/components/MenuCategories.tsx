import Image from "next/image";

export default function MenuCategories() {
  const categories = [
    { id: 1, name: "Biryani", image: "/biryani.png" },
    { id: 2, name: "Pulao", image: "/biryani.png" },
    { id: 3, name: "Karahi", image: "/karahi.png" },
    { id: 4, name: "Handi", image: "/karahi.png" },
    { id: 5, name: "BBQ", image: "/karahi.png" },
    { id: 6, name: "Desserts", image: "/hero.png" },
  ];

  return (
    <section className="section container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2>Explore Our Menu</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          Discover the rich and authentic flavors of Pakistan across our specialized categories.
        </p>
      </div>

      <div className="grid-categories">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <div className="category-img-wrapper">
              <Image 
                src={cat.image}
                alt={cat.name}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="category-overlay">
                <h3>{cat.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
