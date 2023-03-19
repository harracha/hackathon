import { motion } from "framer-motion";
import Footer from "~/components/footer/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import UserProtected from "~/components/protections/UserProtected";
import DeviceC from "./DeviceC";

const index = () => {
  return (
    <div>
      <DeviceC />
    </div>
  );
};

export default index;
