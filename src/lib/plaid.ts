import { headers } from "next/headers";
import { Configuration , PlaidApi , PlaidEnvironments } from "plaid";

const plaidConfiguration = new Configuration({
    basePath:PlaidEnvironments.sandbox,
    baseOptions:{
    headers:{
        "PLAID-CLIENT-ID":process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET":process.env.PLAID_SECRET
    }
}})
// this you can all within your server actions;;
export const Plaidclient = new PlaidApi(plaidConfiguration);