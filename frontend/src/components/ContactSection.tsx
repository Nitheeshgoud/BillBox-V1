import { Mail, Phone, MapPin } from 'lucide-react';
import { vendorContent, customerContent } from '@/data/content';
import { useAuth } from '@/contexts/AuthContext';

const ContactSection = () => {
  const {  role } = useAuth();
  const content = role === 'vendor' ? vendorContent : customerContent;

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {content.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.contact.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card rounded-lg shadow-card border border-border">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-card-foreground">Email Us</h3>
            <p className="text-muted-foreground">manoj@billbox.co.in</p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-card border border-border">
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-card-foreground">Call Us</h3>
            <p className="text-muted-foreground">+91 9392106502</p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-card border border-border">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-card-foreground">Visit Us</h3>
            <p className="text-muted-foreground">Hyderabad, India</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;