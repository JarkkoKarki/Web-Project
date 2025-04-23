import {Navigate} from 'react-router';
import { useUserContext } from './hooks/contextHooks';


const ProtectedRoute = ({children}) => {
  const {user} = useUserContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
