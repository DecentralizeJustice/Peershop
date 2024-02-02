const mongoDBPassword = process.env.mongoDBPassword
const mongoServerLocation = process.env.mongoServerLocation
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://main:" + mongoDBPassword + "@"+ mongoServerLocation + "/?retryWrites=true&w=majority"
exports.handler = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    const collection = client.db("orders").collection("genOrders")
    const info = await collection.find({
       $and: [
       {'metaData.status.0': { $eq: "pending earner pickup" }},
       {'metaData.type': { $eq: "giftregistry" }}
       ]
    }).toArray()
    const orders = []
    for (const order of info) {
      let tempOrder = {}
      const constants = order.orderDetails.allOrderInformation.orderInfo.metadata.constants
      const discountPercentage = order.orderDetails.allOrderInformation.orderInfo.metadata.info.discount
      const listTotal = order.orderDetails.allOrderInformation.orderInfo.metadata.info.listTotal
      const serviceFeePercentage = constants.budgetOrderServiceFeePercent

      const totalPercentage = -Number(discountPercentage)-Number(serviceFeePercentage)
      const usdOffset = Number(listTotal)*(totalPercentage*.01)

      tempOrder.type = "giftregistry"
      tempOrder.usd = (Number(usdOffset)+Number(listTotal)).toFixed(2)
      tempOrder.rate = Number(order.orderDetails.allOrderInformation.paymentInfo[0].rate).toFixed(2)

      if(tempOrder.rate.toString().length >5 || tempOrder.usd.toString().length> 8 ){
        }else{
          orders.push(tempOrder)
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(orders)
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