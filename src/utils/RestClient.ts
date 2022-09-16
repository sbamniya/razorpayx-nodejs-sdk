import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

class RestClient {
  private key: string;
  private secret: string;
  private baseURL: string;

  constructor(options: { key: string; secret: string; baseURL?: string }) {
    this.key = options.key;
    this.secret = options.secret;
    this.baseURL = options.baseURL || "https://api.razorpay.com/v1";
    return this;
  }
  /**
   * Calls api from the razorpay for given service
   * @example <caption>"/fund_accounts/validations", "POST", {id: "account_id"}</caption>
   * @param {service} url - url of the service
   * @param {method} method - method (GET, UPDATE, DELETE, POST, PATCH)
   * @param {object} params - params to be send in the API (Optional)
   * @param {AxiosRequestConfig} options - axios config object (Optional)
   */
  async load<T>(
    url: string,
    method: Method = "GET",
    params: AxiosRequestConfig["data"] | AxiosRequestConfig["params"] = {},
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const token = `Basic ${Buffer.from(`${this.key}:${this.secret}`).toString(
      "base64"
    )}`;

    const config: AxiosRequestConfig = {
      ...options,
      baseURL: this.baseURL,
      method,
      headers: {
        ...options?.headers,
        Authorization: token,
      },
      data: method.toLowerCase() !== "get" ? params : undefined,
      params: method.toLowerCase() === "get" ? params : undefined,
    };
    try {
      return (await axios(url, config)).data;
    } catch (error) {
      throw (error as any).response || error;
    }
  }
}

export default RestClient;
