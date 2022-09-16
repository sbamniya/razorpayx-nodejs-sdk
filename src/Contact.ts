import RestClient from "./utils/RestClient";
import { GenericFields, Pageable, Response } from "./types/generic";

export interface Contact extends Omit<GenericFields, "entity"> {
  entity: "contact";
  name: string;
  email?: string;
  contact?: string;
  type?: "vendor" | "customer" | "employee" | "self";
  reference_id?: string;
  notes?: Record<string, string>;
}

/**
 * Creates a contact for the account
 * @param {Contact} contactInfo
 * @returns {Promise<Response<Contact>>}
 */
const create = async (
  contactInfo: Omit<
    Contact,
    "id" | "entity" | "batch_id" | "created_at" | "active"
  >
): Promise<Contact> => RestClient("/contacts", "POST", contactInfo);

/**
 * updates a contact for the account
 * @param {string} contactId
 * @param {Contact} contactInfo
 * @returns {Promise<Object>} any
 */
const update = async (
  contactId: Contact["id"],
  contactInfo: Omit<
    Contact,
    "id" | "entity" | "batch_id" | "created_at" | "active"
  >
): Promise<void> => RestClient(`/contacts/${contactId}`, "PATCH", contactInfo);

/**
 * Fetches all contacts the account
 * @param {Pageable} filters optional id
 * @returns {Promise<Object>} any
 */
const getAll = async (
  filters: Pageable &
    Partial<
      Pick<
        Contact,
        "name" | "email" | "contact" | "reference_id" | "active" | "type"
      >
    > = {}
): Promise<Response<Contact>> => RestClient("/contacts", "GET", filters);

/**
 * Fetches details of a contact
 * @param {Contact["id"]} contactId optional id
 * @returns {Promise<Contact>} any
 */
const get = async (contactId: Contact["id"]): Promise<Contact> =>
  RestClient(`/contacts/${contactId}`);

/**
 * Activates a contact
 * @param {string} contactId
 * @returns {Promise<Object>} any
 */
const activate = async (contactId: Contact["id"]): Promise<void> =>
  RestClient(`/contacts/${contactId}`, "PATCH", {
    active: true,
  });

/**
 * Deactivates a contact
 * @param {string} contactId
 * @returns {Promise<Object>} any
 */
const deactivate = async (contactId: Contact["id"]): Promise<void> =>
  RestClient(`/contacts/${contactId}`, "PATCH", {
    active: false,
  });

/**
 *
 */
module.exports = { create, update, getAll, get, activate, deactivate };
