const CustomerFeatures = () => {
  const features = [
    {
      title: "The Unified Smart App",
      description: "All your bills, one app. Bill Box automatically collects your e-bills from stores and syncs online invoices from places like Amazon, Zomato, and Uber."
    },
    {
      title: "Instant Search",
      description: "Find any receipt, instantly. Need to return an item, claim a warranty, or track an expense? Just type a keyword and find the exact receipt you need in seconds."
    },
    {
      title: "Smart Expense Tracking",
      description: "Finally understand your spending. Bill Box automatically categorizes every purchase, showing your total monthly spend and exactly where your money goes—from groceries to dining out. It's the clear financial overview you've been missing."
    },
    {
      title: "Secure & Private",
      description: "Your data is yours. Period. We use bank-level security to protect your information and will never share your personal data. Your privacy is our highest priority."
    }
  ];

  return (
    <section id="features" className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Life, simplified.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Feature {index + 1}: {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeatures;