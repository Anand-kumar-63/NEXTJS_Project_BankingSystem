import Headerbox from "@/components/Headerbox";
import React from "react";
import Totalbalancebox from "@/components/Totalbalancebox";
import RightSidebar from "@/components/RightSidebar";
import { Section } from "lucide-react";
const page = () => {
  const loggedinuser = { firstname: "Adreian" , lastname:"Carter"};
  return (
    <div className="flex flex-row w-auto">
      <section className="flex flex-row justify-center items-start rounded-2xl ml-[40px] w-full ">
        <header className="flex flex-col justify-between gap-8 w-full mr-4">
          <Headerbox
            type="greeting"
            title="welcome"
            user={loggedinuser.firstname}
            subtext="Manage you banking and transaction"
          />
          <Totalbalancebox
            accounts={[]}
            totalCurrentBalance={1246}
            totalBanks={1}
          />
        </header>
      </section>
        <RightSidebar
        user={loggedinuser} 
        transactions={[]}
        banks={[]}
        />
    </div>
  );
};

export default page;
