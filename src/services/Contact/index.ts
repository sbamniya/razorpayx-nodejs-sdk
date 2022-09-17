import { GenericFields, Pageable, Response } from "../../types/generic";
import RestClient from "../../utils/RestClient";

export interface Contact extends Omit<GenericFields, "entity"> {
  entity: "contact";
  name: string;
  email?: string;
  contact?: string;
  type?: "vendor" | "customer" | "employee" | "self";
  reference_id?: string;
  notes?: Record<string, string>;
}
class RPXContact {
  client: RestClient;
  constructor(client: RestClient) {
    this.client = client;
  }
  /**
   * Creates a contact for the account
   * @link https://razorpay.com/docs/api/x/contacts#create-a-contact
   */
  async create(
    contactInfo: Omit<
      Contact,
      "id" | "entity" | "batch_id" | "created_at" | "active"
    >
  ): Promise<Contact> {
    return this.client.load<Contact>("/contacts", "POST", contactInfo);
  }

  /**
   * updates a contact for the account
   * @link https://razorpay.com/docs/api/x/contacts#update-a-contact
   */
  async update(
    contactId: Contact["id"],
    contactInfo: Omit<
      Contact,
      "id" | "entity" | "batch_id" | "created_at" | "active"
    >
  ): Promise<void> {
    return this.client.load<void>(
      `/contacts/${contactId}`,
      "PATCH",
      contactInfo
    );
  }

  /**
   * Fetches all contacts the account
   * @link https://razorpay.com/docs/api/x/contacts#fetch-all-contacts
   */
  async getAll(
    filters: Pageable &
      Partial<
        Pick<
          Contact,
          "name" | "email" | "contact" | "reference_id" | "active" | "type"
        >
      > = {}
  ): Promise<Response<Contact>> {
    return this.client.load<Response<Contact>>("/contacts", "GET", filters);
  }

  /**
   * Fetches details of a contact
   * @link https://razorpay.com/docs/api/x/contacts#fetch-a-contact-by-id
   */
  async get(contactId: Contact["id"]): Promise<Contact> {
    return this.client.load<Contact>(`/contacts/${contactId}`);
  }

  /**
   * Activates a contact
   * @link https://razorpay.com/docs/api/x/contacts#activate-or-deactivate-a-contact
   */
  async activate(contactId: Contact["id"]): Promise<void> {
    return this.client.load<void>(`/contacts/${contactId}`, "PATCH", {
      active: true,
    });
  }

  /**
   * Deactivates a contact
   * @link https://razorpay.com/docs/api/x/contacts#activate-or-deactivate-a-contact
   */
  async deactivate(contactId: Contact["id"]): Promise<void> {
    return this.client.load<void>(`/contacts/${contactId}`, "PATCH", {
      active: false,
    });
  }
}

export default RPXContact;
