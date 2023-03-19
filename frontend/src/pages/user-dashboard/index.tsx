import { motion } from "framer-motion";
import Footer from "~/components/footer/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import Link from "next/link";
import UserProtected from "~/components/protections/UserProtected";
import UserDash from "./UserDash";

const index = () => {
  return (
    <div>
      <UserDash />
    </div>
  );
};

export default index;
