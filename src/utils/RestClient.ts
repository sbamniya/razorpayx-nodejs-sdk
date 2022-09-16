import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

/**
 * Calls api from the razorpay for given service
 * @example <caption>"/fund_accounts/validations", "POST", {id: "account_id"}</caption>
 * @param {service} url - url of the service
 * @param {method} method - method (GET, UPDATE, DELETE, POST, PATCH)
 * @param {object} params - params to be send in the API (Optional)
 * @param {AxiosRequestConfig} options - axios config object (Optional)
 */

const RestClient = async (
  url: string,
  method: Method = "GET",
  params: AxiosRequestConfig["data"] | AxiosRequestConfig["params"] = {},
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse["data"]> => {
  const token = `Basic ${Buffer.from(
    `${process.env.RAZORPAYX_API_KEY}:${process.env.RAZORPAYX_API_PRIVATE_SECRET}`
  ).toString("base64")}`;

  const config: AxiosRequestConfig = {
    ...options,
    baseURL: "https://api.razorpay.com/v1",
    method,
    headers: {
      ...options?.headers,
      Authorization: token as string,
    },
    data: method.toLowerCase() !== "get" ? params : undefined,
    params: method.toLowerCase() === "get" ? params : undefined,
  };
  try {
    return (await axios(url, config)).data;
  } catch (error) {
    throw (error as any).response || error;
  }
};

export default RestClient;
