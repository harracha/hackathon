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
  const [deleteFlag, setDeleteFlag] = useState(1);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:4000/device");
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error(`Error fetching devices: ${error}`);
      }
    };
    fetchDevices();
  }, [deleteFlag]);

  const deleteDevice = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/device/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      setDeleteFlag(deleteFlag + 1);
    } catch (error) {
      console.error(`Error deleting device with id ${id}: ${error}`);
    }
  };

  const addNewDevice = async () => {
    try {
      const response = await fetch(`http://localhost:4000/device/create/`, {
        method: "POST",
      });
      setDeleteFlag(deleteFlag + 1);
    } catch (error) {
      console.error(`Error creating device ${error}`);
    }
  };

  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong">
        <div className="p-4 px-20">
          <div>Your devices:</div>
          <Table
            objects={devices || []}
            titles={{ name: "name", status: "status" }}
            onClick={(device) => {
              router.push("/device/" + device.id);
            }}
            actionRow={(device) => {
              return (
                <>
                  <Button onClick={() => deleteDevice(device.id)}>
                    <Icon icon="delete" className="bg-info " />
                  </Button>
                </>
              );
            }}
          ></Table>
          <Button onClick={() => {}}>Add new device</Button>
        </div>
      </div>
    </div>
  );
};

export default index;
