import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex h-full w-full items-center justify-center  bg-accent-strong px-8 text-white">
      <div className=" flex h-full w-full items-center justify-between">
        <div>
          <div>
            <h1 className="">Brainet</h1>
            {/* {isLandingPage() ? <></> : <Link href="/">About us</Link>} */}
            <Link href="/" className="text">
              About us
            </Link>
          </div>
          <div>News letter</div>
        </div>
        <div className=" flex h-3/4 items-center justify-between">
          <div className="flex-col items-center justify-between">
            <div>Made with love by</div>
            <div>CSS-ovci</div>
          </div>
          <Image
            src="/Logo_CSS-ovci.jpg"
            alt="Logo CSS-ovci"
            width={80}
            height={80}
            className="ml-3 h-full items-center justify-center bg-transparent"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
