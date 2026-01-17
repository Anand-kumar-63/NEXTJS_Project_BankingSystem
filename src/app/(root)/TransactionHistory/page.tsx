import HeaderBox from "@/components/Headerbox";
import { Pagination } from "@/components/pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/banks.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  let account = null;
  let currentTransactions = [];
  let totalPages = 1;
  let currentPage = Number(page as string) || 1;
  try {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ DocumentId: loggedIn.$id });
    if (!accounts || !accounts.data || accounts.data.length === 0) {
      console.log("Not getting the account");
    } else {
      const accountsData = accounts.data;
      const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
      account = await getAccount({ appwriteItemId });
      if (!account || !account.transactions) {
        console.log("Cannot find the account or transactions");
        account = { data: {}, transactions: [] };
      }
      const rowsPerPage = 10;
      totalPages = Math.max(1, Math.ceil((account.transactions?.length || 0) / rowsPerPage));
      const indexOfLastTransaction = currentPage * rowsPerPage;
      const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
      currentTransactions = account.transactions?.slice(indexOfFirstTransaction, indexOfLastTransaction) || [];
    }
  } catch (error) {
    console.error("Hey there is a problem", error);
  }
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          user=""
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data?.name || "No account found"}
            </h2>
            <p className="text-14 text-blue-25">{account?.data?.officialName || ""}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data?.mask || ""}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data?.currentBalance || 0)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
