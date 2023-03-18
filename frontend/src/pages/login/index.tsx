import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";

type FormType = {
  username: string;
  password: string;
};

const index = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormType>({
    username: "",
    password: "",
  });
  const [ab, setAb] = useState("");

  async function login() {
    console.log("uso u login");
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.username,
        password: form.password,
      }),
    });
    var ab = await res.json();
    setAb(ab.uspjeh);
    if (ab.uspjeh == true) {
      router.push("/dashboard");
    }
    console.log(ab);
  }

  return (
    <div className="flex h-screen w-screen ">
      <div className="flex h-screen w-[55%] items-center justify-center bg-gradient-to-r from-accent-strong to-black shadow-2xl  ">
        <div className="flex items-center justify-center">
          <h1 className="display3">Log in here</h1>
        </div>
        <p>{JSON.stringify(form) + ab}</p>
        <p className="text-white">{ab}</p>
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
          <button
            onClick={() => {
              login();
            }}
            className="border-2 border-accent-weak p-4 active:bg-accent-medium"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
