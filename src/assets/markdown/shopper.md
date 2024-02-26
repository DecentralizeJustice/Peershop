# Guide to Being a Shopper on Peer Shop

## 1 Introduction

The main focus of this guide is to cover the dispute process from the shoppers's perspective, you should read the [General Guide](https://peershop.app/guides/general) for an overview of how the platform works. The focus here will be the dispute process, not the general platform mechanics. This process will very rarely be required, but it is good as a shopper to be familiar with this process.

## 2 General Tips
Here are some vital facts about being a shopper on peershop:
- Do not edit your gift registry after it is made and you have submitted your order.
- Set your registry at least 3 months in the future.
- If you lose access to your email/account tell the admin, not the shopper.
- The [ZK tool](https://github.com/tlsnotary/tlsn-extension) requires an updated chrome browser to use, so you must have access to a chrome desktop browser.
- The email verification requires [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail) support. Most major email providers, such as Gmail support this.

These are vital facts to understand about being a shopper. Now we can cover the detailed process if disputes happen.

## 3 Detailed Dispute Process for the Shopper
In cases of dispute, both sides will be asked to deposit more funds in the form of a bond and then provide. Here are the steps that the shopper must go through in cases of dispute.

### Step 1: Double-or-Nothing
The cost to handle disputes does require time. To decrease the abuse of this system both sides are required to deposit 10 USD (in addition to the original bond). In the case that one side is found to be wrong via the dispute process, the correct side will receive back their bond and an additional 5 dollars from the double or nothing payment from the wrong side. The goal of the double-or-nothing mechanism is to prevent the abuse of the dispute process.

### Step 2: Notarize Proof of Purchase
The main tool peershop uses to create proofs of the purchase from Amazon is [tls-notary](https://github.com/tlsnotary/tlsn-extension). 

#### Get TLS-Notary Chrome Browser Extension
1. You should go to the link on a desktop or laptop (no mobile or tablet support yet) and install this [version](https://github.com/tlsnotary/tlsn-extension/releases/tag/0.1.0.4) of the extension. You should download the [tlsn-extension-0.1.0.4.zip](https://github.com/tlsnotary/tlsn-extension/releases/download/0.1.0.4/tlsn-extension-0.1.0.4.zip) file. 
2. Once you have this downloaded and unzipped enter chrome://extensions/ in your chrome browser. If this does not work for you, click the puzzle symbol to the right of the search bar and select "Manage Extension" from the drop down menu. 
3. Once you are on this page, you should go to the top right and toggle "Developer Mode"
4. Now you can go to the top left of this page and click "Load Unpacked" then select the unzipped folder. It should be named something like: tls-extension-0.1.0.4. Once you select this, the extension will be ready to go.

#### Use TLS-Notary Chrome Browser Extension

1.  After you have installed the plugin, you should be able to find it right of the search bar. You should click on the extension and configure the options. When you processing a dispute, I will give you a custom proxy/notary ip to enter. 
2. You should log into your Amazon account and navigate to your wishlist. When you are there, you should go to the "Thank You & Returns". It should look similar to this: ![Amazon Img](https://res.cloudinary.com/dylevfpbl/image/upload/v1708969725/peershopguide/thankyou-ezgif.com-censor.png "Amazon Img")
3. Now you can pull up the tls-notary tool and select request. You can search thank-you. The correct request is of type "xmlhttprequest" and the name is "/registries/custom/{giftregistryid}/thank-you". In this example photo the correct proof is the first request.
![Amazon Img](https://res.cloudinary.com/dylevfpbl/image/upload/v1708970267/peershopguide/Screenshot2024-02-26125037-ezgif.com-censor.png "Amazon Img")
The request response JSON should include a list of the items on the wishlist with tracking numbers and other information.

4. You should now simply finish the notarization process for this proof. During the dispute process, the admin will give you more details on how to share these proofs once you have them.

### Step 3: Extra Data

You may also be required to send signed email messages, [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail), from Amazon. The process for getting these varies based on your email provider. If you are using Gmail, you can go to "More" option found in the top right and select "Show Original" to find the full signed email. ![Amazon Img](https://res.cloudinary.com/dylevfpbl/image/upload/v1708966435/peershopguide/email.png "Amazon Img")

### Step 4: Admin Proccess Info

The admin in charge of your order will request similar proof from the earner. After the proof has been submitted from both sides the admin should be able to determine what happened and the appropriate place to send the bond and fees. If you have any questions or concerns about this process please do not hesitate to reach out to your order admin.