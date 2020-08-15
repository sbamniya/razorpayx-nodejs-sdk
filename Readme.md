# RazorpayX NodeJS SDK

Note: This is not a official sdk.

Read documentation here: https://razorpay.com/docs/razorpayx/api/

## Prequisite

This project uses env variables to read the RazorPayX Key and secret, so you need to have a package like [dotenv](https://www.npmjs.com/package/dotenv) or [dotenv-flow](https://www.npmjs.com/package/dotenv-flow) to make the `.env` file readable. Also, it is developed using `ECMASCript2015`, so it won't work with older versions of NodeJS.

## Installation

> npm install razorpayx-nodejs-sdk

<p>or</p>

> yarn add razorpayx-nodejs-sdk

## Usage

<p>Create new file if not exists. And add follwing two lines in the file.</p>

```
RAZORPAYX_API_KEY=your_razorpayx_api_key
RAZORPAYX_API_PRIVATE_SECRET=your_razorpayx_api_screet
```

and then

```
const { RazorPayContact } = require("razorpayx-nodejs-sdk");

// create new contact
RazorPayContact.create({
  name: "Demo User",
  email: "demo@example.com",
  contact: "12131213113"
})

```

## Services

<ol>
<li><a href="#razorpaycontact">RazorPayContact</a></li>
<li><a href="#razorpayfundaccount">RazorPayFundAccount</a></li>
<li><a href="#razorpaypayout">RazorPayPayout</a></li>
<li><a href="#razorpaypayoutlink">RazorPayPayoutLink</a></li>
<li><a href="#razorpaytransactions">RazorPayTransactions</a></li>
</ol>

### RazorPayContact

A contact is an entity to whom payouts can be made through supported modes such as UPI, IMPS, NEFT and RTGS.

#### Available Methods

`create` - Create a contact.
Example:

```
RazorPayContact.create(contactInfo)
```

`update` - updates a contact
Example:

```
RazorPayContact.update("contact_id", contactInfo)
```

You can find `contactInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/contacts/#request-parameters).

`getAll` - Get all contacts
Example:

```
RazorPayContact.getAll(filterOptions)
```

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/contacts/#query-parameters)

`get` - Get contact by contact id

Example:

```
RazorPayContact.get("contact_id")
```

`activate` - Activate contact by contact id

```
RazorPayContact.activate("contact_id")
```

`deactivate` - Deactivate contact by contact id

```
RazorPayContact.deactivate("contact_id")
```

### RazorPayFundAccount

Fund accounts are accounts associated with a contact. Payouts are made to fund accounts.

#### Available Methods

`create` - Create a fund account.
Example:

```
RazorPayFundAccount.create(accountInfo)
```

You can find `accountInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/fund-accounts/#request-parameters)

`createPublic` - Creates a public fund account for a contact, this is specifically used for Card payout. Read more [here](https://razorpay.com/docs/razorpayx/api/payouts-cards/)

```
RazorPayFundAccount.createPublic(accountInfo)
```

You can find `accountInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/fund-accounts/#request-parameters)

`getAll` - Fetches all the fund accounts

```
RazorPayFundAccount.getAll(filterOptions)
```

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/fund-accounts/#query-parameters)

`get` - Get fund account by account id

Example:

```
RazorPayFundAccount.get("account_id")
```

`activate` - Activate fund account by account id

```
RazorPayFundAccount.activate("account_id")
```

`deactivate` - Deactivate fund account by account id

```
RazorPayFundAccount.deactivate("account_id")
```

### RazorPayPayout

A payout is the transfer of funds from your business account to a contact's fund account.

#### Available Methods

`create` - Create a payout.
Example:

```
RazorPayPayout.create(payoutInfo)
```

You can find `payoutInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/payouts/#request-parameters)

`getAll` - Fetches all the payouts

```
RazorPayPayout.getAll(account_number, filterOptions)
```

`account_number`: The account from which you want to make the payout.
Account details can be found on the RazorpayX Dashboard. For example, `7878780080316316`.

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/payouts/#query-parameter)

`get` - Fetches details of a payout by payout id

Example:

```
RazorPayPayout.get("payout_id")
```

`cancel` - Cancels a `queued` payout.

<p>
<em>Note: You can only cancel payouts that are in the queued state. It is not possible to cancel payouts that have any other status.</em>
</p>

```
RazorPayPayout.cancel("payout_id")
```

### RazorPayPayoutLink

Payout Links enable you to make payouts to those contacts whose fund accounts details are not readily available with you. You can use these links to collect the customer's fund account details and then process refunds, reimbursement and cashbacks to them without additional follow up.

#### Available Methods

`create` - Create a payout link.
Example:

```
RazorPayPayoutLink.create(payoutLinkInfo)
```

You can find `payoutLinkInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/payout-links/#request-parameters)

`getAll` - Fetches all the payout links

```
RazorPayPayoutLink.getAll(filterOptions)
```

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/payout-links/#query-parameters)

`get` - Fetches details of a payout link by payout link id

Example:

```
RazorPayPayoutLink.get("payout_link_id")
```

`cancel` - Cancels a `issued` payout link.

<p>
<em>Note: You can only cancel payout links in the issued state.</em>
</p>

```
RazorPayPayoutLink.cancel("payout_link_id")
```

### RazorPayTransactions

The inflow of funds to your business account, payouts to a contact's fund account and reversals are all recorded as transactions against your business account. You can fetch details of a particular transaction or details of all transactions via the below APIs.

#### Available Methods

`getAll` - Fetches all the transactions

```
RazorPayTransactions.getAll(accountNumber, filterOptions)
```

`account_number`: The account from which you want to get the transaction details.
Account details can be found on the RazorpayX Dashboard. For example, `7878780080316316`.

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/transactions/#query-parameters)

`get` - Fetches details of a transaction by transaction id

Example:

```
RazorPayTransactions.get("transaction_id")
```

## Issues

If you find any issue please add it to the issues tab.

> Missing any important feature?

> PRs are welcome.
