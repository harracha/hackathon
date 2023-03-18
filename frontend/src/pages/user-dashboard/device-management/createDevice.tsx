import React, { useState } from "react";
import { Button } from "~/components/button/Button";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { useRouter } from "next/navigation";

type deviceData = {
  name?: string;
  status?: string;
};

const createUser = () => {
  const [deviceData, setDeviceData] = useState<deviceData>({
    name: "",
    status: "OFFLINE",
  });

  async function createUser(data: deviceData) {
    try {
      const res = await fetch("http://localhost:4000/device/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data?.name,
        }),
      });
      router.push("/user-dashboard/");
    } catch (error) {
      console.error(`Error creating device ${error}`);
    }
  }

  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong p-4 px-20">
        <form action="">
          <div className="caption mb-2 px-4 ">
            <p className="my-2">Enter the new device's name:</p>
            <input
              className="w-[80%] rounded-xl p-4 text-accent-medium outline-none transition-all duration-150 focus:border-[1px] focus:border-accent-weak focus:bg-black "
              type="text"
              onChange={(e) => {
                setDeviceData({ ...deviceData, name: e.target.value });
              }}
            />
          </div>
          <Button
            onClick={() => {
              createUser(deviceData);
            }}
            className="ml-5"
          >
            Add device <Icon icon="add" className="bg-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default createUser;
