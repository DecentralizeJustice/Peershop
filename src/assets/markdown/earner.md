# Guide to Being an Eaerner on Peer Shop

## 1 Introduction

The main focus of this guide is to cover the dispute process from the earner's perspective, you should read the [General Guide](https://peershop.app/guides/general) for an overview of how the platform works. The focus here will be the dispute process, not the general platform mechanics. This process will very rarely be required, but it is wise as an earner to be familiar with this process.

## 2 General Tips
Here are some vital facts about being an earner on peershop:
- You should communicate any updates to the order.
- If you lose access to your email/account tell the admin, not the shopper.
- The [ZK tool](https://github.com/tlsnotary/tlsn-extension) requires an updated chrome browser to use, so you must have access to a chrome desktop browser.
- The email verification requires [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) support. Most major email providers, such as Gmail support this.

These are vital facts to understand about being an earner. Now we can cover the detailed process if disputes happen.

## 3 Detailed Dispute Process for the Earner
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

1.  After you have installed the plugin, you should be able to find it right of the search bar. You should click on the extension and configure the options. When you processing a dispute, I will give you a custom proxy/notary ip to enter. 
2. You should log into your Amazon account and navigate to this url: https://www.amazon.com/hz/contact-us/foresight/hubgateway. When you are here, you should find the item that you ordered. If your order had multiple items, you must produce a separate proof for every item. When you find the item, your screen should look similar to this: ![Amazon Img](https://res.cloudinary.com/dylevfpbl/image/upload/v1708964208/peershopguide/earnerItem.png "Amazon Img")
3. Now you can pull up the tls-notary tool and select request. Here you can copy and paste the order number. You should find the request that starts with this url: https://www.amazon.com/hz/contact-us/foresight/ajax/item-widget-details/hubgateway
In the photo below the correct proof is the first item: 
![Amazon Img](https://res.cloudinary.com/dylevfpbl/image/upload/v1708964597/peershopguide/tls-notary-earner.png "Amazon Img"). The request payload should include the addressID, orderId, itemID, tracking number, shipmentId,packageId, paymentId. 
4. You should now simply finish the notarization process for this proof. During the dispute process, The admin will give you more details on how to share these proofs once you have them.

### Step 3: Extra Data
1. You also may have to share the gift receipt for the order. This info can be found on the order details page of the order. You should find a button that says, "Share Gift Receipt". 
2. You may also be required to send signed email messages, [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail), from Amazon. The process for getting these varies based on your email provider. If you are using Gmail, you can go to "More" option found in the top right and select "Show Original" to find the full signed email. ![Amazon Img](https://res.cloudinary.com/dylevfpbl/image/upload/v1708966435/peershopguide/email.png "Amazon Img")

### Step 4: Admin Proccess Info

The admin in charge of your order will request similar proof from the shopper. After the proof has been submitted from both sides the admin should be able to determine what happened and the appropriate place to send the bond and fees. If you have any questions or concerns about this process please do not hesitate to reach out to your order admin.