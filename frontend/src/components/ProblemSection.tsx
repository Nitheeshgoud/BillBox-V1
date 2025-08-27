import { Button } from '@/components/ui/button';
import { TrendingDown, Users2, ArrowRight } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            The Paper Bill is a Dead.
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
Businesses lose millions of customer touchpoints daily by relying on paper bills.</p>
        </div>

        <div className="bg-gradient-card rounded-3xl p-8 sm:p-12 shadow-card">
          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Welcome to Bill Box
            </h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We transform this dead end into a powerful, two-way street for sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Stop Revenue Leakage
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  By replacing a mandatory paper cost with an affordable digital solution.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                <Users2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Build Customer Connections
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  By turning anonymous buyers into a valuable, addressable audience.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-hero group"
            >
              Learn How It Works
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;