import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { vendorContent, customerContent } from '@/data/content';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const { role, setRole, token,setToken } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
   setRole("");
   setToken(null)
    navigate('/');
  };

  if (role && token) {
    return (
      <div className="hidden md:flex items-center space-x-3">
        <span className="text-sm text-muted-foreground">
          Welcome, User
          {/* {email or username should be visibel} */}
        </span>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="font-medium">
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-3">
      <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="font-medium">
        Log in
      </Button>
      <Button size="sm" onClick={() => navigate('/signup')} className="font-medium">
        Sign up
      </Button>
    </div>
  );
};

const ModernNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { role, setRole } = useAuth();
  
  const content = role === 'vendor' ? vendorContent : customerContent;
  const features = content.features;
  const solutions = content.solutions;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <a href="/" className="text-xl font-bold text-foreground">
              BillBox
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

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            
            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'features' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-card rounded-lg shadow-xl border border-border p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {features.map((category) => (
                      <div key={category.category}>
                        <h3 className="font-semibold text-foreground mb-3">{category.category}</h3>
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <a 
                              key={item.name}
                              href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block p-2 rounded hover:bg-muted transition-colors"
                            >
                              <div className="font-medium text-sm text-foreground">{item.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[500px] bg-card rounded-lg shadow-xl border border-border p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {solutions.map((category) => (
                      <div key={category.category}>
                        <h3 className="font-semibold text-foreground mb-3">{category.category}</h3>
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <a 
                              key={item.name}
                              href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block p-2 rounded hover:bg-muted transition-colors"
                            >
                              <div className="font-medium text-sm text-foreground">{item.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <AuthButtons />

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

export default ModernNavbar;