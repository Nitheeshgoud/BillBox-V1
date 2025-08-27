import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect } from 'react';
//import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRole?: 'vendor' | 'customer';
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
//   const { user, profile, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate('/auth');
//     } else if (!loading && user && profile && requiredRole && profile.role !== requiredRole) {
//       // Redirect to appropriate dashboard if user has wrong role
//       navigate('/');
//     }
//   }, [user, profile, loading, navigate, requiredRole]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!user || (requiredRole && profile?.role !== requiredRole)) {
//     return null;
//   }

//   return <>{children}</>;
// };



const ProtectedRoute = ({children,requiredRole})=>{

  const navigate = useNavigate();
  const {role,token}=useAuth();
  if(!token){
    navigate('/login');
    return;
  }
  if(role!==requiredRole){
    navigate('/login');
    return;
  }
  return children;
}

export default ProtectedRoute;