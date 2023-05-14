import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/user-context";
import SnackbarContext from "../../context/snackbar-context";

const Logout = () => {
  const snackbarContext = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
    snackbarContext.showMessage("You logged out successfully!");
  }, []);

  return null;
};
export default Logout;
