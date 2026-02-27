"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
  newAmount: string;
  oldAmount: string;
  description: string;
  imageBg: string;
}

const ProductCard2 = ({
  id,
  image,
  title,
  price: amount,
}: Partial<ProductCard2Props>) => {
  const { addItem } = useCart();
  const ID = String(id);
  const price = parseFloat(String(amount)) || 0;
  const slugDesc = title ? convertToSlug(title) : title;

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: ID, name: title, price, image });
  };

  return (
    <div className="group flex flex-col h-full">
      {/* Centered Product Image */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative aspect-square w-full mb-4 flex items-center justify-center overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-grow space-y-1">
        <h3 className="text-sm uppercase text-gray-700 truncate poppins-regular">{title}</h3>
        <p className="text-black text-sm uppercase poppins-regular">
          ₦{price.toLocaleString()}
        </p>

        {/* Small Black Rectangular Buy Button */}
        <div className="pt-2">
          <button
            onClick={handleBuy}
            className="bg-black poppins-regular text-white text-sm px-5 py-1.5 tracking-tight hover:bg-gray-800 transition-colors"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
