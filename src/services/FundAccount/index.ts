import { Contact } from "../Contact";
import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";

export interface FundAccount extends GenericFields {
  entity: "fund_account";
  contact_id: Contact["id"];
  account_type: "vpa" | "bank_account";
}

export interface FundAccountBank extends FundAccount {
  bank_account: {
    name: string;
    ifsc: string;
    account_number: string;
  };
}
export interface FundAccountVPA extends FundAccount {
  vpa: {
    address: string;
  };
}

const RPXAccount = (client: RestClient) => {
  /**
   * Creates a fund account for a contact
   * @param {AccountInfo} accountInfo
   * @returns {Promise<Object>} any
   */
  const create = async (
    accountInfo: Pick<FundAccount, "contact_id" | "account_type"> &
      (FundAccountBank | FundAccountVPA)
  ): Promise<FundAccountBank | FundAccountVPA> =>
    client.load<FundAccountBank | FundAccountVPA>(
      "/fund_accounts",
      "POST",
      accountInfo
    );

  /**
   * Fetches all fund accounts
   * @param {filter} filter
   * @returns {Promise<Object>} any
   */
  const getAll = async (
    filter: Pageable &
      Partial<Pick<FundAccount, "account_type" | "contact_id">> = {}
  ): Promise<Response<FundAccountBank | FundAccountVPA>> =>
    client.load<Response<FundAccountBank | FundAccountVPA>>(
      "/fund_accounts",
      "GET",
      filter
    );

  /**
   * Fetches details of an fund account
   * @param {string} accountId
   * @returns {Promise<Object>} any
   */
  const get = async (
    accountId: FundAccount["id"]
  ): Promise<FundAccountBank | FundAccountVPA> =>
    client.load<FundAccountBank | FundAccountVPA>(
      `/fund_accounts/${accountId}`
    );

  /**
   * validate the fund account
   * @param {AccountInfo} accountInfo
   * @returns {Promise<Object>} any
   */
  const validate = async (accountInfo: {
    account_number: string;
    fund_account: {
      id: FundAccount["id"];
    };
    amount: number;
    currency: "INR";
    notes?: Record<string, string>;
  }): Promise<unknown> =>
    client.load<unknown>("/fund_accounts/validations", "POST", accountInfo);

  /**
   * Activates a fund account
   * @param {string} accountId
   * @returns {Promise<Object>} any
   */
  const activate = async (accountId: FundAccount["id"]): Promise<void> =>
    client.load<void>(`/fund_accounts/${accountId}`, "PATCH", {
      active: true,
    });

  /**
   * Deactivates a fund account
   * @param {string} accountId
   * @returns {Promise<Object>} any
   */
  const deactivate = async (accountId: FundAccount["id"]): Promise<void> =>
    client.load<void>(`/fund_accounts/${accountId}`, "PATCH", {
      active: false,
    });

  return {
    create,
    getAll,
    get,
    validate,
    activate,
    deactivate,
  };
};

export default RPXAccount;
