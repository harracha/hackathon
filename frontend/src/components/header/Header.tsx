import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex h-24 w-full items-center justify-center bg-accent px-8 text-white">
      <div className=" flex w-full items-center justify-between">
        <div className="flex items-center justify-between ">
          <Image
            src="/brainet_logo.png"
            alt="Picture of the author"
            width={80}
            height={80}
            className="text-whites items-center justify-center bg-transparent"
          />
          <h1 className="display3 pl-4">Brainet</h1>
        </div>
        <div className="w-max justify-end">News letter</div>
      </div>
    </header>
  );
};

export default Header;
