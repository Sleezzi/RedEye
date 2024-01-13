module.exports = {
    name: "ErrorHandler",
    event: "ShardError",
    type: "on",
    execute([], serverData, client, Discord) {
        return;
    }
}