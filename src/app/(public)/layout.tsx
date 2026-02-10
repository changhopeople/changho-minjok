import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import AdvisorWidget from '@/components/shared/AdvisorWidget';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AdvisorWidget />
    </>
  );
}
