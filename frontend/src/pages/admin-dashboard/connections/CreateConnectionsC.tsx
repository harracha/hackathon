import React, { useState } from "react";
import { Button } from "~/components/button/Button";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import AdminProtected from "~/components/protections/AdminProtected";

type userData = {
  username?: string;
  email?: string;
  password?: string;
};

const CreateConnectionsC = () => {
  const [userData, setUserData] = useState<userData>({
    username: "",
    password: "",
    email: "",
  });

  async function createUser(data: userData) {
    const res = await fetch("http://localhost:4000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data?.username,
        email: data?.email,
        password: data?.password,
      }),
    });
  }

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong p-4 px-20">
        <AdminProtected>
          <form action="">
            <div className="caption mb-2 px-4 ">
              <p className="my-2">Email:</p>
              <input
                className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
                type="text"
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
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
                console.log(userData);
                createUser(userData);
              }}
              className="ml-5"
            >
              Add user <Icon icon="add" className="bg-white" />
            </Button>
          </form>
        </AdminProtected>
      </div>
    </div>
  );
};

export default CreateConnectionsC;
