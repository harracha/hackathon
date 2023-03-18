import React, { useEffect, useState } from "react";
import Header from "~/components/header/Header";
import { Table } from "~/components/table/Table";

type user = {
  id: string;
  info: JSON;
  email: string;
  password: string;
  userRole: string;
  avatar: string;
  googleUserId: string;
  userStatus: string;
};

const index = () => {
  const [users, setUsers] = useState<user[]>();

  async function load() {
    var users = await fetch("http://localhost:4000/user")
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }

  useEffect(() => {
    load();
  }, []);
  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong">
        <Table />
      </div>
    </div>
  );
};

export default index;
