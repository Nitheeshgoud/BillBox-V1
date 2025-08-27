import ModernNavbar from '@/components/ModernNavbar';
import CustomerNavbar from '@/components/customer/CustomerNavbar';
import CustomerHero from '@/components/customer/CustomerHero';
import CustomerImageSection from '@/components/customer/CustomerImageSection';
import HowItWorks from '@/components/customer/HowItWorks';
import CustomerFeatures from '@/components/customer/CustomerFeatures';
import CustomerCTA from '@/components/customer/CustomerCTA';
import InteractiveHero from '@/components/InteractiveHero';
import PowerfulConnectionsSection from '@/components/PowerfulConnectionsSection';
import ProblemSection from '@/components/ProblemSection';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import Solutions from '@/components/Solutions';
import ContactSection from '@/components/ContactSection';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { role } = useAuth();

  if (role === 'customer') {
    return (
      <div className="min-h-screen">
        <CustomerNavbar />
        <CustomerHero />
        <CustomerImageSection />
        <HowItWorks />
        <CustomerFeatures />
        <CustomerCTA />
        <Footer />
      </div>
    );
  }

  // Vendor content (existing)
  return (
    <div className="min-h-screen">
     <ModernNavbar />
      <InteractiveHero />
      <PowerfulConnectionsSection />
      <ProblemSection />
      <section id="features" className="py-16 bg-background">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            It's more than a Bill. It's a growth engine.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BillBox gives you the tools to not only eliminate paper but to understand, engage, and retain every customer.
          </p>
        </div>
        <FeaturesSectionWithHoverEffects />
      </section>
      <Solutions />
      <ContactSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
