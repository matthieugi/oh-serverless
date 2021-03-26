const CosmosClient = require("@azure/cosmos").CosmosClient;
const { ServiceBusClient } = require("@azure/service-bus");
const dateFormat = require('dateformat');

const config = {
    endpoint: process.env.cosmos_endpoint,
    key: process.env.cosmos_accountkey,
    databaseId: "BFYOC",
    containerId: "POSsales",
    partitionKey: { kind: "Hash", paths: ["/locationPostcode"] }
};
const client = new CosmosClient(config);
const container = client.database(config.databaseId).container(config.containerId);


const serviceBusClient = new ServiceBusClient(process.env.servicebus_connectionString_send);
const sender = serviceBusClient.createSender(process.env.servicebus_topic);

module.exports = async function (context, eventHubMessages) {  
    try {
        //save messages to database
        await Promise.all(eventHubMessages.map((item) => container.items.create(item)));
        
        //filter array on items with receiptUrl
        //map to ServiceBusObject
        const serviceBusMessagesWithReceipt = eventHubMessages.filter(message => message.header.receiptUrl !== null)
                                    .map((message) => (
                                    { body: {
                                        totalItems: message.details.length,
                                        totalCost: parseFloat(message.header.totalCost),
                                        salesNumber: message.header.salesNumber,
                                        salesDate: dateFormat(message.header.dateTime, "mm/dd/yyyy HH:MM:ss"),
                                        storeLocation: message.header.locationId,
                                        receiptUrl: message.header.receiptUrl
                                    },
                                    applicationProperties: {
                                        totalCost: parseFloat(message.header.totalCost)
                                    }}));

        if(serviceBusMessagesWithReceipt.length > 0){
            await sender.sendMessages(serviceBusMessagesWithReceipt[0]);
        }
    }
    catch (Error) {
        context.log('Error while processing event : ' + Error);
    }
};