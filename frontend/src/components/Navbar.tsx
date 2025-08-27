import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              BillBox
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors duration-200">
              Features
            </a>
            <a href="#solutions" className="text-foreground hover:text-primary transition-colors duration-200">
              Solutions
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-200">
              Contact Us
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Login
            </Button>
            <Button className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-hero">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a
                href="#features"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#solutions"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                  Login
                </Button>
                <Button className="w-full bg-gradient-hero hover:opacity-90 transition-opacity">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;