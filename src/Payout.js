const ApiHelper = require("./utills/ApiHelper");
/**
 * Creates a payout for the given details
 * @param {PayoutInfo} payoutInfo (https://razorpay.com/docs/razorpayx/api/payouts/#create-a-payout)
 * @returns {Promise<Object>} any
 */
const create = async function (payoutInfo) {
  return await new ApiHelper().call(
    `/payouts`,
    ``,
    "POST",
    undefined,
    payoutInfo
  );
};
/**
 * Fetches all payout
 * @param {string} accountId The account from which you want to make the payout.
 * @param {Filter} filter (https://razorpay.com/docs/razorpayx/api/payouts/#fetch-all-payouts)
 * @returns {Promise<Object>} any
 */
const getAll = async function (accountNumber, filter = {}) {
  return await new ApiHelper().call(`/payouts`, ``, "GET", {
    account_number: accountNumber,
    ...filter,
  });
};

/**
 * Fetch details of a payout
 * @param {string} payoutId
 * @returns {Promise<Object>} any
 */
const get = async function (payoutId) {
  return await new ApiHelper().call(`/payouts`, `/${payoutId}`, "GET");
};
/**
 * Cancels the payout for given payoutId
 * @param {string} payoutId
 * @returns {Promise<Object>} any
 */
const cancel = async function (payoutId) {
  return await new ApiHelper().call(
    `/payouts`,
    `/${payoutId}/${cancel}`,
    "POST"
  );
};
/**
 *
 */
module.exports = { create, getAll, get, cancel };
