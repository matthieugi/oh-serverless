const df = require("durable-functions");

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

    context.df.setState(collectedFiles);
    context.df.return(collectedFiles);
});