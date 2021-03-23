/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {

    //Get Blob name and Batch Id
    const blobName = context.bindingData.input;
    const batchId =  blobName.split(/(\w+)-(\w+).(?:\w+)$/g)[1];
    const batchOrderType = blobName.split(/(\w+)-(\w+).(?:\w+)$/g)[2];

    //Set Durable Functions prerequisites
    //const client = df.getClient(context);
    const entityId = new df.EntityId("ProcessDistributorFilesAndCombine", batchId);

    //Signal Enitty 
    const batchFiles = yield context.df.callEntity(entityId, "addFile", { blobName: blobName, batchOrderType: batchOrderType});
    //const entityState = await client.readEntityState(entityId);

    context.log(batchFiles);

    

    // if(collectedFiles.completed) {
    //     context.log('All files Collected');
    //     // const mergedData = await axios.post('https://serverlessohmanagementapi.trafficmanager.net/api/order/combineOrderContent', 
    //     //     collectedFiles,
    //     //     {
    //     //         Headers: 'Content-Type: application/json'
    //     //     }
    //     // );
        
        // }
});