import { Plaidclient } from "@/lib/plaid";
export default async function handler(req:any, res:any) {
  try {
    const { public_token } = req.body;
    const response = await Plaidclient.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;
    // NOTE: You should save access_token in your database (linked to the user)
    res.status(200).json({ access_token });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}