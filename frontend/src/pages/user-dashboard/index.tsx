import { motion } from "framer-motion";
import Footer from "~/components/footer/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
interface device {
  id: string;
  name: string;
  userId: string;
  status: string;
  quarantine: [];
}

const index = () => {
  const [devices, setDevices] = useState<device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await fetch("http://localhost:4000/device");
      const data = await response.json();
      setDevices(data);
    };
    fetchDevices();
  }, []);

  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong">
        <div className="p-4 px-20">
          <Table
            objects={devices || []}
            titles={{ name: "name", status: "status" }}
            onClick={(user) => {
              router.push("/" + device.id);
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
        </div>
      </div>
    </div>
  );
};

export default index;
