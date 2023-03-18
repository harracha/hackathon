import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";

type connection = {
  id: string;
  connectionStatus: "ACTIVE" | "ARCHIVED" | "PENDING" | "FLAGGED";
};

const index = () => {
  const [users, setUsers] = useState<connection[]>();
  const [iterator, setIterator] = useState(1);

  const router = useRouter();

  async function load() {
    var connections = await fetch("http://localhost:4000/connection")
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }

  async function deleteUser(id: string) {
    const res = await fetch(`http://localhost:4000/connection/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIterator(iterator + 1);
  }

  useEffect(() => {
    load();
  }, [iterator]);
  return (
    <div className="h-screen w-screen bg-accent-strong">
      <Header />
      <div className="p-4 px-20">
        <div className="h-20% w-full bg-accent-strong p-4">
          <Link href="/admin-dashboard/connections/">
            <Button>Add User</Button>
          </Link>
        </div>
        <div>
          <div className="">
            <Table
              objects={users || []}
              titles={{ id: "id", connectionStatus: "Status" }}
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
  );
};

export default index;
