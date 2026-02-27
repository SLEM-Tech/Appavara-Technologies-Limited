"use client";
import React, {
  useMemo,
  useState,
  useTransition,
  Fragment,
  useRef,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
  currencyOptions,
  filterCustomersByEmail,
  headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiShoppingCart,
  FiX,
  FiUser,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import { FaCartArrowDown, FaShoppingBag } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import Link from "@node_modules/next/link";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useToken();
  const { totalItems } = useCart();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [isPending, startTransition] = useTransition();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  useEffect(() => {
    if (isSearchExpanded && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchExpanded]);

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  const handleCurrencyChange = async (code: string) => {
    const selectedObj = currencyOptions.find((c) => c.code === code);
    if (!selectedObj) return;

    try {
      const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedObj));
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch (error) {
      FormToast({ message: "Currency switch failed", success: false });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;
    startTransition(() => {
      router.push(`/search?q=${searchValue}`);
    });
  };

  const userDropDownLinks = [
    { id: 1, href: "/user/dashboard", icon: <BiUser />, label: "My Account" },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-white z-[100] fixed top-0 border-b border-gray-100 transition-all duration-300">
        {/* Main Desktop Header */}
        <div className="hidden slg:flex items-center justify-between w-full h-20 max-w-[1540px] px-12 mx-auto">
          {/* 1. Logo Section */}
          <div className="flex items-center shrink-0 min-w-[180px]">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                {/* This represents the leaf icon in the screenshot */}
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 40 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 30C20 30 10 20 0 15C0 15 10 10 20 15V30Z"
                    fill="black"
                  />
                  <path
                    d="M20 30C20 30 30 20 40 15C40 15 30 10 20 15V30Z"
                    fill="black"
                  />
                  <path
                    d="M20 12C20 12 15 6 10 4C10 4 15 2 20 4V12Z"
                    fill="black"
                  />
                  <path
                    d="M20 12C20 12 25 6 30 4C30 4 25 2 20 4V12Z"
                    fill="black"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-widest text-black">
                LOGO
              </span>
            </Link>
          </div>

          {/* 2. Centered Navigation Section */}
          <nav className="flex items-center justify-center gap-10 flex-1">
            {headerNavLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1 hover:text-gray-500 ${
                  pathname === link.href ? "text-black" : "text-[#111111]"
                }`}
              >
                {link.text}
                {(link.text.toLowerCase() === "home" ||
                  link.text.toLowerCase() === "accessories" ||
                  link.text.toLowerCase() === "shop") && (
                  <SlArrowDown size={10} className="mt-0.5" strokeWidth={50} />
                )}
              </Link>
            ))}
          </nav>

          {/* 3. Icons Controls Section */}
          <div className="flex items-center gap-6 shrink-0 min-w-[180px] justify-end">
            {/* Search Toggle */}
            <div className="relative group">
              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <FiSearch size={22} className="text-black" />
              </button>
              {isSearchExpanded && (
                <div className="absolute top-10 right-0 w-[250px] bg-white border border-gray-100 p-2 rounded shadow-xl animate-fade-in">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full text-xs p-2 outline-none border-b border-gray-200"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              )}
            </div>

            {/* Account / User */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center outline-none hover:opacity-70 transition-opacity p-1">
                {wc_customer_info?.shipping?.address_2 ? (
                  <div className="size-6 rounded-full overflow-hidden border border-gray-200">
                    <Picture
                      src={wc_customer_info.shipping.address_2}
                      alt="user"
                      className="size-full object-cover"
                    />
                  </div>
                ) : (
                  <FiUser size={22} className="text-black" />
                )}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
              >
                <Menu.Items className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[110] outline-none">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs font-bold text-black uppercase tracking-widest">
                      {wc_customer_info?.first_name || "Account"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {userDropDownLinks.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              if (item.onClick) {
                                e.preventDefault();
                                item.onClick();
                              } else if (item.href) {
                                router.push(item.href);
                              }
                            }}
                            className={`${active ? "bg-gray-50 text-black" : "text-gray-600"} flex w-full items-center gap-3 rounded-lg px-4 py-3 text-xs font-medium transition-all`}
                          >
                            {item.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <Menu.Item>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg mt-1 transition-all"
                    >
                      Log Out
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Cart Icon */}
            <div
              className="flex items-center cursor-pointer relative group p-1 hover:opacity-70 transition-opacity"
              onClick={onOpenCart}
            >
              <FiShoppingCart size={22} className="text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-black text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="slg:hidden flex flex-col w-full p-5 gap-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <button onClick={() => setDrawerVisible(true)} className="p-1">
              <FiMenu className="text-2xl text-black" />
            </button>
            <span className="text-lg font-bold tracking-widest">LOGO</span>
            <div onClick={onOpenCart} className="relative p-1">
              <FiShoppingCart className="text-2xl text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-black rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768
            ? 500
            : "100%"
        }
        className="bg-white shadow-2xl"
      >
        <ProductTable onClose={onCloseCart} />
      </Drawer>

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;
