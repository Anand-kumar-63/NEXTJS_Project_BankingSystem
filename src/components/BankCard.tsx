import React from "react";
import Image from "next/image";
import Link from "next/link";

const BankCard = ({ userName, showBalance, account }: CreditCardProps) => {
  return (
    <div className="relative h-35 w-60 bg-gray-700 rounded-2xl mt-4 font-mono">
      <Link
        href={`/transfer-history/?id=${account.appwriteItemId}`}
        className="flex flex-col h-35 bg-left-card"
      >
        <div className="relative w-[75%] h-[100%] rounded-l-2xl bg-linear-to-r from-blue-400 to-blue-500  border-b-1 border-white" >
          <div className="flex flex-row justify-between ">
            <h1 className="m-2 text-sm text-bold mt-2 text-black text-white">
              {account.name}
            </h1>
            <p className="m-2 text-sm text-bold text-white mt-2">
              {account.currentBalance}
            </p>
          </div>

          <article className="mt-12">
            <div className="flex flex-row justify-between ml-2">
              <h1 className="text-sm text-white">{userName}</h1>
              <h1 className="text-sm mr-1 text-white"> ●● / ●●</h1>
            </div>
            <div className="ml-2 mt-1">
              <h1 className="text-sm text-white"> ●●●● / ●●●● / ●●●●</h1>
            </div>
          </article>
        </div>

        <div className="bg-left-card absolute right-0 top-0 w-[25%] rounded-r-2xl h-[100%] bg-blue-500
        flex flex-col justify-between border-r-1  border-b-1 border-white
        ">
            <Image className="ml-4 mt-2" src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
            <Image
              src="/icons/mastercard.svg"
              width={35}
              height={22}
              alt="mastercard"
              className="ml-2 mb-2"
            />
        </div>

        {/* <Image
          src={"/icons/lines.png"}
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0"
        /> */}
        
      </Link>
    </div>
  );
};
export default BankCard;
