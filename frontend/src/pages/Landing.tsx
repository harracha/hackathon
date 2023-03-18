import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";

const Landing = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="flex  w-screen flex-col justify-center bg-gradient-to-br from-accent-strong to-black ">
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        className="flex h-screen w-screen flex-col justify-center  p-10 px-40 pt-20 pb-32 "
      >
        <div>
          <h1 className="display2 grad mb-2  flex items-center justify-center text-info ">
            Brainett
          </h1>
          <p className="title2 mb-8 flex justify-center text-info ">
            Take a look at all the threats you may recieve online
          </p>
        </div>
        <div>
          <p className="caption2  flex justify-center text-center ">
            What is Lorem Ipsum?
          </p>
          <p className="caption2 flex justify-center text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
      <div className="flex h-[60%] w-screen justify-between  p-10 px-40">
        <p
          data-aos="fade-right"
          className="caption grad flex  items-center justify-center text-white "
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <Image
          data-aos="fade-left"
          src="/brain.jpg"
          className="m-5"
          width={200}
          height={200}
          alt=""
        ></Image>
      </div>
      <div
        data-aos="fade-top"
        className="flex h-[60%] w-screen justify-center p-10 px-40 pb-32"
      >
        <Link href="/login">
          <h1 className="display2 m-5 cursor-pointer rounded-md border-info p-2 text-info shadow-xl transition-all duration-200 hover:text-accent-weak">
            Log in Here
          </h1>
        </Link>

        <Link href="/proba">
          <h1 className="display2 m-5 cursor-pointer rounded-md border-info p-2 text-info shadow-xl transition-all duration-200 hover:text-accent-weak">
            Proba za Header i footer
          </h1>
        </Link>
      </div>
      <div>
        <h1 className="hidden">asdfasdfasdf</h1>
      </div>
    </div>
  );
};

export default Landing;