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
            <Link href="/" className="">
              About us
            </Link>
          </div>
          <div>News letter</div>
        </div>
        <div className=" flex h-3/4 items-center justify-between">
          <div className="flex-col items-center justify-between">
            <div className="title3 pb-2">Made with love by</div>
            <Link href="/developers" className="text-info">
              <div className="title3 pl-8">CSS-ovci</div>
            </Link>
          </div>
          <Image
            src="/Logo_CSS-ovci.jpg"
            alt="Logo CSS-ovci"
            width={80}
            height={80}
            className="my-3 ml-5 h-full items-center justify-center rounded-2xl bg-transparent"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
