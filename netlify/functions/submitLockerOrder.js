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

    const passphraseArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0))
    await passphraseArraySchema.validateAsync(parsed.passphraseArray)
    cleanedInfo.passphraseArray = parsed.passphraseArray

    const orderNotesSchema = Joi.string().required().max(600)
    await orderNotesSchema.validateAsync(parsed.orderNotes)
    cleanedInfo.orderNotes = parsed.orderNotes

    const moneroAddressSchema = Joi.string().required().max(600)
    await moneroAddressSchema.validateAsync(parsed.moneroAddress)
    cleanedInfo.moneroAddress = parsed.moneroAddress

    const earnerIncintiveSchema = Joi.number().integer().required().max(100).min(-100)
    await earnerIncintiveSchema.validateAsync(parsed.earnerIncintive)
    cleanedInfo.earnerIncintive = parsed.earnerIncintive

    const lockerInfoschema = Joi.object({
      lockerName: Joi.string().required().max(500),
      type: Joi.string().required().valid('Amazon Locker','Amazon Hub Counter+'),
      lockerZipcode: Joi.number().integer().required().max(99999999).min(999)
    })
    await lockerInfoschema.validateAsync(parsed.lockerInfo)
    cleanedInfo.lockerInfo = parsed.lockerInfo

    const itemschema = Joi.object({
      itemLink: Joi.string().required().max(600),
      price: Joi.number().required().max(99999).min(.01),
      quantity: Joi.number().integer().required().max(999).min(1),
      notes: Joi.string().max(600).allow('')
    })
    for (const item of parsed.cart) {
      await itemschema.validateAsync(item)
    }
    cleanedInfo.cart = parsed.cart

    let itemSubtotal = 0

    for (const item of cleanedInfo.cart) {
      itemSubtotal += Number(Number(item.quantity)*Number(item.price))
    }

    const orderTax = Number(itemSubtotal)*Number(infoList.estimatedTax)*Number(1/100)
    const subtotal = Number(orderTax) + Number(itemSubtotal)

    const discountAmount = Number(subtotal* (Number(cleanedInfo.earnerIncintive) * Number(1/100)))

    const costAfterIncentive = subtotal + discountAmount
    const paymentDue = Number((Number(costAfterIncentive)+Number(infoList.myServiceFeeBase)+ Number(infoList.shopperBond)).toFixed(2))
    
    console.log(paymentDue)
/*     if (parsed.purchase !== '12month' && parsed.purchase !== '1week' && parsed.purchase !== '3month') {
      return {
        statusCode: 500,
        body: ''
      }
    } */
    /* const numberArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0))
    await numberArraySchema.validateAsync(parsed.numberArray)
    const numberArray = parsed.numberArray.toString()
    const storeAddress = 'https://btcpay.anonshop.app/api/v1/stores/' + BTCpayStore + '/invoices'
    const priceDictionary = {
      '1week': 10,
      '3month': 45,
      '12month': 120
    } */
/*     const response = await axios.post(
          storeAddress,
          {
              'amount': priceDictionary[parsed.purchase],
              'speedPolicy': 'MediumSpeed',
              'checkout': {
                  'paymentMethods': [
                      'XMR'
                  ],
                  'redirectURL': 'https://phantomphone.app/login',
                  'redirectAutomatically': true
              },
              'metadata': { 
                numberArray: numberArray,
                purchase: parsed.purchase,
                timestamp: Date.now()
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
    } */
    return {
      statusCode: 200,
      body: ''
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: ''
    }
  }
 
}
async function process1month(parsed) {

  const numberArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0))
  await numberArraySchema.validateAsync(parsed.numberArray)
  const numberArray = parsed.numberArray.toString()

  const storeAddress = 'https://btcpay.anonshop.app/api/v1/stores/' + BTCpayStore + '/invoices'
  const response = await axios.post(
          storeAddress,
          {
              'amount': '15',
              'speedPolicy': 'MediumSpeed',
              'checkout': {
                  'paymentMethods': [
                      'XMR'
                  ],
                  'redirectURL': 'https://phantomphone.app/login',
                  'redirectAutomatically': true
              },
              'metadata': { 
                numberArray: numberArray,
                purchase: {
                  serviceType: '1month',
                },
                timestamp: Date.now()
               }
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': BTCpayKey
              }
          }
  )
  return response
  
}
async function process1Service(parsed) {

  const numberArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0))
  await numberArraySchema.validateAsync(parsed.numberArray)
  const numberArray = parsed.numberArray.toString()

  const serviceSchema = Joi.string().required().min(4).max(40)
  await serviceSchema.validateAsync(parsed.purchaseInfo.service)

  let serviceCorrect = false
  for (let element of Object.keys(serviceList)) {
    if (element === parsed.purchaseInfo.service) {
      serviceCorrect = true
      break
    }
  }
  if (!serviceCorrect) {
    throw new Error('Service is not correct')
  }
  const storeAddress = 'https://btcpay.anonshop.app/api/v1/stores/' + BTCpayStore + '/invoices'
  const response = await axios.post(
          storeAddress,
          {
              'amount': serviceList[parsed.purchaseInfo.service].price,
              'speedPolicy': 'MediumSpeed',
              'checkout': {
                  'paymentMethods': [
                      'XMR'
                  ],
                  'redirectURL': 'https://phantomphone.app/login',
                  'redirectAutomatically': true
              },
              'metadata': { 
                numberArray: numberArray,
                purchase: {
                  serviceType: '1service',
                  service: parsed.purchaseInfo.service,
                  price: serviceList[parsed.purchaseInfo.service].price
                },
                timestamp: Date.now()
               }
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': BTCpayKey
              }
          }
  )
  return response
  
}