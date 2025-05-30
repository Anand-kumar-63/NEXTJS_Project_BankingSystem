"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { isatty } from "tty";

const Mobilenavbar = ({ user }: MobileNavProps) => {
  return (
    <section className="h-full">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            alt="hamburger"
            width={30}
            height={30}
          ></Image>
        </SheetTrigger>
        <SheetContent side="left" className="md:w-[400px] sm:w-[320px] max-w-[320px]">
          <SheetHeader>
            <SheetTitle></SheetTitle>
             <SheetClose asChild>
              <nav className="flex flex-row items-center justify-center gap-2 cursor-pointer">
                <Image
                
                  src={"/icons/logo.svg"}
                  alt="Lgoo"
                  width={30}
                  height={30}
                ></Image>
                <p className="font-mono text-xl">Horizon</p>
              </nav>
            </SheetClose>
            {sidebarLinks.map((items) => {
              const pathname = usePathname();
              const isActive = items.route == pathname;
              return (
                <SheetClose asChild>
                  <Link href={items.route} key={items.label}>
                    <div
                      className={cn(
                        "bg-white max-w-[300px] px-3 py-1 rounded-xl flex flex-row gap-4 items-center justify-items-start cursor-pointer",
                        isActive && "bg-blue-400"
                      )}
                    >
                      <Image
                        src={items.imgURL}
                        alt="Items"
                        height={30}
                        width={30}
                      ></Image>
                      <p className={cn('text-black',isActive&&'text-white')}> 
                        {items.label}
                      </p>
                    </div>
                  </Link>
                </SheetClose>
              );
            })}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Mobilenavbar;
