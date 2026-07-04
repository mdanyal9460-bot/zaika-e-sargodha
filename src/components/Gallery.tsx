"use client";

import Image from "next/image";
import { useMenuData } from '@/hooks/useMenuData';

export default function Gallery() {
  const { menuData, loading } = useMenuData();
  
  if (loading) return null;
  
  const allItems = menuData.flatMap(category => category.items).filter(item => item.isActive);
  const featuredIds = ['mc-3', 'mc-9', 'des-1', 'mc-7', 'mc-1', 'dl-1'];
  
  const images = featuredIds.map(id => {
    const item = allItems.find(i => i.id === id);
    return {
      src: item?.image || '/images/hero.png',
      alt: item?.name || 'Zaika-e-Sargodha Specialty'
    };
  });

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
          <div className="masonry-item" key={idx} style={{ position: 'relative', width: '100%', minHeight: '250px' }}>
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={idx === 0}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
