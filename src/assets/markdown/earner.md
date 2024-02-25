# Guide to Being an Eaerner on Peer Shop

## 1 Introduction

The main focus of this guide is to cover the dispute process from the earner's perspective, you should read the [General Guide](https://peershop.app/guides/general) for an overview of how the platform works. The focus here will be the dispute process, not the general platform mechanics.

## 2 General Tips
Here are some vital facts about being an earner on peershop:
- You should communicate any updates to the order.
- If you lose access to your email/account tell the admin, not the shopper.
- The [ZK tool](https://github.com/tlsnotary/tlsn-extension) requires an updated chrome browser to use, so you must have access to a chrome desktop browser.
- The email verification requires [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) support. Most major email providers, such as Gmail support this.

These are vital facts to understand about being an earner. Now we can cover the detailed process if disputes happen.

## 3 Detailed Dispute Process for Earner
In cases of dispute, both sides will be asked to deposit more funds in the form of a bond and then provide. Here are the steps that the earner must go through in cases of dispute.

### Step 1: Double-or-Nothing
The cost to handle disputes does require time. To decrease the abuse of this system both sides are required to deposit 10 USD (in addition to the original bond). In the case that one side is found to be wrong via the dispute process, the correct side will receive back their bond and an additional 5 dollars from the double or nothing payment from the wrong side. The goal of the double-or-nothing mechanism is to prevent the abuse of the dispute process.

### Step 2: Notarize Proof of Purchase
The main tool we will use to create proofs of the purchase from Amazon is [tls-notary](https://github.com/tlsnotary/tlsn-extension). 
#### Get TLS-Notary Chrome Browser Extension
1. You should go to the link on a desktop or laptop (no mobile or tablet support yet) and install this [version](https://github.com/tlsnotary/tlsn-extension/releases/tag/0.1.0.4) of the extension. You should download the [tlsn-extension-0.1.0.4.zip](https://github.com/tlsnotary/tlsn-extension/releases/download/0.1.0.4/tlsn-extension-0.1.0.4.zip) file. 
2. Once you have this downloaded and unzipped enter chrome://extensions/ in your chrome browser. If this does not work for you, click the puzzle symbol to the right of the search bar and select "Manage Extension" from the drop down menu. 
3. Once you are on this page, you should go to the top right and toggle "Developer Mode"
4. Now you can go to the top left of this page and click "Load Unpacked" then select the unzipped folder. It should be named something like: tls-extension-0.1.0.4. Once you select this, the extension will be ready to go.

#### Use TLS-Notary Chrome Browser Extension

1. 