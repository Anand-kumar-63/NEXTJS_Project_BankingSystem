"use client";
import react from "react";
import { LogOut, LogOutIcon } from "lucide-react";
import { LogoutAccount } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const Footer = ({user}:FooterProps) => {
  const router = useRouter();
  const logouttheuser = async () => {
    const loggedout =  await LogoutAccount();
  if(!loggedout) router.push("/sign-in");
  };
  
  return (
    <div className="flex flex-row items-center gap-2 border-1 p-3 h-full ">
      <div className="p-2 shadow-xl rounded-full border-8 ">
        <p className="text-blue-600">{user.name[0]}</p>
      </div>
      <div className="flex flex-row items-center gap-1 h-full">
        <div className="pr-2">
          <h1 className="text-black">{user.name}</h1>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
        <button
          className="text-blue-600 pl-3 border-l-2 h-full cursor-pointer "
          onClick={logouttheuser}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default Footer;
