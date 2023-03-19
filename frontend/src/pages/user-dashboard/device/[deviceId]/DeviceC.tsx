import { motion } from "framer-motion";
import Footer from "~/components/footer/Footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/button/Button";
import Header from "~/components/header/Header";
import Icon from "~/components/Icon/Icon";
import { Table } from "~/components/table/Table";
import UserProtected from "~/components/protections/UserProtected";
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

type requestData = {
  body: string;
  connectionId: string;
  httpMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  httpVersion: string;
  isThreat: boolean;
  deviceId: string;
  id: string;
};

const DeviceC = () => {
  const [connections, setConnections] = useState<connection[]>([]);
  const [deleteFlag, setDeleteFlag] = useState(1);
  const [request, setRequest] = useState<requestData>({
    httpMethod: "GET",
    body: "asdf",
    connectionId: "d3e10529-c8bd-4f55-9b6e-5a851c3a7784",
    httpVersion: "asdf",
    deviceId: "7878",
    isThreat: false,
    id: "",
  });

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

  async function sendRequest(request: requestData) {
    try {
      const res = await fetch("http://localhost:4000/connection/reqs", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(request),
      });
    } catch (error) {}
  }

  return (
    <div>
      <Header />
      <div className="h-screen w-screen bg-accent-strong">
        <UserProtected>
          <div className="p-4 px-20">
            <div>All connections</div>
            <Table
              objects={connections || []}
              titles={{
                id: "id",
                connectionStatus: "Connection status",
              }}
              onClick={(connection) => {
                setRequest({ ...request, id: connection.id });
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
            <div>
              <p className="caption">HTTP method</p>
              <input className="bg-accent-weak" type="text" />
              <p className="caption">Request body</p>
              <input
                className="bg-accent-weak"
                onChange={(e) => {
                  setRequest({ ...request, body: e.target.value });
                }}
                type="text"
              />
              <Button
                onClick={() => {
                  sendRequest(request);
                }}
              >
                Send request
              </Button>
            </div>
          </div>
        </UserProtected>
      </div>
    </div>
  );
};

export default DeviceC;
