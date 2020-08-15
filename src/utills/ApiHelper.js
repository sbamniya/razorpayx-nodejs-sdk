const Axios = require("axios");
const ErrorHandlerHelper = require("./ErrorHandlerHelper");
const SuccessHandlerHelper = require("./SuccessHandlerHelper");

/**
 * ApiHelper Class - For making Api Requests
 */
class ApiHelper {
  constructor() {
    this._portalGateway = "https://api.razorpay.com";
    this._apiVersion = process.env.RAZORPAYX_API_VERSION || "/v1";
  }
  setApiVersion = (version) => {
    this._apiVersion = version;
  };
  /**
   * Fetches from the Gateway defined by the instantiated object. Accepts <T> as output object.
   * @example <caption>"/Auth/UserAccount", "/GetCurrentUser", "GET"</caption>
   * @param {service} service - wanting to be access ex. "UserAuth/Auth"
   * @param {endpoint} endpoint - you wish to call ex. "/Login"
   * @param {method} method - method (GET, UPDATE, DELETE, POST)
   * @param {queryOptions} Query - query options for "GET" methods (Optional)
   * @param {body} body - JSON body for "UPDATE, DELETE and POST" methods (Optional)
   */
  async call(
    service,
    endpoint,
    method,
    queryOptions = undefined,
    body = undefined,
    options = {}
  ) {
    options.method = method;
    let url = `${this._apiVersion}${service}${endpoint}`;
    if (!options.headers) {
      options.headers = { "Content-Type": "application/json" };
    }
    options.headers.Authorization = `Basic ${Buffer.from(
      `${process.env.RAZORPAYX_API_KEY}:${process.env.RAZORPAYX_API_PRIVATE_SECRET}`
    ).toString("base64")}`;
    // html query for "GET", json body for others.
    if (queryOptions && typeof queryOptions === "object") {
      let queryParams = [];
      Object.keys(queryOptions).map((key) => {
        queryParams.push(`${key}=${queryOptions[key]}`);
        return key;
      });
      url += `?${queryParams.join("&")}`;
    }

    if (body) {
      options.data = body;
    }
    try {
      let response = await Axios({
        ...options,
        url: `${this._portalGateway}${url}`,
      });

      if (response.status < 200 || response.status >= 300) {
        let errorObject = {
          code: response.status,
          response: response.data,
        };

        throw errorObject;
      }
      const data = new SuccessHandlerHelper(response.data);
      return data.data;
    } catch (err) {
      const errorHelper = new ErrorHandlerHelper(err.response);
      return errorHelper.error;
    }
  }
}

module.exports = ApiHelper;
