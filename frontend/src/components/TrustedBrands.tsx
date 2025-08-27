const TrustedBrands = () => {
  // Placeholder brand names for demonstration
  const brands = [
    "TechCorp", "RetailMax", "FoodieChain", "StyleHub", 
    "HealthPlus", "GadgetWorld", "QuickMart", "CafeBlend"
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-8">
            Trusted by hundreds of businesses worldwide
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-hero rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {brand.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {brand}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;