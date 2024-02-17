const BTCpayKey = process.env.BTCpayKey
const BTCpayStore = process.env.BTCpayStore
const axios = require("axios")
const Joi = require("joi")
const fs = require('fs')
const path = require("path")
let infoList = path.resolve("./src/assets/globalInfo.json")
infoList = JSON.parse(fs.readFileSync(infoList, 'utf8'))
exports.handler = async (event, context) => {
  try {

    const params = event.body
    const parsed = JSON.parse(params)

    const cleanedInfo = {}
    console.log(parsed)

    const passphraseArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0)).required()
    await passphraseArraySchema.validateAsync(parsed.passphraseArray)
    cleanedInfo.passphraseArray = parsed.passphraseArray


    const xmrRefundAddress = Joi.string().required().max(600).min(0)
    await xmrRefundAddress.validateAsync(parsed.refundAddress)
    cleanedInfo.refundAddress = parsed.refundAddress

    const orderId = Joi.string().required().max(100).min(10)
    await orderId.validateAsync(parsed.orderId)
    cleanedInfo.orderId = parsed.orderId


    const paymentDue = Number(infoList.earnerBond)

    const storeAddress = 'https://btcpay.anonshop.app/api/v1/stores/' + BTCpayStore + '/invoices'
    const response = await axios.post(
          storeAddress,
          {
              'amount': paymentDue,
              'speedPolicy': 'MediumSpeed',
              'checkout': {
                  'paymentMethods': [
                      'XMR'
                  ],
                  'redirectURL': 'https://peer.anonshop.app/login',
                  'redirectAutomatically': true
              },
              'metadata': { 
                info: cleanedInfo,
                timestamp: Date.now(),
                constants: infoList,
                type: "pickUpOrder"
               }
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': BTCpayKey
              }
          }
      ) 
  return {
    statusCode: 200,
    body: JSON.stringify(response.data)
  } 
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error
    }
  }
}