import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon, { IconName } from "../Icon/Icon";

const Header = () => {
  return (
    <header className="flex h-14 w-full items-center justify-center bg-accent-strong px-8 text-white">
      <div className=" flex w-full items-center justify-between">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="hover:fill-text-accent-weak cursor-pointer fill-info
            text-info hover:text-accent-weak"
          ></Link>
        </div>
        <div className="flex w-full items-center justify-end pl-4">
          <ul className="w-ful flex items-center justify-between">
            <li className="flex items-center justify-center px-3">
              <Link
                href="/"
                className="title2 cursor-pointer text-info hover:text-accent-weak"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center justify-center px-3">
              <Link
                href="/developers"
                className="title2 cursor-pointer text-info hover:text-accent-weak"
              >
                About Us
              </Link>
            </li>
            <li className="flex items-center justify-center pl-3">
              <Link
                href="/#"
                className="title2 cursor-pointer text-info hover:text-accent-weak"
              >
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
