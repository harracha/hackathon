import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-24 w-full items-center justify-center bg-accent px-8 text-white">
      <div className=" flex w-full items-center justify-between">
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src="/brainet_logo.png"
              alt="Picture of the author"
              width={80}
              height={80}
              className="items-center justify-center bg-transparent"
            />
          </Link>
        </div>
        <div className="flex w-full items-center justify-end pl-4">
          <ul className="w-ful flex items-center justify-between">
            <li className="flex items-center justify-center px-3">
              <Link href="/#" className="title2 text-white">
                Home
              </Link>
            </li>
            <li className="flex items-center justify-center px-3">
              <Link href="/#" className="title2 text-white">
                About Us
              </Link>
            </li>
            <li className="flex items-center justify-center pl-3">
              <Link href="/#" className="title2 text-white">
                Blog Post
              </Link>
            </li>

            <li></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
