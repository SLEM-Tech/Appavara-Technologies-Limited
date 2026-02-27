import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

/**
 * SetupShowcase: A showcase section featuring a hero image and a
 * minimalist step-based navigation bar.
 */
const SetupShowcase = () => {
  return (
    <section className="w-full bg-white pt-36">
      {/* --- Image Section --- */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20">
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden shadow-2xl">
          <img
            src="/images/setup-showcase-img.png" // Replace with actual path to the monitor image
            alt="Dual monitor coding setup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --- Bottom Info/Navigation Bar --- */}
      <div className="w-full bg-[#F4F4F5] py-8 md:py-12 mt-[-2px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Step Indicator (Left) */}
          <div className="flex-1 hidden md:flex">
            <span className="text-sm lg:text-base font-bold uppercase text-black poppins-regular">
              Step 1
            </span>
          </div>

          {/* Main Headline (Center) */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-black text-center">
              We put everything together
            </h2>
            {/* Mobile-only step indicator */}
            <span className="block md:hidden text-center text-[10px] font-bold uppercase mt-2 opacity-60">
              Step 1
            </span>
          </div>

          {/* Navigation Controls (Right) */}
          <div className="flex-1 flex justify-center md:justify-end items-center gap-4">
            <button
              className="group size-10 md:size-12 rounded-full border border-black flex items-center justify-center transition-all hover:bg-black hover:text-white active:scale-90"
              aria-label="Previous step"
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <button
              className="group size-10 md:size-12 rounded-full border border-black flex items-center justify-center transition-all hover:bg-black hover:text-white active:scale-90"
              aria-label="Next step"
            >
              <FiArrowRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupShowcase;
