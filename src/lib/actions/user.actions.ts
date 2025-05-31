"use server";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { Account, Client, ID } from "node-appwrite";
import { redirect } from "next/navigation";
import { parse } from "path";

export async function signIn(userData: signInProps) {
  try {
  // you have to explicitly set cookie in the browser
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );
    (await cookies()).set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(response);
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
    const user = await account.get();
    return parseStringify(user || null);
  } catch (error) {
    return error;
  }
}

export async function Signup(userData: SignUpParams) {
  const { email, password, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();
    // new user account created
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName}${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
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
