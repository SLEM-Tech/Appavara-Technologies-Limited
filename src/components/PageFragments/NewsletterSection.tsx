"use client";

const NewsletterSection = () => {
  return (
    <section className="w-full px-6 lg:px-20 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
        {/* Left Side: Editorial Heading */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-black leading-[1.2] tracking-tight">
            Stay update with special offers, <br className="hidden md:block" />
            plant-parenting tips, and more.
          </h2>
        </div>

        {/* Right Side: Minimalist Underlined Form */}
        <div className="w-full lg:w-2/5 flex justify-end">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-end border-b border-black pb-2 w-full max-w-md group"
          >
            <div className="flex-grow flex flex-col">
              {/* Optional Label / Placeholder spacing */}
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent w-full py-2 text-sm lg:text-base text-gray-800 outline-none placeholder:text-gray-500 placeholder:font-light"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 whitespace-nowrap mb-1"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
