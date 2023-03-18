import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import AOS from "aos";
import Header from "~/components/header/Header";

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
  const [asd, setAsd] = useState();
  const [s, setS] = useState<user>();

  async function load() {
    const asd = await fetch("http://jsonplaceholder.typicode.com/users");
    var us = await fetch("http://localhost:4000/user");
    us = await us.json();
    const f = JSON.stringify(us);
    setS(JSON.parse(f));
  }

  useEffect(() => {
    load();
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-screen w-screen flex-col justify-center bg-black p-2">
        <div className="p flex h-full  w-full justify-start">
          <div className="h-[10%] w-[100%] rounded-xl bg-accent-strong p-3 ">
            <h1 className="title1 text-info">Welcome back! {s?.email}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
