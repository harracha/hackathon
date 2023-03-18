import React, { useState } from "react";
import { Button } from "~/components/button/Button";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";

type userData = {
  username?: string;
  email?: string;
  password?: string;
};

const createUser = () => {
  const [userData, setUserData] = useState<userData>();

  async function createUser() {
    const res = await fetch("http://localhost:4000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData?.username,
        email: userData?.email,
        password: userData?.password,
      }),
    });
  }

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong p-4 px-20">
        <form action="">
          <div className="caption mb-2 px-4 ">
            <p className="my-2">Email:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setUserData({ ...userData, email: userData?.email });
              }}
            />
          </div>
          <div className="caption mb-2 px-4 ">
            <p className="my-2">Password:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </div>
          <div className="caption mb-2 px-4 ">
            <p className="my-2">Username:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setUserData({ ...userData, username: e.target.value });
              }}
            />
          </div>
          <Button
            onClick={() => {
              createUser();
            }}
            className="ml-5"
          >
            Add user <Icon icon="add" className="bg-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default createUser;
