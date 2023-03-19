import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import AdminProtected from "~/components/protections/AdminProtected";
import { Table } from "~/components/table/Table";

type user = {
  id: string;
  body: string;
  httpMethod: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

const index = () => {
  const [users, setUsers] = useState<user[]>();

  const router = useRouter();

  async function load() {
    try {
      var users = await fetch("http://localhost:4000/user/admin/flagged")
        .then((res) => res.json())
        .then((json) => setUsers(json));
    } catch {}
  }

  useEffect(() => {
    load();
  }, []);
  return (
    <div className="h-screen w-screen bg-accent-strong">
      <Header />
      <AdminProtected>
        <div className="p-4 px-20">
          <div className="h-20% w-full bg-accent-strong p-4">
            <Link href="/admin-dashboard/user-managament/createUser">
              <Button>Add User</Button>
            </Link>
          </div>
          <div>
            <div className="">
              <Table
                objects={users || []}
                titles={{ body: "body", httpMethod: "http method", id: "id" }}
                onClick={(user) => {
                  router.push("/user/" + user.id);
                }}
                actionRow={(user) => {
                  return (
                    <>
                      <Button onClick={() => {}}>
                        <Icon icon="delete" className="bg-accent-strong" />
                      </Button>
                    </>
                  );
                }}
              ></Table>
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default index;
