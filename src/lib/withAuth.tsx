import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  type HocProps = P & { isAuthenticated: boolean; user: any };

  const WithAuth = (props: HocProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const { pathname } = router;

    useEffect(() => {
      // check if the user is authenticated
      // set the isAuthenticated state and user state accordingly
    }, []);

    useEffect(() => {
      if (!isAuthenticated && pathname === "/signup") {
        // redirect the user to the login page
        router.push("/signup");
      } else {
        router.push("/login");
      }
    }, []);

    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  };

  WithAuth.displayName = "HOC_Auth";
  return WithAuth;
};

export default withAuth;
