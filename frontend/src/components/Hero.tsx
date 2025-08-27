import { Button } from '@/components/ui/button';
import AnimatedText from './AnimatedText';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const dynamicTexts = ["An opportunity.", "An insight.", "A connection."];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Every bill.
        </h1>
        
        <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/90 mb-8 h-16 flex items-center justify-center">
          <AnimatedText texts={dynamicTexts} />
        </div>
        
        <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Use BillBox: Decrease your operational costs, increase your sales.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300 text-lg px-8 py-4 shadow-hero"
          >
            Start Free Trial
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-4"
          >
            Watch Demo
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;