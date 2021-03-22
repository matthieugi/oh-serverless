module.exports = async function (context, req) {
    if(context.bindings.ratings === undefined) {
        return {
            status: 404
        }
    }

    return {
        body: context.bindings.ratings
    }
}