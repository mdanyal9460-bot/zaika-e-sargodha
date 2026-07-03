import Header from "@/components/Header";

export const metadata = {
  title: 'Privacy Policy | Zaika-e-Sargodha',
  description: 'Privacy Policy for Zaika-e-Sargodha.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container section" style={{ paddingTop: '150px', maxWidth: '800px' }}>
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ marginTop: '40px' }}>
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us when you place an order, including your name, delivery address, phone number, and order details. This is necessary to fulfill your food delivery.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>Your information is exclusively used to process your orders, communicate with you regarding your delivery (via WhatsApp or Phone), and improve our services. We do not sell your data to third parties.</p>
          
          <h3>3. Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.</p>

          <h3>4. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at order@zaikaesargodha.com or via WhatsApp at +92 300 0000000.</p>
        </div>
      </main>
    </>
  );
}
