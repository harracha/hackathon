import React from "react";
import Header from "~/components/header/Header";
import AdminProtected from "~/components/protections/AdminProtected";

const index = () => {
  return (
    <div>
      {" "}
      <Header />
      <AdminProtected>
        <div></div>
      </AdminProtected>
    </div>
  );
};

export default index;
