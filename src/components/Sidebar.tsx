'use client'
// import Icon from "@iconify/tailwind4"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
const Sidebar = ({user}:SiderbarProps) => {


  

  return (
    <section className="sticky left-0 top-0 flex h-screen w-[230px] flex-col items-center gap-2 border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-3 2xl:w-[355px]">
     
      <nav className="mt-2 mx-4">
        <Link href="/">
        <Image
        className="ml-2"
         src="/icons/logo.svg"
         width={50}
         height={30}
         alt="Picture of the author"
        />
          <h2 className="text-xl text-blue-500">Horizon</h2>
        </Link>
      </nav>
     
      {sidebarLinks.map((items) => {
        const pathname = usePathname();
        const isActive = pathname == items.route;
        return (
        <Link className={cn('flex gap-1 items-center mx-4 my-1 py-1 md:px-3 2xl:px-4 rounded-sm justify-center xl:justify-start',isActive?'bg-blue-400 text-white duration-75':'bg-white')} href={items.route} key={items.label}>
            <div className="flex flex-row justify-start items-center gap-2 w-[120px]"><Image 
             src={items.imgURL} 
             alt={items.label}
             width={30}
             height={20}
             >
            </Image>
            <p className={cn('text-black',isActive&& 'text-white')}>{items.label}</p>
            </div>
          </Link>
        );
      })}
      

      <footer className="mt-60">
        <Footer user={user}/>
      </footer>
    </section>
  );
};

export default Sidebar;
