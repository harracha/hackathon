import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import { Button } from "~/components/button/Button";
import Logo from "~/components/logo/Logo";

type userData = {
  username?: string;
  email?: string;
  password?: string;
};

const index = () => {
  const router = useRouter();

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
    router.push("/login");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Logo />
      <div className="h-screen w-[45%] flex-col items-center justify-center bg-black pt-32 shadow-2xl ">
        <div className="flex w-full justify-start px-4">
          <h1 className="title1 mb-4 flex justify-start">Register</h1>
        </div>
        <div className="caption mb-2 flex-col items-center px-4">
          <p className="title2 my-2">E-mail:</p>
          <input
            className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div className="caption mb-2 px-4 ">
          <p className="title2 my-2">Username:</p>
          <input
            className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, username: e.target.value });
            }}
          />
        </div>
        <div className="caption mb-2 px-4 ">
          <p className="title2 my-2">Password:</p>
          <input
            className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </div>
        <div className="caption mb-2 flex w-full justify-start px-4">
          <Button
            onClick={() => {
              createUser(userData);
            }}
            className="mt-5  w-full"
          >
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;
