import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Footer = () => {
  return (
    <footer className="flex h-auto w-full items-center justify-center  bg-accent-strong px-8 text-white">
      <div className=" flex w-full items-center justify-between">
        <div>
          <h1 className="">Brainet</h1>
          {/* {isLandingPage() ? <></> : <Link href="/">About us</Link>} */}
          <Link href="/" className="text">
            About us
          </Link>
        </div>
        <div>News letter</div>
      </div>
    </footer>
  );
};

export default Footer;
