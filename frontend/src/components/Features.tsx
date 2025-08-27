import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, Users, Target, Ticket, Mail } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Receipt,
      title: "E-Receipts",
      description: "Provide a faster, smarter checkout experience with instant digital receipts. Eliminate paper costs, reduce your carbon footprint, and give customers the convenience they expect."
    },
    {
      icon: Users,
      title: "Customer 360",
      description: "Get a holistic view of customer shopping behaviour. Understand who your most loyal customers are, what they buy, and how often they visit."
    },
    {
      icon: Target,
      title: "Segmentation",
      description: "Serve and retain every customer better. Group your customers based on their purchase history, visit frequency, or total spend to create highly effective campaigns."
    },
    {
      icon: Ticket,
      title: "Coupons & Promotions",
      description: "Create and run personalized promotions and targeted coupon campaigns on multiple channels to drive immediate sales and clear out inventory."
    },
    {
      icon: Mail,
      title: "Campaigns",
      description: "Run automated marketing campaigns on all channels, from Email to SMS and WhatsApp. Welcome new customers, win back old ones, and keep them coming back for more."
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            It's more than a receipt. It's a growth engine.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BillBox gives you the tools to not only eliminate paper but to understand, engage, and retain every customer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card-hover transition-all duration-300 bg-gradient-card border-border/50 hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;