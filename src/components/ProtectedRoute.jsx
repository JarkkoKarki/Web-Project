import {Navigate} from 'react-router';
import { useUserContext } from './hooks/contextHooks';


const ProtectedRoute = ({children, roles}) => {
  const {user} = useUserContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role === 'employee') {
      return <Navigate to="/workhub" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
