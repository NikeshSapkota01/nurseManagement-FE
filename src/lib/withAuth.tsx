import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { parseToken } from "@/services/token";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  type HocProps = P & { isAuthenticated: boolean; user: any };

  const WithAuth = (props: HocProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const { pathname } = router;

    const hasToken = parseToken();

    useEffect(() => {
      if (!hasToken) {
        if (!isAuthenticated && pathname === "/signup") {
          // redirect the user to the login page
          router.push("/signup");
        } else {
          router.push("/login");
        }
      }

      if (
        (hasToken && router.pathname === "/login") ||
        (hasToken && router.pathname === "/signup")
      ) {
        router.push("/dashboard");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
