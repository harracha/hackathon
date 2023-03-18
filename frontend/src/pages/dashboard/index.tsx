import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";

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
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-accent-strong p-10">
      <Table
        objects={[{ stari: "alo" }, { stari: "asdf" }]}
        titles={{
          stari: "stari",
        }}
        actionRow={(user) => (
          <>
            <Button>
              <Icon icon="burgerMenu" className="bg-black" />
            </Button>
          </>
        )}
      />
    </div>
  );
};

export default index;
