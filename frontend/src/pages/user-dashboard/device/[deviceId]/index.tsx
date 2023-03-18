import { motion } from "framer-motion";
import Footer from "~/components/footer/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
interface connection {
  id: string;
  devices: [];
  connectionStatus: string;
  req: [];
  res: [];
}

interface device {
  id: string;
  name: string;
  userId: string;
  status: string;
  quarantine: [];
}

const index = () => {
  const [connections, setConnections] = useState<connection[]>([]);
  const [deleteFlag, setDeleteFlag] = useState(1);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch("http://localhost:4000/connection");
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error(`Error fetching devices: ${error}`);
      }
    };
    fetchConnections();
  }, [deleteFlag]);

  const deleteConnection = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/connection/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      setDeleteFlag(deleteFlag + 1);
    } catch (error) {
      console.error(`Error deleting connection with id ${id}: ${error}`);
    }
  };

  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong">
        <div className="p-4 px-20">
          <div>All connections</div>
          <Table
            objects={connections || []}
            titles={{
              devices: "",
              connectionStatus: "Connection status",
            }}
            onClick={(connection) => {
              router.push("/connection/" + connection.id);
            }}
            actionRow={(connection) => {
              return (
                <>
                  <Button onClick={() => deleteConnection(connection.id)}>
                    <Icon icon="delete" className="bg-info " />
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
