const ApiHelper = require("./utills/ApiHelper");
/**
 * Creates a fund account for a contact
 * @param {AccountInfo} accountInfo
 * @returns {Promise<Object>} any
 */
const create = async function (accountInfo) {
  return await new ApiHelper().call(
    `/fund_accounts`,
    ``,
    "POST",
    undefined,
    accountInfo
  );
};
/**
 * Creates a public fund account for a contact, this is specifically used for Card payout. Read more here: https://razorpay.com/docs/razorpayx/api/payouts-cards/
 * @param {AccountInfo} accountInfo
 * @returns {Promise<Object>} any
 */
const createPublic = async function (accountInfo) {
  return await new ApiHelper().call(
    `/fund_accounts`,
    `/${public}`,
    "POST",
    undefined,
    accountInfo
  );
};
/**
 * Fetches all fund accounts
 * @param {filter} filter
 * @returns {Promise<Object>} any
 */
const getAll = async function (filter = {}) {
  return await new ApiHelper().call(`/fund_accounts`, ``, "GET", filter);
};
/**
 * Fetches details of an fund account
 * @param {string} accountId
 * @returns {Promise<Object>} any
 */
const get = async function (accountId) {
  return await new ApiHelper().call(`/fund_accounts`, `/${accountId}`, "GET");
};

/**
 * Activates a fund account
 * @param {string} accountId
 * @returns {Promise<Object>} any
 */
const activate = async function (accountId) {
  return await new ApiHelper().call(
    `/fund_accounts`,
    `/${accountId}`,
    "PATCH",
    undefined,
    {
      active: true,
    }
  );
};

/**
 * Deactivates a fund account
 * @param {string} accountId
 * @returns {Promise<Object>} any
 */
const deactivate = async function (accountId) {
  return await new ApiHelper().call(
    `/fund_accounts`,
    `/${accountId}`,
    "PATCH",
    undefined,
    {
      active: false,
    }
  );
};

module.exports = { create, createPublic, getAll, get, activate, deactivate };
