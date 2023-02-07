import React, { useEffect, useState } from "react";

import { auth, db } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { adminStore } from "@/store/userStore";

const AdminLogin = () => {
  const setAdmin = adminStore((state) => state.setAdmin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      setError("Please fill out all fields");
      return;
    }
    try {
      const UserAdmin = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const isAdmin = await getDoc(doc(db, "admin", UserAdmin.user.email));
      setAdmin(isAdmin.data());
      if (isAdmin.data().isAdmin === true) {
        router.push("/admin/dashboard");
      } else {
        return;
      }
    } catch (error) {
      console.log(error.message);
      setLoginError("Incorrect Email/Password");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center my-10 gap-2">
      <div>
        <h1 className="text-3xl font-bold">Log In</h1>
      </div>
      <form className="flex flex-col gap-5 border-2 border-[#311B92] p-4 rounded w-[300px]">
        <input
          className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
          type="text"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div>
          <h3 className="text-red-600 text-center font-semibold">
            {loginError}
            {error}
          </h3>
        </div>
        <button
          className="bg-[#F8931C] px-4 py-2 rounded font-semibold cursor-pointer"
          onClick={handleLogin}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
