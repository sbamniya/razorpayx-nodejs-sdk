import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";
import { Contact } from "../Contact";

export interface Payout extends Omit<GenericFields, "active"> {
  entity: "payout";
  account_number?: string;
  fund_account_id: Contact["id"];
  /** Amount in paise */
  amount: number;
  currency: "INR";
  notes?: Record<string, string>;
  fees?: number;
  tax?: number;
  status:
    | "queued"
    | "pending"
    | "rejected"
    | "processing"
    | "processed"
    | "cancelled"
    | "reversed";
  utr: string;
  mode: "UPI" | "NEFT" | "RTGS" | "IMPS" | "card";
  purpose?:
    | "refund"
    | "cashback"
    | "payout"
    | "salary"
    | "utility bill"
    | "vendor bill"
    | string;
  reference_id?: string;
  narration?: string;
  status_details?: {
    source?: string;
    reason?: string;
    description?: string;
  };
}

class RPXPayout {
  client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  /**
   * Creates a payout for the given details
   * @link https://razorpay.com/docs/api/x/payouts/#create-a-payout
   */
  async create(
    payoutInfo: Pick<
      Payout,
      | "account_number"
      | "fund_account_id"
      | "amount"
      | "currency"
      | "mode"
      | "purpose"
      | "reference_id"
      | "narration"
      | "notes"
    > & { queue_if_low_balance?: boolean }
  ): Promise<Payout> {
    return this.client.load<Payout>("/payouts", "POST", payoutInfo);
  }
  /**
   * Fetches all payout
   * @link https://razorpay.com/docs/api/x/payouts/#fetch-all-payouts
   */
  async getAll(
    accountNumber: Payout["account_number"],
    filter: Pageable &
      Partial<
        Pick<Payout, "fund_account_id" | "mode" | "reference_id" | "status">
      > & { contact_id?: string } = {}
  ): Promise<Response<Payout>> {
    return this.client.load<Response<Payout>>("/payouts", "GET", {
      account_number: accountNumber,
      ...filter,
    });
  }

  /**
   * Fetch details of a payout
   * @link https://razorpay.com/docs/api/x/payouts/#fetch-a-payout-by-id
   */
  async get(payoutId: Payout["id"]): Promise<Payout> {
    return this.client.load<Payout>(`/payouts/${payoutId}`);
  }
  /**
   * Cancels the payout for given payoutId
   * @link https://razorpay.com/docs/api/x/payouts/#cancel-a-queued-payout
   */
  async cancel(payoutId: Payout["id"]): Promise<void> {
    return this.client.load<void>(`/payouts/${payoutId}/cancel`, "POST");
  }
}

export default RPXPayout;
