import {Navigate} from 'react-router';
import { useUserContext } from './hooks/contextHooks';


const ProtectedRoute = ({children, roles}) => {
  const {user} = useUserContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
