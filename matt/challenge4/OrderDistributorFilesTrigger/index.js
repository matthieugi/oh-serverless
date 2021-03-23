const df = require("durable-functions");
const axios = require('axios');

module.exports = async function (context, req) {

    const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);

    //return { body: collectedFiles };

};