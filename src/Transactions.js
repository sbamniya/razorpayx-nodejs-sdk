const ApiHelper = require("./utills/ApiHelper");
/**
 * Fetches all transaction for account
 * @param {string} accountNumber
 * @param {Filter} filter
 * @returns {Promise<Object>} any
 */
const getAll = async function (accountNumber, filter = {}) {
  return await new ApiHelper().call(`/transactions`, ``, "GET", {
    account_number: accountNumber,
    ...filter,
  });
};
/**
 * Fetches details of a transaction for account
 * @param {string} transactionId
 * @returns {Promise<Object>} any
 */
const get = async function (transactionId) {
  return await new ApiHelper().call(
    `/transactions`,
    `/${transactionId}`,
    "GET"
  );
};

module.exports = { getAll, get };
