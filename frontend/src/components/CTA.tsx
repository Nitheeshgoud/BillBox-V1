import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
        <div className="absolute top-32 right-16 w-16 h-16 border border-white/20 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/20 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Ready to transform your business?</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to unlock the power of every transaction?
        </h2>
        
        <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
          Join hundreds of businesses that are cutting costs, delighting customers, and driving sustainable growth with BillBox.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300 text-lg px-8 py-4 shadow-hero group"
          >
            Sign Up for Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-4"
          >
            Schedule Demo
          </Button>
        </div>

        <div className="mt-12 text-white/60 text-sm">
          <p>✓ Free 14-day trial &nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp; ✓ Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;