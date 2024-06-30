import React from "react";
import Nav from "./Nav";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default Layout;
