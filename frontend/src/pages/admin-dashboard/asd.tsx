import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import AOS from "aos";
import Header from "~/components/header/Header";
import { Stack } from "../page/Stack";
import { Section } from "../page/Section";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { exit } from "process";

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

const asd = () => {
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
    <>
      <Header />
      <motion.div
        initial={{ left: -50 }}
        animate={{ left: 0 }}
        exit={{ left: 50 }}
      >
        <div className="flex h-screen w-screen flex-col justify-center bg-black p-2">
          <div className="flex  h-full w-full flex-col justify-start gap-2 p-2">
            <div className="p  h-[10%] w-[100%] rounded-xl bg-accent-strong p-3 ">
              <h1 className="title1 text-info">Welcome back, {s?.email}!</h1>
            </div>
            <div className="flex gap-2">
              <Section>
                <div className="grid grid-cols-2 p-2">
                  <div className="rounded"></div>
                </div>

                {/* <Table
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
              ></Table> */}
              </Section>
              <div data-aos="zoom-in" className="rounded-xl">
                asdf
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default asd;
