"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { convertToSlug } from "@constants";
import ProductCard2 from "@src/components/Cards/ProductCard2";

const SortedProducts = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const response = await WooCommerce.get(
          "products?per_page=12&orderby=date&order=desc",
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <section className="w-full flex flex-col items-center bg-white pb-12">
      <div className="w-full max-w-[1540px] px-6 lg:px-12 py-16 space-y-8">
        <div className="space-y-6">
          <p className="text-black text-sm poppins-medium uppercase">OUR SHOP</p>
          <h2 className="text-2xl lg:text-3xl text-black font-semibold">
            Here are the best seller <br /> from our varieties
          </h2>
          <button
            onClick={() => router.push("/category")}
            className="poppins-regular bg-black text-white text-sm px-8 py-2 rounded-3xl transition-all hover:bg-black active:scale-95 shadow-xl shadow-black/10"
          >
            See all
          </button>
        </div>

        <div className="relative min-h-[400px]">
          {/* Layered Background Container */}
          {/* <div className="bg-[#F9D9AA] w-full z-10 h-80 rounded-[30px] px-8 lg:px-16 py-16 lg:py-24 shadow-sm absolute -bottom-36 hidden lg:block"></div> */}

          <div className="relative z-20 w-[95%] mt-16 mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/50 animate-pulse rounded-[2.5rem]"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {products.slice(0, 4).map((product: any) => (
                  <ProductCard2
                    key={product.id}
                    id={product.id}
                    image={product?.images[0]?.src}
                    title={product?.name}
                    price={product?.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <GlobalLoader isPending={isPending} />
    </section>
  );
};

export default SortedProducts;
