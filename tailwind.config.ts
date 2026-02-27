import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // The site uses a clean Sans-Serif, Poppins works well.
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        /* ========== Luxury Tech Editorial Palette ========== */
        brand: {
          black: "#000000", // Main headings and CTA buttons
          offWhite: "#FAF9F6", // Main editorial page background
          muted: "#71717A", // Secondary editorial text
        },

        background: "#FAF9F6", // Soft off-white page background
        surface: "#FFFFFF", // Clean card surfaces
        panel: "#F4F4F5", // Subtle light gray used in section backgrounds (e.g., Step 1)

        primary: {
          50: "#F4F4F5",
          100: "#E4E4E7",
          200: "#D4D4D8",
          300: "#A1A1AA",
          400: "#71717A",
          500: "#000000", // Core editorial black
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },

        // Refined grayscale for text hierarchy and subtle UI elements
        gray: {
          50: "#FAF9F6", // Page background tone
          100: "#F4F4F5", // Subtle section background / Soft card background
          200: "#E4E4E7", // Subtle divider/border color
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A", // Muted secondary text
          600: "#52525B",
          700: "#3F3F46",
          800: "#18181B",
          900: "#000000", // Deepest black for contrast
        },

        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },

        accent: "#000000",
        price: "#000000",
        whatsapp: "#25D366",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    screens: {
      xs: "400px",
      xmd: "800px",
      slg: "999px",
      ...require("tailwindcss/defaultTheme").screens,
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#E83E44",
              foreground: "#FFFFFF",
            },
            focus: "#E83E44",
          },
        },
      },
    }),
  ],
};
export default config;
