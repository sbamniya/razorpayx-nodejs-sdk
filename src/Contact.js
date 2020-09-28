const ApiHelper = require("./utills/ApiHelper");
/**
 * Creates a contact for the account
 * @param {ContactItem} contactInfo
 * @returns {Promise<Object>} any
 */
const create = async function (contactInfo) {
  return await new ApiHelper().call(
    `/contacts`,
    ``,
    "POST",
    undefined,
    contactInfo
  );
};
/**
 * updates a contact for the account
 * @param {string} contactId
 * @param {ContactItem} contactInfo
 * @returns {Promise<Object>} any
 */
const update = async function (contactId, contactInfo) {
  return await new ApiHelper().call(
    `/contacts`,
    `/${contactId}`,
    "PATCH",
    undefined,
    contactInfo
  );
};

/**
 * Fetches all contacts the account
 * @param {filters} filters optional id
 * @returns {Promise<Object>} any
 */
const getAll = async function (filters = {}) {
  return await new ApiHelper().call(`/contacts`, ``, "GET", filters);
};

/**
 * Fetches details of a contact
 * @param {filters} filters optional id
 * @returns {Promise<Object>} any
 */
const get = async function (contactId) {
  return await new ApiHelper().call(`/contacts`, `/${contactId}`, "GET");
};
/**
 * Activates a contact
 * @param {string} contactId
 * @returns {Promise<Object>} any
 */
const activate = async function (contactId) {
  return await new ApiHelper().call(
    `/contacts`,
    `/${contactId}`,
    "PATCH",
    undefined,
    { active: true }
  );
};

/**
 * Deactivates a contact
 * @param {string} contactId
 * @returns {Promise<Object>} any
 */
const deactivate = async function (contactId) {
  return await new ApiHelper().call(
    `/contacts`,
    `/${contactId}`,
    "PATCH",
    undefined,
    { active: false }
  );
};
/**
 *
 */
module.exports = { create, update, getAll, get, activate, deactivate };
