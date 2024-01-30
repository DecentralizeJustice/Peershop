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

    const passphraseArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0)).required()
    await passphraseArraySchema.validateAsync(parsed.passphraseArray)
    cleanedInfo.passphraseArray = parsed.passphraseArray
 
    const wishListLinkSchema = Joi.string().required().max(600).allow('')
    await wishListLinkSchema.validateAsync(parsed.wishListInfo.wishListLink)
    cleanedInfo.wishListLink = parsed.wishListInfo.wishListLink

    const listTotalSchema = Joi.number().precision(3).max(100000).min(0).required()
    await listTotalSchema.validateAsync(parsed.wishListInfo.listTotal)
    cleanedInfo.listTotal = parsed.wishListInfo.listTotal

    const listQuantitySchema = Joi.number().integer().required().max(100000).min(0)
    await listQuantitySchema.validateAsync(parsed.wishListInfo.listQuantity)
    cleanedInfo.listQuantity = parsed.wishListInfo.listQuantity

    const shippingCostSchema = Joi.number().precision(3).max(100000).min(0)
    await shippingCostSchema.validateAsync(parsed.wishListInfo.shippingCost)
    cleanedInfo.shippingCost= parsed.wishListInfo.shippingCost

    const tipSchema = Joi.number().precision(3).max(100000).min(0)
    await tipSchema.validateAsync(parsed.wishListInfo.tip)
    cleanedInfo.tip= parsed.wishListInfo.tip

    const xmrRefundAddress = Joi.string().required().max(600).min(0)
    await xmrRefundAddress.validateAsync(parsed.wishListInfo.xmrRefundAddress)
    cleanedInfo.xmrRefundAddress = parsed.wishListInfo.xmrRefundAddress

    const orderNotesSchema = Joi.string().max(600).allow('')
    await orderNotesSchema.validateAsync(parsed.wishListInfo.orderNotes)
    cleanedInfo.orderNotes = parsed.wishListInfo.orderNotes

    const flat = infoList.minServiceFeeUSD
    let serviceFeeUSD = flat
    const percent = Number(infoList.myServiceFeeBasePercent*cleanedInfo.listTotal.value*.01).toFixed(2)
    if (percent > flat) {
      serviceFeeUSD = percent 
    }

    const paymentDue = Number((Number(cleanedInfo.tip)+Number(cleanedInfo.listTotal*infoList.bufferPercentage*.01)+Number(serviceFeeUSD)+Number(cleanedInfo.listTotal)).toFixed(2))

    const storeAddress = 'https://btcpay.anonshop.app/api/v1/stores/' + BTCpayStore + '/invoices'
    const response = await axios.post(
          storeAddress,
          {
              'amount': paymentDue,
              'speedPolicy': 'LowSpeed',
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
                constants: infoList
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
