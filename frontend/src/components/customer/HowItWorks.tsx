const HowItWorks = () => {
  const steps = [
    {
      step: "Step 1: Receive In-Store",
      description: "Get smart e-bills automatically from our growing network of partner stores."
    },
    {
      step: "Step 2: Sync Online", 
      description: "Securely connect your email and SMS to let Bill Box find and import your online invoices."
    },
    {
      step: "Step 3: Manage Your Expenses",
      description: "See your total monthly spend and exactly where your money goes. Bill Box automatically categorizes every purchase, giving you a clear financial overview."
    },
    {
      step: "Step 4: Stay Organized",
      description: "Enjoy a clutter-free financial life with every bill and receipt perfectly organized and always at your fingertips."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Know where your money goes. Automatically.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bill Box is the single, smart app that gathers all your bills automatically. Find any receipt 
            in seconds and see exactly where your money goes with our powerful expense management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {step.step}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;