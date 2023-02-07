import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// const products = [
//   {
//     id: 1,
//     upc: 1234567,
//     isOnSale: false,
//     price: 799.99,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptas iure optio ipsam illum voluptatem provident, aliquid deserunt consectetur nobis, ratione unde ab quia officia doloribus ipsa tempora magnam beatae?",
//     image: "/images/ipad.jpg",
//     productName: "Ipad 10 Gen",
//   },
//   {
//     id: 2,
//     upc: 134547,
//     isOnSale: true,
//     price: 1499.99,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptas iure optio ipsam illum voluptatem provident, aliquid deserunt consectetur nobis, ratione unde ab quia officia doloribus ipsa tempora magnam beatae?",
//     image: "/images/macbook.jpeg",
//     productName: 'Macbook Pro 14"',
//   },
//   {
//     id: 3,
//     upc: 1344547,
//     isOnSale: false,
//     price: 499.99,
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptas iure optio ipsam illum voluptatem provident, aliquid deserunt consectetur nobis, ratione unde ab quia officia doloribus ipsa tempora magnam beatae?",
//     image: "/images/iwatch.webp",
//     productName: "Apple Watch 13 Gen",
//   },
// ];

const Cards = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getDocs(collection(db, "products"));
      setProducts(
        products.docs.map((product) => ({
          product: product.data(),
          uid: product.id,
        }))
      );
    };
    fetchProducts();
  }, []);

  const handleSelectedProduct = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-3">
      {products.map((product, _index) => (
        <div
          key={_index}
          className="m-3 border-2 border-gray-300 rounded-md shadow-lg cursor-pointer"
          onClick={() => handleSelectedProduct(product.uid)}
        >
          <div className="flex bg-gray-200 justify-between items-center px-3">
            <div>
              <h6 className="text-sm font-semibold capitalize">
                {product.product.productName}
              </h6>
              <h6 className="text-sm">UPC: {product.product.upc}</h6>
            </div>
            <div>
              <h1 className="text-3xl">${product.product.price}</h1>
            </div>
          </div>
          <div className="flex space-x-2 p-3">
            <div className="flex flex-col items-center gap-2 w-48">
              <img
                src={product.product.image}
                alt="Product For Sale"
                className="max-w-[200px] max-h-[200px]"
              />
              <h4 className="text-sm font-semibold">
                PRICE: ${product.product.price}
              </h4>
              {product.product.isOnSale ? (
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
                  {product.product.productName}
                </span>
              </h5>
              <h6 className="font-semibold text-sm">
                UPC: <span className="font-normal">{product.product.upc}</span>
              </h6>
              <p
                className="font-semibold
           text-sm"
              >
                Description:{" "}
                <span className="font-normal">
                  {product.product.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
