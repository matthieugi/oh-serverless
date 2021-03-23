/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

const axios = require('axios');

module.exports = async function (context) {
    const response = await axios.post('https://serverlessohmanagementapi.trafficmanager.net/api/order/combineOrderContent',
        collectedFiles,
        {
            Headers: 'Content-Type: application/json'
        }
    );

    return response.data;
};