import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import AOS from "aos";
import Header from "~/components/header/Header";
import { Stack } from "../../components/page/Stack";
import { Section } from "../../components/page/Section";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminProtected from "~/components/protections/AdminProtected";

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
  const [users, setUsers] = useState<user[]>();

  const router = useRouter();

  async function load() {
    const asd = await fetch("http://jsonplaceholder.typicode.com/users");
    var us = await fetch(
      "http://localhost:4000/user/f7536653-e120-405c-8b41-34314a358565"
    )
      .then((res) => res.json())
      .then((json) => setS(json));
    var users = await fetch("http://localhost:4000/user")
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }

  useEffect(() => {
    load();
    AOS.init();
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />
      <div>
        <div className="flex h-screen w-screen flex-col justify-center  bg-accent-strong p-2">
          <AdminProtected>
            <>
              <div className="flex  h-full w-full flex-col justify-start gap-2 p-2">
                <div className="p  h-[10%] w-[100%] rounded-xl bg-accent p-3 ">
                  <h1 className="title1 text-info">
                    Welcome back, {s?.email}!
                  </h1>
                </div>
                {/* <Section>
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
            </Section> */}
                <div className="grid h-full w-full grid-cols-1 gap-2 sm:grid-cols-2">
                  <Link
                    className="flex h-full items-center justify-center rounded-xl bg-accent text-center text-info shadow-xl transition-all duration-150 hover:bg-accent-medium"
                    href="/admin-dashboard/user-managament"
                  >
                    <div>
                      <p className="title1">User Managament</p>
                      <p className="caption2 text-white">
                        Click here to add, delete, or edit users
                      </p>
                    </div>
                  </Link>
                  <Link
                    className="flex h-full items-center justify-center rounded-xl bg-accent text-center text-info shadow-xl transition-all duration-150 hover:bg-accent-medium"
                    href="/admin-dashboard/quarantine"
                  >
                    <div>
                      <p className="title1">Quarantine</p>
                      <p className="caption2 text-white">
                        This is where threats are located
                      </p>
                    </div>
                  </Link>
                  <Link
                    className="flex h-full items-center justify-center rounded-xl bg-accent text-center text-info shadow-xl transition-all duration-150 hover:bg-accent-medium"
                    href="/admin-dashboard/connections"
                  >
                    <div>
                      <p className="title1">Connections</p>
                      <p className="caption2 text-white">
                        You can find a list of connections here
                      </p>
                    </div>
                  </Link>
                  <Link
                    className="flex h-full items-center justify-center rounded-xl bg-accent text-center text-info shadow-xl transition-all duration-150 hover:bg-accent-medium"
                    href="/admin-dashboard/analytics"
                  >
                    <div>
                      <p className="title1">Analytics</p>
                      <p className="caption2 text-white">
                        Click here to take a look at analytics
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          </AdminProtected>
        </div>
      </div>
    </div>
  );
};

export default index;
