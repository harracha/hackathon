import React, { useEffect, useState } from "react";
type props = {
  children: React.ReactNode;
};

const UserProtected = ({ children }: props) => {
  const [authorised, setAuthorised] = useState(false);
  const [admin, setAdmin] = useState(false);
  async function storage() {
    try {
      const token = await localStorage.getItem("token");
      const userRole = JSON.parse(token ? token : "");
      console.log(userRole.userRole);
      token ? setAuthorised(true) : setAuthorised(false);
      userRole.userRole == "ADMIN" ? setAdmin(true) : setAdmin(false);
    } catch {}
  }
  useEffect(() => {
    storage();
  });
  return (
    <div>
      {authorised ? (
        !admin ? (
          <div className="mr-10 h-screen w-screen">{children}</div>
        ) : (
          <>TI SI ADMIN</>
        )
      ) : (
        <>NISI AUTORIZIRAN</>
      )}
    </div>
  );
};

export default UserProtected;
