import { availableMemory } from "process";
import { Plaidclient } from "../plaid";
import { parseStringify } from "../utils";
import { AccountHolderCategory, CountryCode } from "plaid";
import { getTransactionsByBankId } from "./transactions.actions";
import { getBanks } from "./user.actions";
import { getBank } from "./user.actions";
import { Account } from "node-appwrite";
import { AxiosError } from "axios";

export async function getAccounts({ DocumentId }: getAccountsProps) {
  // get the Banks documents saved in the appwrite database using the userId
  try {
    const banks = await getBanks({ DocumentId });
    // Now Get the each banks account details by maping over the banks and by using the accesstoken inside the each bank accounts document
    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // account Details using plaidclient and bank document accesstoken
        const accountResponse = await Plaidclient.accountsGet({
          access_token: bank.accessToken,
        });
        // get accoundata from the response we get
        const AccountData = accountResponse.data.accounts[0];
        // get institutions info from the plaid
        const institution = await getInstitution({
          institutionId: accountResponse.data.item.institution_id!,
        });

        // save every info you are gonna need to display somehwere in an object
        const account = {
          id: AccountData.account_id,
          availableBalance: AccountData.balances.available!,
          currentBalance: AccountData.balances.current!,
          institutionId: institution.institution_id,
          name: AccountData.name,
          officilaname: AccountData.official_name,
          mask: AccountData.mask,
          type: AccountData.type as string,
          subtype: AccountData.subtype as string,
          appwriteitemId: bank.$id,
          shareableId: bank.sharableId,
        };

        return account;
      })
    );
    const totalbanks = accounts.length;
    const totalbalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
    return parseStringify({
      data: accounts,
      totalbalance: totalbalance,
      totalbanks: totalbanks,
    });
  } catch (error) {
    console.error("Error in extracting the banks details");
  }
}
// get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    const bank = await getBank({ documentId: appwriteItemId });
    // get the accoun response
    const accountResponse = await Plaidclient.accountsGet({
      access_token: bank.accessToken,
    });
    const accoundata = accountResponse.data.accounts[0];
    const institution = await getInstitution({
      institutionId: accountResponse.data.item.institution_id!,
    });
    // get tranfer transactions from appwrite
    // const transferTransactionsData = await getTransactionsByBankId({
    //   bankId: bank.$id,
    // });
    // const transferTransactions = transferTransactionsData.documents.map(
    //   (transferData: Transaction) => ({
    //     id: transferData.$id,
    //     name: transferData.name!,
    //     amount: transferData.amount!,
    //     date: transferData.$createdAt,
    //     paymentChannel: transferData.channel,
    //     category: transferData.category,
    //     type: transferData.senderBankId === bank.$id ? "debit" : "credit",
    //   })
    // );
    const Transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });
    const account = {
      id: accoundata.account_id,
      availabeBalance: accoundata.balances.available,
      currentBalance: accoundata.balances.current,
      institutionId: institution.institution_id,
      name: accoundata.name,
      officialname: accoundata.official_name,
      mask: accoundata.mask!,
      type: accoundata.type as string,
      subtype: accoundata.subtype as string,
      appwriteItemId: bank.$id,
    };
       console.log(Transactions);
    // const alltransaction = [...transactions, transferTransactions].sort(
    //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    // );
    return parseStringify({
      data: account,
      transactions: Transactions,
    });
  } catch (error) {
    console.error("Error in getting The Account");
  }
};
// get institutions
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await Plaidclient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
// get Transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];
  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await Plaidclient.transactionsSync({
        access_token: accessToken,
      });
      const data = response.data;
      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }
    return parseStringify(transactions);
  } catch (error: any) {
    console.error("An error occurred while getting the accounts:", error);
    console.error("Axios Info:", error.response.data );
  }
};
