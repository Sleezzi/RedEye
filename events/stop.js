module.exports = {
    name: "StopHandler",
    event: "ShardDisconnect",
    type: "on",
    execute([event], client, Discord) {
        console.log(`The bot has been stoped${(event.code === 1000 ? "." : ` reason: ${event.reason})`)}`);
    }
}