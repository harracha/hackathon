import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import { Button } from "~/components/button/Button";
import Logo from "~/components/logo/Logo";
import Register from "./Register";

const index = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Register />
    </div>
  );
};

export default index;
