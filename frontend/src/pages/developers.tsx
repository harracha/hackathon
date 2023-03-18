import React from "react";
import Image from "next/image";
import Header from "../components/header/Header";

const developers = () => {
  return (
    <div className="h-screen flex-col items-center justify-between">
      <Header></Header>
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent-strong to-black">
        <div className="title1 w-3/4 pb-10 text-info">
          Developers behind this project
        </div>
        <Image
          src="/boys.png"
          alt={"Developers behind this project"}
          width={500}
          height={500}
          className="w-3/4"
        ></Image>
      </div>
    </div>
  );
};

export default developers;
