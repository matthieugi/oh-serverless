module.exports = async function (context, eventHubMessages) {
    context.bindings.sales = eventHubMessages;
};