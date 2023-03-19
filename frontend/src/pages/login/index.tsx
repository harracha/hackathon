import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import { Button } from "~/components/button/Button";
import Logo from "~/components/logo/Logo";

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
    const res = await fetch("http://localhost:4000/user/login", {
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
    localStorage.setItem("token", JSON.stringify(ab));
    if (ab.userRole == "DEFAULT") {
      router.push("/user-dashboard");
    }
    if (ab.userRole == "ADMIN") {
      router.push("/admin-dashboard");
    }
  }

  useEffect(() => {
    // fetch();
  }, []);

  return (
    <div className="flex h-screen w-screen ">
      <Logo />
      <div className="h-screen w-[45%] flex-col items-center justify-center bg-black pt-44 shadow-2xl ">
        <div className="flex w-full justify-start px-4">
          <h1 className="title1 mb-4 flex justify-start">Login</h1>
        </div>
        <div className="flex w-full flex-col">
          <div className="caption mb-2 px-4 ">
            <p className="title2 my-2">E-Mail:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
          </div>
          <div className="caption mb-2 px-4 ">
            <p className="title2 my-2">Password:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </div>
          <div className="caption mb-2 flex w-full justify-start px-4">
            <Button
              onClick={() => {
                login();
              }}
              className="mt-5  w-full"
            >
              LOG IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
