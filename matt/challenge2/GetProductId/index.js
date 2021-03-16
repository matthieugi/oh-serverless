module.exports = async function (context, req) {

    if(context.bindingData.productId === null) {
        return {
            status: 404
        }
    }

    else {
        const productId = context.bindingData.productId;
        const responseMessage = `The product name for your product id ${productId} is Starfruit Explosion`;
        
        return {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    }
}