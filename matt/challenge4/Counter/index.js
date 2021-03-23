const df = require("durable-functions");

module.exports = df.entity(function(context) {
    const currentValue = context.df.getState(() => {
        counter: 0
    });

    switch (context.df.operationName) {
        case "add":
            const amount = context.df.getInput();
            context.df.setState({ counter: currentValue.counter + amount });
            break;
        case "reset":
            context.df.setState( { counter: 0 });
            break;
        case "get":
            context.df.return(currentValue.counter);
            break;
    }
});