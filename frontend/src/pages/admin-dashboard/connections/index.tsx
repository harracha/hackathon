import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import AdminProtected from "~/components/protections/AdminProtected";
import { Table } from "~/components/table/Table";

type connection = {
  id: string;
  connectionStatus: "ACTIVE" | "ARCHIVED" | "PENDING" | "FLAGGED";
};

type req = {
  id: string;
  body: string;
  httpMethod: "PUT" | "POST" | "GET" | "PATCH" | "DELETE";
};

const index = () => {
  const [users, setUsers] = useState<connection[]>();
  const [reqs, setReqs] = useState<req[]>();
  const [iterator, setIterator] = useState(1);
  const [id, setId] = useState("");

  const router = useRouter();

  async function load() {
    var connections = await fetch("http://localhost:4000/connection")
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }

  async function load2(id: string) {
    var connections = await fetch(`http://localhost:4000/connection/reqs/${id}`)
      .then((res) => res.json())
      .then((json) => setReqs(json));
  }

  useEffect(() => {
    load2(id);
  }, [id]);

  async function deleteUser(id: string) {
    const res = await fetch(`http://localhost:4000/connection/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIterator(iterator + 1);
  }

  async function flag(id: string) {
    try {
      const res = await fetch(`http://localhost:4000/connection/flag/${id}`, {
        method: "POST",
      });
    } catch {}
  }

  useEffect(() => {
    load();
  }, [iterator]);
  return (
    <div className="h-screen w-screen bg-accent-strong">
      <Header />
      <div className="h-full bg-accent-strong">
        <AdminProtected>
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
                  onClick={(connection) => {
                    setId(connection.id);
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
                <h1>Requests in selected connection</h1>
                {
                  <Table
                    objects={reqs || []}
                    titles={{
                      body: "body",
                      httpMethod: "http method",
                      id: "id",
                    }}
                    actionRow={(req) => {
                      return (
                        <>
                          <Button
                            onClick={() => {
                              flag(req.id);
                            }}
                          >
                            FLAG
                          </Button>
                        </>
                      );
                    }}
                  />
                }
              </div>
            </div>
          </div>
        </AdminProtected>
      </div>
    </div>
  );
};

export default index;
