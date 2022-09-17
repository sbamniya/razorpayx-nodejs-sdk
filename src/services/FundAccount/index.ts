import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";
import { Contact } from "../Contact";

export interface FundAccount extends Omit<GenericFields, "entity"> {
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

class RPXAccount {
  client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }
  /**
   * Creates a fund account for a contact
   * @link https://razorpay.com/docs/api/x/fund-accounts#create-a-fund-account
   */
  async create(
    accountInfo: Pick<FundAccount, "contact_id" | "account_type"> &
      (FundAccountBank | FundAccountVPA)
  ): Promise<FundAccountBank | FundAccountVPA> {
    return this.client.load<FundAccountBank | FundAccountVPA>(
      "/fund_accounts",
      "POST",
      accountInfo
    );
  }

  /**
   * Fetches all fund accounts
   * @link https://razorpay.com/docs/api/x/fund-accounts#fetch-all-fund-accounts
   */
  async getAll(
    filter: Pageable &
      Partial<Pick<FundAccount, "account_type" | "contact_id">> = {}
  ): Promise<Response<FundAccountBank | FundAccountVPA>> {
    return this.client.load<Response<FundAccountBank | FundAccountVPA>>(
      "/fund_accounts",
      "GET",
      filter
    );
  }

  /**
   * Fetches details of an fund account
   * @link https://razorpay.com/docs/api/x/fund-accounts#fetch-fund-account-details-by-id
   */
  async get(
    accountId: FundAccount["id"]
  ): Promise<FundAccountBank | FundAccountVPA> {
    return this.client.load<FundAccountBank | FundAccountVPA>(
      `/fund_accounts/${accountId}`
    );
  }

  /**
   * validate the fund account
   * @link https://razorpay.com/docs/api/x/account-validation#validate-a-bank-account
   * @link https://razorpay.com/docs/api/x/account-validation#validate-a-vpa
   */
  async validate(accountInfo: {
    account_number: string;
    fund_account: {
      id: FundAccount["id"];
    };
    amount: number;
    currency: "INR";
    notes?: Record<string, string>;
  }): Promise<unknown> {
    return this.client.load<unknown>(
      "/fund_accounts/validations",
      "POST",
      accountInfo
    );
  }

  /**
   * Activates a fund account
   * @link https://razorpay.com/docs/api/x/fund-accounts#activate-or-deactivate-a-fund-account
   */
  async activate(accountId: FundAccount["id"]): Promise<void> {
    return this.client.load<void>(`/fund_accounts/${accountId}`, "PATCH", {
      active: true,
    });
  }

  /**
   * Deactivates a fund account
   * @link https://razorpay.com/docs/api/x/fund-accounts#activate-or-deactivate-a-fund-account
   */
  async deactivate(accountId: FundAccount["id"]): Promise<void> {
    return this.client.load<void>(`/fund_accounts/${accountId}`, "PATCH", {
      active: false,
    });
  }
}

export default RPXAccount;
