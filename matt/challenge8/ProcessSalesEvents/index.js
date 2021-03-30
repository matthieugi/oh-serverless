const dateFormat = require('dateformat');

module.exports = async function (context, eventHubMessages) {  
    try {
        //save messages to database
        context.bindings.salesdb = eventHubMessages;
        
        //filter array on items with receiptUrl
        //map to ServiceBusObject
        const serviceBusMessagesWithReceipt = eventHubMessages.filter(message => message.header.receiptUrl !== null)
                                    .map((message) => 
                                    ({ 
                                        body: {
                                            totalItems: message.details.length,
                                            totalCost: parseFloat(message.header.totalCost),
                                            salesNumber: message.header.salesNumber,
                                            salesDate: dateFormat(message.header.dateTime, "mm/dd/yyyy HH:MM:ss"),
                                            storeLocation: message.header.locationId,
                                            receiptUrl: message.header.receiptUrl
                                        },
                                        applicationProperties: {
                                            totalCost: parseFloat(message.header.totalCost)
                                        }
                                    })
                                );
        
        //send to service bus queue 
        context.bindings.salesTopic = serviceBusMessagesWithReceipt;
    }
    catch (Error) {
        context.log('Error while processing event : ' + Error);
    }
};