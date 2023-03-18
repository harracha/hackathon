import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import AOS from "aos";
import Header from "~/components/header/Header";

const index = () => {
  const [asd, setAsd] = useState();
  const [s, setS] = useState("");

  async function load() {
    const asd = await fetch("http://jsonplaceholder.typicode.com/users");
    var us = await fetch("http://localhost:4000/user");
    us = await us.json();
    setS(JSON.stringify(us));
  }

  useEffect(() => {
    load();
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-screen w-screen flex-col justify-center bg-accent-strong p-2">
        <div className="flex h-full w-full  justify-start p-2">
          <div className="h-[10%] w-[100%] rounded-xl bg-accent "></div>
        </div>
      </div>
    </>
  );
};

export default index;
