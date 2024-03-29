# General Guide to Peer Shop

Peer Shop uses a mixture of [DKIM-signed](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) email messages and [zk-proofs](https://tlsnotary.org/) to create a low-cost low-fraud fiat-crypto gateway. Currently, we only support Amazon orders, but plan to expand into other retailers such as Walmart, Target, Mcdonalds etc. 

## Information Directory

This guide only covers the general protections and processes offered on Peer Shop. These resources offer more details on different parts of the platform:

- [Lite Paper](https://peershop.app/litepaper) - An overview of zk proofs for fraud and regulatory resistant p2p platforms.
- [Shopper Guide](https://peershop.app/guides/shopper) - A detailed overview of shopper expections and requirements on Peer Shop.
- [Eaner Guide](https://peershop.app/guides/earner) - A detailed overview ofearner expections and requirements on Peer Shop.

The rest of this guide will only offer a quick overview of Peer Shop. Reference the above resources for more details.

## Platform Overview
Our platform treats amazon.com web data as a trusted oracle. This means that we treat all data from Amazon as being trustworthy and use it to handle disputes and reduce fraud. In cases of disputes, we require a double or nothing style bond to be paid to reduce the abuse of our dispute process. Then the earner and shopper are required to use tls-notary chrome extension to prove certain data about the order. They might also be required to submit signed emails as more proof.
The detailed process for disputes can be found in the shopper and earner guide.

## General Order Process
1. The shopper creates a gift registry on amazon.com
2. The shopper then creates an order with the registry and selects their discount.
3. The shopper pays for their order plus a bond and their order is added to the orderbook.
4. The earner selects the order and pays the bond fee.
5. The earner orders the items on the wish list and communicates this in the chat. 
6. The shopper should receive their order.
7. Once both sides agree, the bonds are released to the correct party.

Cases of disputes are handled according to the rules stated in the earner and shopper guides.

## Protections Offered to Shoppers on 900+ USD orders

On large orders, the earner is required to provide extra proof that they have used the same card on an order that is at least 2 months old. This will reduce fraud since it requires the shopper to have control of an account/card for at least 2 months.

