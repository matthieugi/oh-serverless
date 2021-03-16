const joi = require('joi');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const payloadSchema = joi.object({
    userId: joi.string().guid().required(),
    productId: joi.string().guid().required(),
    locationName: joi.string().required(),
    rating: joi.number().integer().min(0).max(5),
    userNotes: joi.string().required()
})

module.exports = async function (context, req) {

    //Input Data Schema Validation
    let { value:rating, error } = payloadSchema.validate(req.body);

    if(error !== undefined) {
        return {
            status: 500,
            body: error
        }
    }

    //API Validation
    try{
        await axios.get('https://serverlessohuser.trafficmanager.net/api/GetUser?userId=' + rating.userId);
        await axios.get('https://serverlessohproduct.trafficmanager.net/api/GetProduct?productId=' + rating.productId);    
    }
    catch(error) {
        return {
            status: 404,
            body: `Unable to validate user or product : ` + error
        }
    }

    // Add GUID & Timestamp
    rating = {
        ...rating,
        id: uuidv4(),
        timestamp: Date.now()
    }

    // Add Payload to CosmosDB backend
    context.bindings.ratings = rating;
    return {
        body: rating
    }
}