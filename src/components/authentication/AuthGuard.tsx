import useAuth from "hooks/useAuth";
import { Fragment, ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { urls } from "../../constants";

// component props interface
interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (localStorage.getItem("accessToken")) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Fragment>{children}</Fragment>;
  } else {
    // return <Login />;
    return <Navigate to={urls.signIn} />;
  }

  // if (requestedLocation && pathname !== requestedLocation) {
  //   setRequestedLocation(null);
  //   return <Navigate to={requestedLocation} />;
  // }
};

export default AuthGuard;
