import Header from "@/components/Header";

export const metadata = {
  title: 'Refund Policy | Zaika-e-Sargodha',
  description: 'Refund and cancellation policy for Zaika-e-Sargodha.',
};

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <main className="container section" style={{ paddingTop: '150px', maxWidth: '800px' }}>
        <h1>Refund & Cancellation Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ marginTop: '40px' }}>
          <h3>1. Order Cancellations</h3>
          <p>You may cancel your order without penalty within 5 minutes of placing it via WhatsApp. Since our food is prepared fresh on demand, cancellations after preparation has started cannot be accepted.</p>
          
          <h3>2. Quality Issues & Refunds</h3>
          <p>We pride ourselves on our premium quality. If you receive an order that is incorrect, spoiled, or significantly delayed (beyond 90 minutes without prior notice), please contact us immediately upon receipt.</p>
          <p>We will evaluate the issue and, at our discretion, provide a replacement order or a full refund.</p>
          
          <h3>3. Non-Refundable Scenarios</h3>
          <p>We do not issue refunds for subjective taste preferences or if the food was not consumed immediately upon delivery, as freshness is paramount to our quality standards.</p>

          <h3>4. Processing Refunds</h3>
          <p>Approved refunds for prepaid orders will be processed back to the original payment method within 3-5 business days. For COD orders, a credit will be applied to your next order.</p>
        </div>
      </main>
    </>
  );
}
