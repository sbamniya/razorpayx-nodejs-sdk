# RazorpayX NodeJS SDK

Note: This is not an official sdk.

Official documentation: https://razorpay.com/docs/razorpayx/api/

Repository documenation: https://razorpayx-docs.netlify.app/

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=bugs)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=coverage)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=sonu-os)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=sonu-os&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=sonu-os)

## Installation
```sh
npm install razorpayx-nodejs-sdk
```

<p>or</p>

```sh
yarn add razorpayx-nodejs-sdk
```
## Usage

```JavaScript
const { Contact } = require("razorpayx-nodejs-sdk")("key", "secret");

// create new contact
Contact.create({
  name: "Demo User",
  email: "demo@example.com",
  contact: "12131213113"
})

```

## Services

<ol>
<li><a href="#contact">Contact</a></li>
<li><a href="#fundaccount">FundAccount</a></li>
<li><a href="#payout">Payout</a></li>
<li><a href="#payoutlink">PayoutLink</a></li>
<li><a href="#transactions">Transactions</a></li>
</ol>

### Contact

A Contact is an entity to whom payouts can be made through supported modes such as UPI, IMPS, NEFT and RTGS.

#### Available Methods

`create` - Create a contact.
Example:

```JavaScript
Contact.create(contactInfo)
```

`update` - updates a contact
Example:

```JavaScript
Contact.update("contact_id", contactInfo)
```

You can find `contactInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/contacts/#request-parameters).

`getAll` - Get all contacts
Example:

```JavaScript
Contact.getAll(filterOptions)
```

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/contacts/#query-parameters)

`get` - Get contact by contact id

Example:

```JavaScript
Contact.get("contact_id")
```

`activate` - Activate contact by contact id

```JavaScript
Contact.activate("contact_id")
```

`deactivate` - Deactivate contact by contact id

```JavaScript
Contact.deactivate("contact_id")
```

### FundAccount

Fund accounts are accounts associated with a contact. Payouts are made to fund accounts.

#### Available Methods

`create` - Create a fund account.
Example:

```JavaScript
FundAccount.create(accountInfo)
```

You can find `accountInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/fund-accounts/#request-parameters)

`getAll` - Fetches all the fund accounts

```JavaScript
FundAccount.getAll(filterOptions)
```

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/fund-accounts/#query-parameters)

`get` - Get fund account by account id

Example:

```JavaScript
FundAccount.get("account_id")
```


`validate` - Validate the account

```JavaScript
FundAccount.validate(account)
```
You can find `account` possibles values for validating bank [here](https://razorpay.com/docs/api/x/account-validation#request-parameters-3) and for validating VPA [here](https://razorpay.com/docs/api/x/account-validation#request-parameters-7)

`activate` - Activate fund account by account id

```JavaScript
FundAccount.activate("account_id")
```

`deactivate` - Deactivate fund account by account id

```JavaScript
FundAccount.deactivate("account_id")
```

### Payout

A payout is the transfer of funds from your business account to a contact's fund account.

#### Available Methods

`create` - Create a payout.
Example:

```JavaScript
Payout.create(payoutInfo)
```

You can find `payoutInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/payouts/#request-parameters)

`getAll` - Fetches all the payouts

```JavaScript
Payout.getAll(account_number, filterOptions)
```

`account_number`: The account from which you want to make the payout.
Account details can be found on the RazorpayX Dashboard. For example, `7878780080316316`.

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/payouts/#query-parameter)

`get` - Fetches details of a payout by payout id

Example:

```JavaScript
Payout.get("payout_id")
```

`cancel` - Cancels a `queued` payout.

<p>
<em>Note: You can only cancel payouts that are in the queued state. It is not possible to cancel payouts that have any other status.</em>
</p>

```JavaScript
Payout.cancel("payout_id")
```

### PayoutLink

Payout Links enable you to make payouts to those contacts whose fund accounts details are not readily available with you. You can use these links to collect the customer's fund account details and then process refunds, reimbursement and cashbacks to them without additional follow up.

#### Available Methods

`create` - Create a payout link.
Example:

```JavaScript
PayoutLink.create(payoutLinkInfo)
```

You can find `payoutLinkInfo` possibles values [here](https://razorpay.com/docs/razorpayx/api/payout-links/#request-parameters)

`getAll` - Fetches all the payout links

```JavaScript
PayoutLink.getAll(filterOptions)
```

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/payout-links/#query-parameters)

`get` - Fetches details of a payout link by payout link id

Example:

```JavaScript
PayoutLink.get("payout_link_id")
```

`cancel` - Cancels a `issued` payout link.

<p>
<em>Note: You can only cancel payout links in the issued state.</em>
</p>

```JavaScript
PayoutLink.cancel("payout_link_id")
```

### Transactions

The inflow of funds to your business account, payouts to a contact's fund account and reversals are all recorded as transactions against your business account. You can fetch details of a particular transaction or details of all transactions via the below APIs.

#### Available Methods

`getAll` - Fetches all the transactions

```JavaScript
Transactions.getAll(accountNumber, filterOptions)
```

`account_number`: The account from which you want to get the transaction details.
Account details can be found on the RazorpayX Dashboard. For example, `7878780080316316`.

You can find `filterOptions` possibles values [here](https://razorpay.com/docs/razorpayx/api/transactions/#query-parameters)

`get` - Fetches details of a transaction by transaction id

Example:

```JavaScript
Transactions.get("transaction_id")
```

## Issues

If you find any issue please add it to the issues tab.

Missing any important feature? Create an issue here: [here](https://github.com/sbamniya/razorpayx-nodejs-sdk/issues/new)

PRs are welcome.
