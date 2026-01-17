import Headerbox from "@/components/Headerbox";
import React from "react";
import Totalbalancebox from "@/components/Totalbalancebox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccounts } from "@/lib/actions/banks.actions";
import { getAccount } from "@/lib/actions/banks.actions";
import RecentTransaction from "@/components/RecentTransaction";

const page = async({params:{id , page}}:SearchParamProps) => {

const Currentpage = Number(page as String) || 1;

  // const Currentpage = Number(page as string) || 1
  const loggedinuser = await getLoggedInUser();
  // we are trying to get the all the accounts associated with the loggedinuser array[]
  const accounts = await getAccounts({DocumentId:loggedinuser.$id})
  if(!accounts) throw new Error("Error in Getting the data of banks for this particular user documnet id");
  
  // this accountData is the data of the first Bank in the array of banks associsated with the particular loggedInuser.
  const accountsData = accounts?.data;
  if(!accountsData) throw new Error("Error in getting the accountData!")

  // this appwritemid is the apppwriteitemid of the firstbank associated with the particular loggein user.
  const appwriteItemId = accountsData[0]?.appwriteitemId!;
  if(!appwriteItemId) throw new Error("Error in getting the appwriteitemId for a Particular Bank Account");
  
  // using the appwriteitem id of the particular bank i am getting the details of that particular bank and getting the transaction related to that account plus getting the test transactions from the plaid sandox account 
  const account = await getAccount({appwriteItemId});

  return (
    <div className="flex flex-row w-auto">
      <section className="flex flex-col justify-center items-start rounded-2xl ml-[40px] w-full ">
        <header className="flex flex-col justify-between gap-8 w-full mr-4">
          <Headerbox
            type="greeting"
            title="welcome"
            user={loggedinuser.firstName}
            subtext="Manage your banking and payment Transaction"
          />
          <Totalbalancebox
            accounts={accounts.data}
            totalCurrentBalance={accounts.totalbalance}
            totalBanks={accounts?.totalbanks}
          />
        </header>

        <RecentTransaction
        accounts={accountsData}
        transactions={account?.transactions}
        page={Currentpage}
        appwriteItemId={appwriteItemId}
        />

        <div className="h-full w-full">
        </div>
      </section>
        <RightSidebar
        user={loggedinuser} 
        transactions={account?.Transactions}
      banks={[{},{}]}
        />
    </div>
  );
};

export default page;
