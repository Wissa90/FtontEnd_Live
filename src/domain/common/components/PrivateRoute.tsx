import { Navigate, Outlet } from "react-router-dom";

import { isUserLoggedIn } from "../../auth/auth.api";

const PrivateRoute = () => {
  return isUserLoggedIn() ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export { PrivateRoute };
