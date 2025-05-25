import Link from "next/link";
import React from "react";
import Image from "next/image";
import BankCard from "./BankCard";
import Category from "./Category";
import { countTransactionCategories } from "@/lib/utils";
const RightSidebar = ({ user, banks, transactions }: RightSidebarProps) => {

   const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className=" ml-4 w-[400px] md:block hidden shadow-sm h-screen">
      <section className="flex flex-col cursor-pointer">
        <div className="bg-right-sidebar bg-cover bg-center h-[120px] w-full shadow-blue-50">
          <div className="relative flex px-6 max-xl:justify-center">
            <Link href="/profile">
              <div className="flex justify-center items-center absolute top-22 size-20 rounded-full bg-gray-100 border-8 border-white p-1">
                <span className="text-blue-400 text-5xl">
                  {user.firstName[0]}
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-gray-700 mt-12 ml-4">
            {user.firstName}
            {user.lastName}
          </h1>
          <p className="text-gray-500 ml-4 text-sm">{user.email}.pro</p>
        </div>
      </section>

      <section className="mt-4 mx-1 border-t-gray-100 border-t-1">
        <div className="mt-3">
          <div className="flex flex-row justify-between">
            <h1 className="text-sm ml-3">My banks</h1>
            <Link href={"/Add"} className="flex flex-row items-center">
              <Image
                src={"/icons/plus.svg"}
                alt="Plus"
                height={20}
                width={20}
              />
              <h1 className="text-sm mr-2">Add banks</h1>
            </Link>
          </div>

          {banks.length > 0 && (
            <div className="relative flex justify-center items-center">
              <div className="relative z-10">
                <BankCard
                  key={banks[0].$id}
                  account={banks[0]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
              {banks[1] && (
                <div className="absolute top-8 right-0 z-0 w-[90%]">
                  <BankCard
                    key={banks[0].$id}
                    account={banks[1]}
                    userName={`${user.firstName} ${user.lastName}`}
                    showBalance={false}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mt-10 border-t-1">
         <div className="mt-2 flex flex-1 flex-col gap-1">
          <h2 className="header-2 text-sm text-bold ml-4">Top categories</h2>
          <div className='space-y-5'>
            {categories.map((category, index) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
      
    </aside>
  );
};

export default RightSidebar;
