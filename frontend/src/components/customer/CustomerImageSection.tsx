import { useEffect, useState } from 'react';

const CustomerImageSection = () => {
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
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Customer Hero Illustration with Side Content */}
        <div 
          className={`transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Side Content - Desktop Only */}
            <div className="hidden lg:block text-left max-w-xs">
              <ul className="space-y-4 text-white/80 text-lg">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  All your bills, one place.
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  Track spending, find receipts instantly.
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  Smart expense management, always organized.
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
              <img 
                src="/images/customer.png" 
                alt="BillBox financial management app illustration" 
                className="max-w-full h-auto rounded-lg shadow-2xl object-contain max-h-[500px] lg:max-h-[600px]"
                style={{ 
                  filter: 'contrast(1.1) brightness(1.05)',
                  clipPath: 'inset(10px 20px 10px 20px)'
                }}
              />
            </div>
          </div>

          {/* Mobile Content - Below Image */}
          <div className="lg:hidden mt-8 text-center">
            <ul className="space-y-3 text-white/80 text-lg inline-block text-left">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                All your bills, one place.
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                Track spending, find receipts instantly.
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                Smart expense management, always organized.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerImageSection;