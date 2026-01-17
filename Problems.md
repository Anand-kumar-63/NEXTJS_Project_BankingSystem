## problem occured in getting the test transaction from the plaid sandbox account associated with the acocunt in the appwrite bank collection
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
// set the products getting from the plaid to transactions 
// NEXT_PUBLIC_PLAID_PRODUCTS= auth,transactions,identity
- Now you will get the plaid test transactions 
