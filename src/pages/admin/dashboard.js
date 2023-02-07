import CloudinaryWidget from "@/components/CloudinaryWidget";
import Sidebar from "@/components/Sidebar";
import { urlStore } from "@/store/urlStore";
import { adminStore } from "@/store/userStore";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

const dashboard = () => {
  const url = urlStore((state) => state.url);
  const admin = adminStore((state) => state.admin);

  const router = useRouter();

  useEffect(() => {
    if (admin?.isAdmin !== true || admin?.isAdmin === null) {
      router.push("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    upc: "",
    isOnSale: false,
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "products", formData.productName), {
      productName: formData.productName,
      description: formData.description,
      price: formData.price,
      upc: formData.upc,
      isOnSale: formData.isOnSale,
      image: url,
    });
    setFormData({
      productName: "",
      description: "",
      price: "",
      upc: "",
      isOnSale: false,
    });
    console.log("Product added");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 justify-center">
        <div className="flex items-center flex-col justify-center my-10">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold">Add A Product</h1>
          </div>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
              placeholder="Product Name"
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
              placeholder="Description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
              placeholder="Price"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
              placeholder="UPC"
              onChange={(e) =>
                setFormData({ ...formData, upc: e.target.value })
              }
            />
            <div className="flex justify-between">
              <label className="font-semibold">Is it on sale?</label>
              <input
                type="checkbox"
                className="bg-gray-200 px-4 py-2 rounded border-2 border-[#311B92]"
                onChange={(e) =>
                  setFormData({ ...formData, isOnSale: e.target.checked })
                }
              />
            </div>
            <div className="flex justify-center">
              <CloudinaryWidget />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#F8931C] py-2 px-4 rounded font-semibold"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
