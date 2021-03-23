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
    const entityId = new df.EntityId("ProcessDistributorFilesEntity", batchId);

    //Signal Enitty 
    const batchFiles = yield context.df.callEntity(entityId, "addFile", { blobName: blobName, batchOrderType: batchOrderType});

    context.log(batchFiles);

    if(batchFiles.completed) {
        context.log('All files Collected');
        context.bindingData.orders = yield context.df.callActivity('CombineOrders', batchFiles);

        context.log(context.bindingData.orders);
    }
});