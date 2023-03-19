import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import { Button } from "~/components/button/Button";
import Logo from "~/components/logo/Logo";
import PageLogin from "./PageLogin";

type FormType = {
  username: string;
  password: string;
};

const index = () => {
  return <PageLogin />;
};

export default index;
