import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
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

  const router = useRouter();

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
        <Table
          objects={users || []}
          titles={{ password: "password", email: "email" }}
          onClick={(user) => {
            router.push("/user/" + user.id);
          }}
          actionRow={(user) => {
            return (
              <>
                <Button>
                  <Icon icon="burgerMenu" className="bg-accent-strong" />
                </Button>
              </>
            );
          }}
        ></Table>
      </div>
    </div>
  );
};

export default index;
