import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header>
        <div className="header-wrapper">
            <h1 className="header-text">
                Users Activity
            </h1>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
