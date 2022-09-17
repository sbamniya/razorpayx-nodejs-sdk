import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";
import { Payout } from "../Payout";

interface TreansactionSource {}
interface Transaction extends GenericFields {
  entity: "transaction";
  account_number: string;
  amount: number;
  currency: "INR";
  credit?: number;
  debit?: number;
  balance: number;
  source: TreansactionSource;
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
  async getAll(accountNumber: Transaction['account_number'], filter: Pageable = {}): Promise<Response<Transaction>> {
    return this.client.load<Response<Transaction>>(`/transactions`, "GET", {
      account_number: accountNumber,
      ...filter,
    });
  }
  /**
   * Fetches details of a transaction for account
   * @link https://razorpay.com/docs/api/x/transactions#fetch-transaction-by-id
   */
  async get(transactionId: Transaction['id']): Promise<Transaction> {
    return this.client.load<Transaction>(
      `/transactions/${transactionId}`
    );
  }
}

export default RPXTransactions;
