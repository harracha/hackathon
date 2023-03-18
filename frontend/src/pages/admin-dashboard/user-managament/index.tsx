import Link from "next/link";
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
    try {
      var users = await fetch("http://localhost:4000/user")
        .then((res) => res.json())
        .then((json) => setUsers(json));
    } catch (error) {
      console.error(`Error while loading all users ${error}`);
    }
  }

  async function deleteUser(id: string) {
    const res = await fetch(`http://localhost:4000/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    load();
  }, []);
  return (
    <div className="h-screen">
      <div className="h-full w-screen bg-accent-strong">
        <Header />
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
                titles={{ password: "password", email: "email" }}
                onClick={(user) => {
                  router.push("/user/" + user.id);
                }}
                actionRow={(user) => {
                  return (
                    <>
                      <Button
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        <Icon icon="delete" className="bg-accent-strong" />
                      </Button>
                    </>
                  );
                }}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
