import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import AOS from "aos";
import Header from "~/components/header/Header";
import { Stack } from "../../components/page/Stack";
import { Section } from "../../components/page/Section";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminProtected from "~/components/protections/AdminProtected";
import AdminDashboard from "./AdminDashboard";

const index = () => {
  return (
    <div className="overflow-hidden">
      <AdminDashboard />
    </div>
  );
};

export default index;
