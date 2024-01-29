module.exports = {
    name: "ErrorHandler",
    event: "ShardError",
    type: "on",
    execute([], client, Discord) {
        return;
    }
}