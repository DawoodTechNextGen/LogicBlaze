import '../globals.css';
import AdminAuthWrapper from './AdminAuthWrapper';

export const metadata = {
  title: 'LogicBlaze Admin Dashboard & CMS',
  description: 'Synex Home 01 design system admin dashboard for Site Kit analytics, RankMath SEO blog CMS, and leads.'
};

export default function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <AdminAuthWrapper>
      {children}
    </AdminAuthWrapper>
  );
}
