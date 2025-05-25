import Headerbox from "@/components/Headerbox";
import React from "react";
import Totalbalancebox from "@/components/Totalbalancebox";
import RightSidebar from "@/components/RightSidebar";
import { Section } from "lucide-react";
const page = () => {
  const loggedinuser = { firstName: "Adreian" , lastName:"Carter", email:"Adreian@gamil"};

  const Accounttopass = [{
    availableBalance: 13244,
    currentBalance: 11000,
    name:"Adreain",
    $id:12417643761,
    appwriteItemId:null
},{
    availableBalance: 14000,
    currentBalance: 12392,
    name:"tomhallan",
    $id:12343258735,
    appwriteItemId:null
}]
  return (
    <div className="flex flex-row w-auto">
      <section className="flex flex-row justify-center items-start rounded-2xl ml-[40px] w-full ">
        <header className="flex flex-col justify-between gap-8 w-full mr-4">
          <Headerbox
            type="greeting"
            title="welcome"
            user={loggedinuser.firstName}
            subtext="Manage you banking and transaction"
          />
          <Totalbalancebox
            accounts={[]}
            totalCurrentBalance={1246}
            totalBanks={1}
          />
        </header>
        {/* <div className="h-full w-full">
          <p className="h-10 w-160 border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">hello Myselft adreian</p>
        </div> */}
      </section>
        <RightSidebar
        user={loggedinuser} 
        transactions={[{},{}]}
        banks={Accounttopass}
        />
    </div>
  );
};

export default page;
