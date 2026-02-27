"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import { Rubik } from "next/font/google";
import HeroCarousel from "../Cards/HeroCarousel";
import AboutUs from "./AboutUs";
import StatsSection from "./StatsSection";
import WhyChooseUs from "./WhyChooseUs";
import { FiCheckCircle, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const rubik = Rubik({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage,
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600;
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600;
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      <section className="w-full min-h-[85vh] flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT COLUMN: CONTENT */}
        <div className="w-full flex flex-col justify-center px-6 py-8 lg:py-16 lg:pl-16 lg:pr-12 z-10">
          <div className="max-w-xl space-y-4 lg:space-y-12">
            <h1
              className={`belleza-regular text-3xl lg:text-6xl text-black space-y-1 lg:space-y-3 tracking-tight leading-relaxed`}
            >
              Best Computer Accessories
            </h1>

            <button
              onClick={() => router.push("/category")}
              className="poppins-regular bg-black text-white text-sm px-8 py-2 rounded-3xl transition-all hover:bg-black active:scale-95 shadow-xl shadow-black/10"
            >
              Shop now
            </button>
          </div>
        </div>

        {/* The Main Device Image */}
        <div className="w-full h-full">
          <Picture
            src={heroBg}
            alt="Product View"
            className="w-full object-cover"
          />
        </div>
      </section>
      <div className="flex flex-col lg:flex-row gap-6 pl-12 pr-6 mt-8">
        <p className="poppins-extralight text-black leading-relaxed">
          Each computer accessory is efficient, quality-checked, and securely
          packaged before dispatch, using specially engineered protective
          materials to ensure safe delivery to your destination.
        </p>
        <div className="space-y-3">
          <p className="text-black text-2xl font-semibold leading-relaxed">
            Learn how we carefully handle and protect your tech accessories at
            every stage of their journey — from our warehouse to your doorstep.
          </p>
          <Link
            href="/"
            className="flex items-center gap-6 uppercase text-black text-sm poppins-medium tracking-tight"
          >
            Learn more
            <span className="h-6 w-6 bg-black rounded-full flex items-center justify-center">
              <FaArrowRightLong className="text-xs text-white" />
            </span>
          </Link>
        </div>
      </div>
      {/* <StatsSection /> */}
    </>
  );
};

export default AllCategorySection;
