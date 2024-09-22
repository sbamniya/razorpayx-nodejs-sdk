import RPXContact from "./services/Contact";
import RPXAccount from "./services/FundAccount";
import RPXPayout from "./services/Payout";
import RPXPayoutLink from "./services/PayoutLink";
import RPXTransactions from "./services/Transactions";
import RestClient from "./utils/RestClient";

export const RazorpayX = (key: string, secret: string, baseURL?: string) => {
  if (!key || !secret) {
    throw new Error("Please pass API key and secret.");
  }

  const client = new RestClient({
    key,
    secret,
    baseURL,
  });

  return {
    Contact: new RPXContact(client),
    FundAccount: new RPXAccount(client),
    Payout: new RPXPayout(client),
    PayoutLink: new RPXPayoutLink(client),
    Transactions: new RPXTransactions(client),
  };
};

export default RazorpayX;

module.exports = RazorpayX;
