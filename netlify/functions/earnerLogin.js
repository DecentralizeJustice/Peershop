const mongoDBPassword = process.env.mongoDBPassword
const mongoServerLocation = process.env.mongoServerLocation
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://main:" + mongoDBPassword + "@"+ mongoServerLocation + "/?retryWrites=true&w=majority"
const Joi = require("joi")
exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }
  try {
    const params = event.body
    const parsed = JSON.parse(params)

    const numberArray = parsed.accountPhrase
    const numberArraySchema = Joi.array().length(8).items(Joi.number().max(2050).min(0))
    await numberArraySchema.validateAsync(numberArray)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    const collection = client.db("orders").collection("genOrders")
    const info = await collection.findOne({'metaData.earnerPassphrase': { $eq: numberArray.toString() }})
    
    if(info === null){ 
      return {
        statusCode: 200,
        body: JSON.stringify({ error: 'account does not exist' })
      }
    }
    const infoForEarner = {
      // genOrderInfo: info.orderDetails.allOrderInformation.orderInfo.metadata.info,
      earnerChat: info.chats.earnerChat,
      everyoneChat: info.chats.everyoneChat,
    }

  return {
    statusCode: 200,
    body: JSON.stringify(infoForEarner)
  }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: ''
    }
  }
}