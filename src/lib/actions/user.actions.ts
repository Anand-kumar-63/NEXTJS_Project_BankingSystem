"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { Account, Client, ID, Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { parse } from "path";
import { Plaidclient } from "../plaid";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from 'plaid';
import { User } from "@sentry/nextjs";
import { revalidatePath } from "next/cache";
import { createDwollaCustomer } from "./dwolla.actions";
import { addFundingSource } from "./dwolla.actions";
import { Session } from "inspector/promises";
import { useController } from "react-hook-form";

const {APPWRITE_DATABASE_ID:DATABASE_ID ,
   APPWRITE_BANK_COLLECTION_ID:BANK_COLLECTION_ID,
APPWRITE_USER_COLLECTION_ID:USER_COLLECTION_ID
  } = process.env;

export async function getuserInfo({userId}:getUserInfoProps) {
  try{
    const {database} = await createAdminClient();
    const UserResponse = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
     [Query.equal("userId",[userId])]
    )
    return parseStringify(UserResponse.documents[0]);
  }
  catch(error){
    console.error("Error in getting the loggedin user data",error);
  }
}

export async function signIn(userData: signInProps) {
  try {
  // you have to explicitly set cookie in the browser
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    }); 
    const user = await getuserInfo({userId:session.userId})
    return parseStringify(user);
    //Appwrite will set a session cookie in the browser.
    // const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    // .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

    // const account = new Account(client);
    // const response = await account.createEmailPasswordSession(userData.email, userData.password);
    // return parseStringify(response);
  } catch (error) {
    console.error("Error in sign-in:", error);
  }
}
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
    const userInfo = await getuserInfo({userId:result.$id})
    return parseStringify(userInfo || null);
  } catch (error) {
    return error;
  }
}
export async function Signup(userData: SignUpParams) {
  // [All the dwolla api endpoints we are going to use is already createrd in dwolla.actions.ts in lib/actions]
  const { email, password, firstName, lastName } = userData;
  let newuserAccount; 
  try {
    const { account ,database } = await createAdminClient();
    
    // new user account created
    newuserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName}${lastName}`
    );
    console.log(newuserAccount.$id);
    if(!newuserAccount) throw new Error("Error creating user");
    // creating the dwolla customer url using the userdata from the signup page and type:'personla' 
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type:"personal"
    });
    if(!dwollaCustomerUrl) throw new Error("Error in creating dwolla customer")
    
    // extract a dwollla customer id from the dwolla customer url as it needed to store in the user collection document inside the database..
    const dwollaCustomerId = await extractCustomerIdFromUrl(dwollaCustomerUrl);
    if(!dwollaCustomerId) throw new Error("Error in creating a dwolla customerId");
   
    // creating a user in the Bank database inside the user Collection
    // that requires DatabaseId , Usercollection id , Id.unique is for document that is going to store in that user collection
    // then userdata from the signup page
    // and dwollacustomerid , dwollacustomerurl every new user should conatain a dwolla custormer url and id to act as a funding source url whenever needed to perform a transaction

    const newUser = await database.createDocument(
      DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
         userId: newuserAccount.$id,
        ...userData,
        dwollaCustomerId,
        dwollaCustomerUrl
      }
    );
    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log(newUser);
    return parseStringify(newUser);
  } catch (error) {
    console.error("Error in Signup", error);
  }
}
export async function LogoutAccount() {
  try
  {
  const {account} = await createSessionClient();
  (await cookies()).delete("appwrite-session");
  await account.deleteSession('current');
  }
  catch(error){
    return error;
  }
}
export async function CreateLinkToken({user}:User) { 
  try {
    const response = await Plaidclient.linkTokenCreate({
      user: { client_user_id: user.$id }, 
      client_name : user.firstName, 
      products: ['auth','transactions'] as Products[],
      country_codes : ['US'] as CountryCode[],
      language: 'en',
    });
    if(!response) throw new Error("Error in creating the Link_token");
    console.log(parseStringify({link_token:response.data.link_token}));
    return parseStringify({link_token:response.data.link_token});
  } catch (error:any) {
    console.error("Plaid Error:", error.response?.data || error.message);
    return { link_token: null, error: 'Failed to create link token' };
  }
}
export const createBankAccount = async ({
 userId,bankId,accountId,accessToken,fundingSourceUrl,sharableId,
}:createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();
    const bankAccount = await database.createDocument(
    DATABASE_ID!,
    BANK_COLLECTION_ID!,
    ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      })
    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
}
export async function exchangePublicToken({publicToken , user}:exchangePublicTokenProps) {
  try {
     // Exchange public token for access token and item ID
    const response = await Plaidclient.itemPublicTokenExchange({public_token:publicToken});
    const accesstoken = response.data.access_token;
   if(!accesstoken) throw new Error("Error in exchanging the public_token with access_token")
    // store the itemid in a variable
    const itemId = response.data.item_id;
     // Get account information from Plaid using the access token
     const accountInfo = await Plaidclient.accountsGet({
      access_token:accesstoken,
     })
    if(!accountInfo) throw new Error("Error in Extracting the accountinfo");

     const accountdata = accountInfo.data.accounts[0];
     const accountid = accountdata.account_id;

     // Create a processor token for Dwolla using the access token and account ID
     const request:ProcessorTokenCreateRequest={
      access_token:accesstoken,
      account_id:accountid,
      processor:"dwolla" as ProcessorTokenCreateRequestProcessorEnum,
     }
     
     if(!request) throw new Error("Dwolla processor token creation Error");

     const processorTokenresponse = await Plaidclient.processorTokenCreate(request);
     const processorToken = processorTokenresponse.data.processor_token;
     
     if(!processorToken) throw new Error("Error in creating the Process Token Dwolla..")
      // create a funding soure url for the account using the Dwolla customerId , processor token , and bankname
     const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountdata.name,
    });
    if (!fundingSourceUrl) throw new Error("Error in creating the funding source URL..");
    
    const bankAccount = await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountdata.account_id,
      accessToken:accesstoken,
      fundingSourceUrl:fundingSourceUrl,
      sharableId: encryptId(accountdata.account_id),
    });
    if(!bankAccount) throw new Error("Error in creating the bank account");
    // Revalidate the path to reflect the changes
    if(bankAccount)
      {
       revalidatePath("/home");
      }
    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",})

  } catch (error:any) {
    console.error("Error while creating Exchanging token",error);
  }
}
// helpfull for showing the data on the home page 
export const getBanks = async ({DocumentId}:getBanksProps)=>{
  try{
    // getting the database access from crete admit client to apply query on the database 
    const {database} = await createAdminClient();
    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("Document ID",[DocumentId])]
    )
   return parseStringify(banks.documents);
  }
  catch(error){
    console.error("Error in getting the banks from the given userId");
  }
}
export const getBank = async ({documentId}:getBankProps)=>
{
try{
const {database
} = await createAdminClient();
const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("Document ID",[documentId])]
    )   
return parseStringify(bank.documents[0])}
catch(error){
  console.error("Error in getting the Bank details",error);
}};

export const getBankByAccountId = async({accountId}:getBankByAccountIdProps)=>{
  try{
const {database} = await createAdminClient();
const bank = await database.listDocuments(
  DATABASE_ID!,
  BANK_COLLECTION_ID!,
  [Query.equal("$id",[accountId])]
)
console.log(bank)
if(bank.total != 1 ) return null
return parseStringify(bank.documents[0])
  }catch(error){
    console.error("Error in getting the Account by using accountid")
  }
}