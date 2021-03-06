const axios = require('axios');

module.exports = async function(context, mySbMsg) {
       const pdf = (await axios.get(mySbMsg.receiptUrl)).data;
       
       context.bindings.outputBlob = {
            Store: mySbMsg.storeLocation,
            SalesNumber: mySbMsg.salesNumber,
            TotalCost: mySbMsg.totalCost,
            Items: mySbMsg.totalItems,
            ReceiptImage: Buffer.from(pdf).toString('base64')
       }
};