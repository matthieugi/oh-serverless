module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {
        context.bindings.eventHubMessages = documents;
    }
}
