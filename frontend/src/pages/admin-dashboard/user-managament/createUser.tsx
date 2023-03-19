import React, { useState } from "react";
import { Button } from "~/components/button/Button";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { useRouter } from "next/navigation";
import AdminProtected from "~/components/protections/AdminProtected";
import CreateUserC from "./CreateUserC";

const createUser = () => {
  return (
    <div>
      <CreateUserC />
    </div>
  );
};

export default createUser;
