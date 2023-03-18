import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import { Button } from "~/components/button/Button";

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
    <div className="flex h-screen w-screen ">
      <div className="flex h-screen w-[55%] items-center justify-center bg-gradient-to-r from-accent-strong to-black shadow-2xl  ">
        <div className="flex items-center justify-center">
          <h1 className="display3">Register here</h1>
        </div>
      </div>
      <div className="flex h-screen w-[45%] items-center justify-center bg-black shadow-2xl ">
        <div className="flex w-full  flex-col">
          <div className="caption mb-2 px-4 ">
            <p className="my-2">email:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
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
          <Button
            onClick={() => {
              createUser(userData);
            }}
            className="ml-5 flex w-[70%] justify-center "
          >
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;
