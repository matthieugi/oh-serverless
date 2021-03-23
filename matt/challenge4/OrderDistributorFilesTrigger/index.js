const df = require("durable-functions");
const axios = require('axios');

module.exports = async function (context, myBlob) {

    context.log(myBlob.name);
    const instanceId = await client.startNew('OrderDistributorFilesOrchestrator', undefined, myBlob.name);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

};