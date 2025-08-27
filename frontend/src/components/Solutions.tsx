import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt, Coffee, ShoppingCart, Smartphone, Heart, Package } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: Shirt,
      title: "Apparel & Department Stores",
      description: "Adapt to fast-changing fashion and retail trends."
    },
    {
      icon: Coffee,
      title: "Restaurants & Cafes",
      description: "Increase footfall and satisfaction with good food and a great experience."
    },
    {
      icon: ShoppingCart,
      title: "Grocery & Supermarkets",
      description: "Drive repeat business and increase basket size with targeted offers."
    },
    {
      icon: Smartphone,
      title: "Electronics & Gadgets",
      description: "Simplify warranties and build lasting customer relationships."
    },
    {
      icon: Heart,
      title: "Pharmacies & Wellness",
      description: "Provide better care with digital records and helpful reminders."
    },
    {
      icon: Package,
      title: "E-commerce & D2C",
      description: "Unify your online and offline customer experience seamlessly."
    }
  ];

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Built for every business that issues a bill.
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            From the local café to the national retail chain, Bill Box is the single platform to modernize your transactions and connect with your customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card-hover transition-all duration-300 bg-background border-border/50 hover:-translate-y-1 text-center"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {solution.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;