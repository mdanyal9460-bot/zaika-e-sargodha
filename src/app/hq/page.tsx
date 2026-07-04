import HQDashboard from '@/components/HQDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mission Shadow 04 HQ | Admin Database',
  description: 'Classified Admin Control for Zaika-e-Sargodha',
};

export default function HQPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
      <HQDashboard />
    </main>
  );
}
