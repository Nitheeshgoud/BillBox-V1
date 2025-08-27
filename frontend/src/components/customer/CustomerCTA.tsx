import { Button } from '@/components/ui/button';

const CustomerCTA = () => {
  return (
    <section className="py-16 px-6 bg-primary/5">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready for a simpler, smarter life?
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Join thousands of users who have decluttered their wallets and taken control of their finances with Bill Box.
        </p>
        
        <Button size="lg" className="text-lg px-8 py-6 h-auto">
          Download the App for Free
        </Button>
      </div>
    </section>
  );
};

export default CustomerCTA;