import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";

type FormType = {
  username: string;
  password: string;
};

const index = () => {
  const [form, setForm] = useState<FormType>({
    username: "",
    password: "",
  });

  async function login(form: FormType) {}

  return (
    <div className="flex h-screen w-screen ">
      <div className="flex h-screen w-[55%] items-center justify-center bg-gradient-to-r from-accent-strong to-black shadow-2xl  ">
        <div className="flex items-center justify-center">
          <h1 className="display3">Log in here</h1>
        </div>
        <p>{JSON.stringify(form)}</p>
      </div>
      <div className="flex h-screen w-[45%] items-center justify-center bg-black shadow-2xl ">
        <div className="flex w-full flex-col">
          <div className="caption mb-2 px-4 ">
            <p className="my-2">Username:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
          </div>
          <div className="caption mb-2 px-4 ">
            <p className="my-2">Password:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
