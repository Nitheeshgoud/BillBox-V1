import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'vendor' | 'customer' | 'Administrator';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { role, token } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        navigate('/signup');
        return;
      }
      
      if (requiredRole && role !== requiredRole) {
        // Redirect to appropriate dashboard based on role
        if (role === 'vendor') {
          navigate('/vendor-dashboard');
        } else if (role === 'customer') {
          navigate('/customer-dashboard');
        } else {
          navigate('/signup');
        }
        return;
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [token, role, requiredRole, navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;