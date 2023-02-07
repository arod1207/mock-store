import Link from "next/link";

import { adminStore, userStore } from "@/store/userStore";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";

import { InformationSVG, QuestionSVG, SignupSVG, UserSVG } from "./SVGs";
import { useRouter } from "next/router";

const Navbar = () => {
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const admin = adminStore((state) => state.admin);
  const setAdmin = adminStore((state) => state.setAdmin);

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setAdmin(null);
    router.push("/");
    location.reload();
  };

  return (
    <div className="bg-[#311B92] flex justify-between px-6 items-center">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold text-white">
            Deals <span className="text-[#F8931C]">Galore</span>
          </h1>
        </Link>
      </div>
      <div className="space-x-6 flex">
        <Link href="/faq">
          <span className="text-white flex text-sm items-center cursor-pointer">
            <span className="px-1">
              <QuestionSVG />
            </span>
            FAQ
          </span>
        </Link>
        <Link href="/about">
          <span className="text-white flex text-sm items-center cursor-pointer">
            <span className="px-1">
              <InformationSVG />
            </span>
            ABOUT
          </span>
        </Link>
        {user || admin ? (
          ""
        ) : (
          <Link href="/signup">
            <span className="text-white flex text-sm items-center cursor-pointer">
              <span className="px-1">
                <SignupSVG />
              </span>
              SIGN UP
            </span>
          </Link>
        )}

        {user || admin ? (
          <span
            className="text-white flex text-sm items-center cursor-pointer"
            onClick={handleSignOut}
          >
            <span className="px-1">
              <UserSVG />
            </span>
            SIGN OUT
          </span>
        ) : (
          <Link href="/login">
            <span className="text-white flex text-sm items-center cursor-pointer">
              <span className="px-1">
                <UserSVG />
              </span>
              LOG IN
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
