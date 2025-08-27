import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const CustomerHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/15 rounded-full blur-lg animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/10 rounded-full blur-lg animate-bounce delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Floating Headlines */}
        <div className="mb-8 pt-4">
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Every bill, automatically saved.
          </h1>
          
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Every rupee, instantly tracked.
          </h1>
        </div>

        {/* Sub-headline */}
        <p 
          className={`text-xl sm:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
          A paper bill here, an e-bill there. We have a better idea. Imagine your bills, expense tracking, 
          and warranties—all in one smart, secure app.
        </p>

        {/* Primary CTA */}
        <div 
          className={`mb-16 transition-all duration-1000 delay-900 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 h-auto font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 group border-0"
            onClick={() => window.location.href = '/auth'}
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              
              Create Your Free Account
            </span>
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default CustomerHero;