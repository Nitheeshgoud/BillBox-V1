import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        // Redirect to home page after logout
        navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
        // Even if there's an error, redirect to home
        navigate('/');
      }
    };

    handleLogout();
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Signing out...</p>
      </div>
    </div>
  );
};

export default LogoutPage; 