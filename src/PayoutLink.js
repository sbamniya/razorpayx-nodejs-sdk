const ApiHelper = require("./utills/ApiHelper");
/**
 * Creates a payout link for the given details
 * @param {PayoutLinkInfo} payoutLinkInfo
 * @returns {Promise<Object>} any
 */
const create = async function (payoutLinkInfo) {
  return await new ApiHelper().call(
    `/payout-links`,
    ``,
    "POST",
    undefined,
    payoutLinkInfo
  );
};
/**
 * Fetches all payout links
 * @param {Filter} filter
 * @returns {Promise<Object>} any
 */
const getAll = async function (filter = {}) {
  return await new ApiHelper().call(`/payout-links`, ``, "GET", filter);
};

/**
 * Fetch details of a payout link
 * @param {string} payoutLinkId
 * @returns {Promise<Object>} any
 */
const get = async function (payoutLinkId) {
  return await new ApiHelper().call(`/payout-links`, `/${payoutLinkId}`, "GET");
};
/**
 * Cancels the payout link for given payoutLinkId
 * @param {string} payoutLinkId
 * @returns {Promise<Object>} any
 */
const cancel = async function (payoutLinkId) {
  return await new ApiHelper().call(
    `/payout-links`,
    `/${payoutLinkId}/${cancel}`,
    "POST"
  );
};
/**
 *
 */
module.exports = { create, getAll, get, cancel };
