import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerNavbar = () => {
  const { role, setRole } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <a href="/" className="text-xl font-bold text-foreground">
              Bill Box
            </a>
            
            {/* User Type Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={role === 'vendor' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRole('vendor')}
                className="text-xs px-4 py-1.5 h-8"
              >
                Vendors
              </Button>
              <Button
                variant={role === 'customer' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setRole('customer')}
                className="text-xs px-4 py-1.5 h-8"
              >
                Customers
              </Button>
            </div>
          </div>

          {/* Customer Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact Us
            </a>
          </div>

          {/* Customer Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="font-medium">
              Login
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/signup')} className="font-medium">
              Sign Up
            </Button>
            <Button size="sm" className="font-medium" onClick={() => window.open('https://play.google.com/store', '_blank')}>
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;