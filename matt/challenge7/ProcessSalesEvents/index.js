const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = {
    endpoint: process.env.cosmos_endpoint,
    key: process.env.cosmos_accountkey,
    databaseId: "BFYOC",
    containerId: "POSsales",
    partitionKey: { kind: "Hash", paths: ["/productName"] }
  };

const client = new CosmosClient(config);
const container = client.database(config.databaseId).container(config.containerId);

module.exports = async function (context, eventHubMessages) {  
    eventHubMessages.forEach(async (posSalesevent, index) => {
        try {
            await Promise.all(posSalesevent.details.map((item) => container.items.create(item)));
        }
        catch (Error) {
            context.log('Error while processing event : ' + Error);
        }
    });
};