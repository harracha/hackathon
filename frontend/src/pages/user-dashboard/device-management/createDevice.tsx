import React, { useState } from "react";
import { Button } from "~/components/button/Button";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { useRouter } from "next/navigation";
import UserProtected from "~/components/protections/UserProtected";
import DeviceCreate from "./DeviceCreate";

const createUser = () => {
  return (
    <div>
      <DeviceCreate />
    </div>
  );
};

export default createUser;
