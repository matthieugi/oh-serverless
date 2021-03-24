const df = require("durable-functions");
const axios = require('axios');

module.exports = async function (context, myBlob) {
    const client = df.getClient(context);
    const instanceId = await client.startNew('OrderDistributorFilesOrchestrator', undefined, 'https://ohserverlessbatchprocess.blob.core.windows.net/orders/' + context.bindingData.name);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

};