import Mobilenavbar from "@/components/Mobilenavbar";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  const loggedinuser1 = await getLoggedInUser();
  // console.log(loggedinuser1)
  // if(!loggedinuser1) redirect("/sign-in");

  return (
<main className="flex flex-row h-screen w-full font-inter">
    <Sidebar user={loggedinuser1}/>
    <div className="flex flex-col w-full">
      <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
        <Link href='/home'>
        <Image src={'/icons/logo.svg'} alt="logo" width={40} height={30}></Image>
        </Link>
        <div>
        <Mobilenavbar user={loggedinuser1} />
        </div>
      </div>
    {children}
    </div>
   
</main>
  );
}