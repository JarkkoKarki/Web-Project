import { useEffect } from "react";
import { useUserContext } from "../components/hooks/contextHooks";


const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout(); // Call handleLogout after the component has mounted
  }, [handleLogout]);

  return <p>Logging out...</p>; // Optional: Show a message or redirect
};

export default Logout;
