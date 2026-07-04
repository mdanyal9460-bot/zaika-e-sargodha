import UserDashboard from '@/components/UserDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Zaika-e-Sargodha',
  description: 'Manage your profile and view order history at Zaika-e-Sargodha',
};

export default function DashboardPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
      <UserDashboard />
    </main>
  );
}
