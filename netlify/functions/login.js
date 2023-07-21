const mongoDBPassword = process.env.mongoDBPassword
const mongoServerLocation = process.env.mongoServerLocation
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://main:" + mongoDBPassword + "@"+ mongoServerLocation + "/?retryWrites=true&w=majority"
exports.handler = async (event) => {
  try {
    const params = event.body
    const parsed = JSON.parse(params)
    const passphrase = parsed.passphrase.toString()
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    const collection = client.db("orders").collection("lockerOrders")
    const info = await collection.findOne({
      shopperPassphrase: passphrase
    })
    // console.log(info)
    // console.log(info.allOrderInformation)
    const userSafeInfo = {
      type: 'shopper',
      orderId: info.orderId,
      status: info.status,
      chat: info.shopperChat,
      orderInfo: info.allOrderInformation.orderInfo.metadata,
      paymentInfo: info.allOrderInformation.paymentInfo

    }
    return {
        statusCode: 200,
        body: JSON.stringify(userSafeInfo)
      } 
  } 
  catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: ''
    }
  }
}