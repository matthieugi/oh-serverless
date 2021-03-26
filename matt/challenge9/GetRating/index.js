module.exports = async function (context) {

    if(context.bindings.rating === undefined) {
        return {
            status: 404
        }
    }

    return {
        body: context.bindings.rating
    }
}