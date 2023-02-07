import Link from "next/link";

import { userStore } from "@/store/userStore";
import { InformationSVG, SignupSVG } from "./SVGs";

const Hero = () => {
  const user = userStore((state) => state.user);

  return (
    <div className="flex justify-around items-center ">
      <div className="w-96 flex flex-col gap-6">
        <h1 className="text-3xl">
          Fastest check-ins, Premium support and ACH or E-check payouts
        </h1>
        <p>
          Sign up and start earning commissions, cash-back rewards and extra
          bonuses by purchasing items.
        </p>
        <div className="flex space-x-3">
          {user ? (
            ""
          ) : (
            <Link href="/signup">
              <button
                className="bg-[#311B92] text-white font-semibold text-sm px-4 py-2 rounded-md w-32 flex items-center justify-center cursor-pointer
          "
              >
                <span className="px-1">
                  <SignupSVG />
                </span>
                SIGN UP
              </button>
            </Link>
          )}

          <Link href="/faq">
            <button
              className="bg-[#311B92] text-white font-semibold text-sm px-4 py-2 rounded-md w-32 flex items-center justify-center cursor-pointer
          "
            >
              <span className="px-1">
                <InformationSVG />
              </span>
              FAQ
            </button>
          </Link>
        </div>
      </div>
      <div className="w-96">
        <img
          src="/images/hero.png"
          alt="online shopping"
          className="h-96  rounded-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
