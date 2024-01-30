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
    const userSafeInfo = {
      test: true
    }
    for (const order of info) {
      console.log(order);
      //order.allOrderInformation.orderInfo.metadata
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