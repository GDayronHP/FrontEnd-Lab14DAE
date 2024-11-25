import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/Navigation";

function MainLayout({ title, children, items }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {items ? (
        <header>
          <Navigation items={items} />
        </header>
      ) : (
        ""
      )}
      {children}
    </React.Fragment>
  );
}

export default MainLayout;
