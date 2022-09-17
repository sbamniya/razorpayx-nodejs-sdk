import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";

export interface PayoutLinkContact {
  name: string;
  contact: string;
  email: string;
  type?: "vendor" | "customer" | "employee" | "self";
}

export interface PayoutLink extends GenericFields {
  entity: "payout_link";
  fund_account_id: string;
  payout_id: string;
  contact_id: string;
  contact?: PayoutLinkContact;
  purpose: "refund" | string;
  status:
    | "pending"
    | "issued"
    | "processing"
    | "processed"
    | "cancelled"
    | "rejected";
  amount: number;
  currency: "INR";
  description?: string;
  receipt?: string;
  attempt_count?: number;
  notes?: Record<string, string>;
  short_url?: string;
  send_sms: boolean;
  send_email: boolean;
  cancelled_at: number;
  expire_by?: number;
  expired_at?: number;
}

class RPXPayoutLink {
  client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }
  /**
   * Creates a payout link for the given details
   * @link https://razorpay.com/docs/api/x/payout-links#create-a-payout-link
   */
  async create(
    payoutLinkInfo: {
      account_number: string;
      contact: { id: string } | PayoutLinkContact;
    } & Pick<
      PayoutLink,
      | "amount"
      | "currency"
      | "purpose"
      | "description"
      | "receipt"
      | "send_sms"
      | "send_email"
      | "notes"
      | "expire_by"
    >
  ): Promise<PayoutLink> {
    return this.client.load<PayoutLink>("/payout-links", "POST", payoutLinkInfo);
  }
  /**
   * Fetches all payout links
   * @link https://razorpay.com/docs/api/x/payout-links#fetch-all-payout-links
   */
  async getAll(
    filter: Pageable & {
      contact_phone_number?: PayoutLinkContact["contact"];
      contact_email?: PayoutLinkContact["email"];
    } & Partial<
        Pick<
          PayoutLink,
          | "id"
          | "contact_id"
          | "fund_account_id"
          | "purpose"
          | "status"
          | "receipt"
          | "short_url"
        >
      > = {}
  ): Promise<Response<PayoutLink>> {
    return this.client.load<Response<PayoutLink>>("/payout-links", "GET", filter);
  }

  /**
   * Fetch details of a payout link
   * @link https://razorpay.com/docs/api/x/payout-links#fetch-payout-link-by
   */
  async get(payoutLinkId: PayoutLink["id"]): Promise<PayoutLink> {
    return this.client.load<PayoutLink>(`/payout-links/${payoutLinkId}`);
  }
  /**
   * Cancels the payout link for given payoutLinkId
   * @link https://razorpay.com/docs/api/x/payout-links#cancel-a-payout-link
   */
  async cancel(payoutLinkId: PayoutLink["id"]): Promise<void> {
    return this.client.load<void>(
      `/payout-links//${payoutLinkId}/cancel`,
      "POST"
    );
  }
}

export default RPXPayoutLink;
