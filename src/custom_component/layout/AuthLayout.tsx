import type React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="min-h-screen bg-white">{children}</div>;
};

export default AuthLayout;
