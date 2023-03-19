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
            Brainet
          </h1>
          <p className="title2 mb-8 flex justify-center text-info ">
            Take a look at all the threats you may recieve online
          </p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        className="flex h-screen w-screen flex-col items-start justify-center p-10 px-40 pt-20 pb-32 "
      >
        <div className="w- px-8">
          <p className="caption1 py-4 text-center">
            Welcome to Brainet, the advanced threat detection application that
            gives you unparalleled insight into the dangers that may lurk within
            your online world. Our mission is to help you protect yourself and
            your network from any potential harm, and we take that mission very
            seriously.
          </p>
          <p className="caption1 py-4 text-center">
            With our sophisticated technology and state-of-the-art algorithms,
            you can rest assured that you are in good hands. Brainet silently
            and seamlessly monitors all network activity, quickly detecting and
            categorizing any suspicious behavior in real-time. From phishing
            attempts to malware attacks, Brainet provides you with the awareness
            and knowledge you need to stay one step ahead of the game.
          </p>
          <p className="caption1 py-4 text-center">
            We understand that your security and privacy are of utmost
            importance, which is why our application is designed to be both
            discreet and easy to use. Brainet works silently in the background,
            while you go about your daily business, providing you with the peace
            of mind that you deserve.
          </p>
        </div>
      </div>
      <div className="flex h-[60%] w-screen justify-between  p-10 px-40">
        <p
          data-aos="fade-right"
          className="caption1 grad flex  items-center justify-center text-white "
        >
          If you're ready to take your online security to the next level, then
          Brainet is the application for you. Try it now and see for yourself
          why we are the trusted choice of discerning individuals who demand the
          best. With Brainet, you can rest easy, knowing that you are protected
          by the best technology on the market.
        </p>
        <Image
          data-aos="fade-left"
          src="/brain.png"
          className="m-5 "
          width={300}
          height={300}
          alt=""
        ></Image>
      </div>
      <div
        data-aos="fade-top"
        className="flex h-[60%] w-screen justify-center p-10 px-40 pb-32"
      >
        <Link className="text-center" href="/login">
          <h1 className="display3 m-5 cursor-pointer rounded-md border-info p-2 text-info shadow-xl transition-all duration-200 hover:text-accent-weak">
            Log in Here
          </h1>
        </Link>
        <Link className="text-center" href="/register">
          <h1 className="display3 m-5 cursor-pointer rounded-md border-info p-2 text-info shadow-xl transition-all duration-200 hover:text-accent-weak">
            Register Here
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
