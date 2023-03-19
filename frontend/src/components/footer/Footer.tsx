import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="absolute bottom-0 h-[10%] w-full ">
      <footer className="flex h-full w-full items-center justify-center  bg-accent-strong px-8 text-white">
        <div className=" flex h-full w-full items-center justify-between">
          <div>
            <div>
              <h1 className="title1 text-xl text-info">Brainet</h1>
            </div>
          </div>
          <div className=" flex h-3/4 items-center justify-between">
            <div className="w- full flex-col items-center justify-between">
              <div className="title3 pb-2">Made with love by</div>
              <Link
                href="/developers"
                className="cursor-pointer text-info hover:text-accent-weak"
              >
                <div className="title3 pl-8">CSS-ovci</div>
              </Link>
            </div>
            <Image
              src="/Logo_CSS-ovci.jpg"
              alt="Logo CSS-ovci"
              width={80}
              height={80}
              className="h-full items-center justify-center rounded-2xl bg-transparent"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
