import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const id = router.query;

  useEffect(() => {
    const handleFetchProducts = async () => {
      setLoading(true);
      const product = await getDoc(doc(db, "products", id.product));
      setLoading(false);
      setProduct(product.data());
    };
    handleFetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1justify-center">
          <div className="m-3 border-2 border-gray-300 rounded-md shadow-lg cursor-pointer">
            <div className="flex bg-gray-200 justify-between items-center px-3">
              <div>
                <h6 className="text-sm font-semibold capitalize">
                  {product.productName}
                </h6>
                <h6 className="text-sm">UPC: {product.upc}</h6>
              </div>
              <div>
                <h1 className="text-3xl">${product.price}</h1>
              </div>
            </div>
            <div className="flex space-x-2 p-3">
              <div className="flex flex-col items-center gap-2">
                <img src={product.image} alt="ipad" className="max-h-96" />
                <h4 className="text-sm font-semibold">
                  PRICE: ${product.price}
                </h4>
                {product.isOnSale ? (
                  <button className="bg-[#FFEB3A] px-4 py-1 text-sm font-semibold shadow-md">
                    ON SALE
                  </button>
                ) : (
                  <button className="bg-red-600 px-4 py-1 text-sm font-semibold shadow-md">
                    NOT ON SALE
                  </button>
                )}
              </div>
              <div>
                <h5 className="font-semibold text-sm">
                  Title:{" "}
                  <span className="font-normal capitalize">
                    {product.productName}
                  </span>
                </h5>
                <h6 className="font-semibold text-sm">
                  UPC: <span className="font-normal">{product.upc}</span>
                </h6>
                <p
                  className="font-semibold
           text-sm"
                >
                  Description:{" "}
                  <span className="font-normal">{product.description}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <Link href="/">
          <button className="bg-[#F8931C] px-4 py-2 rounded-md font-semibold ">
            Go Back
          </button>
        </Link>
      </div>
    </>
  );
};

export default Product;
