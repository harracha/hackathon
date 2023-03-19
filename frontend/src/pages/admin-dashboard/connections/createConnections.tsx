import React, { useState } from "react";
import { Button } from "~/components/button/Button";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import AdminProtected from "~/components/protections/AdminProtected";
import CreateConnectionsC from "./CreateConnectionsC";

const createUser = () => {
  return (
    <div>
      <CreateConnectionsC />
    </div>
  );
};

export default createUser;
