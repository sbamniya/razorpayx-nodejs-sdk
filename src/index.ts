import RPXContact from "./services/Contact";
import RPXAccount from "./services/FundAccount";
import RestClient from "./utils/RestClient";

const RazorpayX = (key: string, secret: string, baseURL?: string) => {
  if (!key || secret) {  
    throw new Error(`Please pass API key and secret.`)
  }

  const client = new RestClient({
    key,
    secret,
    baseURL,
  });

  return {
    Contact: RPXContact(client),
    FundAccount: RPXAccount(client),
  };
};

export default RazorpayX;
