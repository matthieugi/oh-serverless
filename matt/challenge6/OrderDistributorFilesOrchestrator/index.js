const df = require("durable-functions");
const joi = require('joi');

distributorFilesSchema = joi.object({
    orderHeaderDetailsCSVUrl: joi.string().uri().required(),
    orderLineItemsCSVUrl: joi.string().uri().required(),
    productInformationCSVUrl: joi.string().uri().required()
})

module.exports = df.orchestrator(function* (context) {

    //Get Blob name and Batch Id
    const blobName = context.bindingData.input;
    const batchId =  blobName.split(/(\w+)-(\w+).(?:\w+)$/g)[1];
    const batchOrderType = blobName.split(/(\w+)-(\w+).(?:\w+)$/g)[2];

    //Set Durable Functions prerequisites
    const entityId = new df.EntityId("ProcessDistributorFilesEntity", batchId);

    //Call Entity to add file to entity
    const collectedFiles = yield context.df.callEntity(entityId, "addFile", { blobName: blobName, batchOrderType: batchOrderType});

    context.log(collectedFiles);

    //Si le schema est valide, alors l'ensemble des fichiers ont été recus
    const { error } = distributorFilesSchema.validate(collectedFiles);

    if(error === undefined) {
        //Start Combine Activity to merge files et set data to database
        context.bindings.orders = yield context.df.callActivity('CombineOrdersActivity', collectedFiles);
    }

});