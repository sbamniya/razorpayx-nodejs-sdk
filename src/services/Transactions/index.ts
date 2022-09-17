import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";
import { Payout } from "../Payout";

export interface TransactionSource {
  id: string;
  entity: "payout" | "bank_transfer";
  amount: number;
  fund_account_id?: string;
  notes?: Record<string, string>;
  payer_name?: string;
  payer_account?: string;
  payer_ifsc?: string;
  mode?: string;
  bank_reference?: string;
}
export interface Transaction extends GenericFields {
  entity: "transaction";
  account_number: string;
  amount: number;
  currency: "INR";
  credit?: number;
  debit?: number;
  balance: number;
  source: TransactionSource;
  fees?: number;
  tax?: number;
  status?:
    | "pending"
    | "queued"
    | "processing"
    | "processed"
    | "reversed"
    | "cancelled"
    | "rejected";
  utr: string;
  mode: Payout["mode"];
}
class RPXTransactions {
  client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }
  /**
   * Fetches all transaction for account
   * @link https://razorpay.com/docs/api/x/transactions
   */
  async getAll(
    accountNumber: Transaction["account_number"],
    filter: Pageable = {}
  ): Promise<Response<Transaction>> {
    return this.client.load<Response<Transaction>>(`/transactions`, "GET", {
      account_number: accountNumber,
      ...filter,
    });
  }
  /**
   * Fetches details of a transaction for account
   * @link https://razorpay.com/docs/api/x/transactions#fetch-transaction-by-id
   */
  async get(transactionId: Transaction["id"]): Promise<Transaction> {
    return this.client.load<Transaction>(`/transactions/${transactionId}`);
  }
}

export default RPXTransactions;
