module.exports = async function (context, req) {
    return {
        body: context.bindings.ratings
    }
}