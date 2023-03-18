import React, { useState } from "react";

const login = () => {
  const [form, setForm] = useState<FormType>();

  return (
    <div className="flex h-screen w-screen ">
      <div className="h-screen w-[55%] bg-accent-strong shadow-2xl ">
        <div className="flex items-center justify-center">
          <h1>Log in here</h1>
        </div>
      </div>
      <div className="h-screen w-[45%] bg-accent shadow-2xl ">
        <div></div>
      </div>
    </div>
  );
};

export default login;
