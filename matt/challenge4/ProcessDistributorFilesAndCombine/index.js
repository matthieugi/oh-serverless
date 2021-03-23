const df = require("durable-functions");
const joi = require('joi');

distributorFilesSchema = joi.object({
    orderHeaderDetailsCSVUrl: joi.string().uri().required(),
    orderLineItemsCSVUrl: joi.string().uri().required(),
    productInformationCSVUrl: joi.string().uri().required()
})

module.exports = df.entity(function(context) {
    let collectedFiles = context.df.getState(() => { completed: false });
    const { blobName, batchOrderType } = context.df.getInput();

    //Ajout des différents fichiers dans l'entité
    switch (batchOrderType) {
        case 'OrderHeaderDetails':
            collectedFiles = {
                ...collectedFiles,
                orderHeaderDetailsCSVUrl: blobName
            }
            break;
        case 'OrderLineItems':
            collectedFiles = {
                ...collectedFiles,
                orderLineItemsCSVUrl: blobName
            }
            break;
        case 'ProductInformation':
            collectedFiles = {
                productInformationCSVUrl: blobName
            }
    }

    context.log('Collected Files : ');
    context.log(collectedFiles);

    //Si le schema est valide, alors l'ensemble des fichiers ont été recus
    const { error } = distributorFilesSchema.validate(collectedFiles);

    if(error === undefined) {
        collectedFiles = { ...collectedFiles, completed: true };
    }

    context.df.setState(collectedFiles);
    context.df.return(collectedFiles);
});