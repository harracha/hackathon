import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import AdminProtected from "~/components/protections/AdminProtected";
import { Table } from "~/components/table/Table";
import Connections from "./Connections";

const index = () => {
  return (
    <div className="h-screen w-screen bg-accent-strong">
      <Connections />
    </div>
  );
};

export default index;
