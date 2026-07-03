import Header from "@/components/Header";

export const metadata = {
  title: 'Terms & Conditions | Zaika-e-Sargodha',
  description: 'Terms and Conditions for Zaika-e-Sargodha services.',
};

export default function TermsConditions() {
  return (
    <>
      <Header />
      <main className="container section" style={{ paddingTop: '150px', maxWidth: '800px' }}>
        <h1>Terms & Conditions</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ marginTop: '40px' }}>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and ordering from Zaika-e-Sargodha, you accept and agree to be bound by these terms and provisions.</p>
          
          <h3>2. Order Placement and Processing</h3>
          <p>Orders are subject to availability of ingredients. We reserve the right to cancel or modify orders if the requested items are out of stock. You will be notified immediately in such cases.</p>
          
          <h3>3. Pricing and Payments</h3>
          <p>All prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable taxes. Delivery charges may apply based on your location. Currently, we accept Cash on Delivery (COD) and direct bank transfers.</p>

          <h3>4. Delivery Times</h3>
          <p>While we strive to deliver within our 30-45 minute window, delivery times are estimates and may be affected by traffic, weather conditions, or high order volumes.</p>

          <h3>5. Food Allergies</h3>
          <p>If you have any food allergies, please specify them in the WhatsApp order message. While we take precautions, our kitchen handles nuts, dairy, and gluten.</p>
        </div>
      </main>
    </>
  );
}
