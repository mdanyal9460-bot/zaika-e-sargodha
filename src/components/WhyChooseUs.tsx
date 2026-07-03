import { Leaf, UtensilsCrossed, ShieldCheck, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      title: "Fresh Ingredients",
      description: "We source only the freshest, premium ingredients daily to ensure unmatched quality.",
      icon: <Leaf size={48} color="var(--color-primary)" />
    },
    {
      id: 2,
      title: "Authentic Recipes",
      description: "Generations-old traditional recipes that preserve the true taste of Pakistan.",
      icon: <UtensilsCrossed size={48} color="var(--color-primary)" />
    },
    {
      id: 3,
      title: "Premium Hygiene",
      description: "Prepared in a spotless, sanitized environment with the strictest hygiene protocols.",
      icon: <ShieldCheck size={48} color="var(--color-primary)" />
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Hot, fresh, and perfectly packaged food delivered right to your doorstep.",
      icon: <Clock size={48} color="var(--color-primary)" />
    }
  ];

  return (
    <section className="section container" style={{ backgroundColor: 'transparent' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2>Why Choose Zaika-e-Sargodha?</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          We believe that every meal should be a memorable experience. Here is why our customers trust us.
        </p>
      </div>

      <div className="grid-reasons">
        {reasons.map((reason) => (
          <div className="reason-card" key={reason.id}>
            <div className="reason-icon-wrapper">
              {reason.icon}
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
