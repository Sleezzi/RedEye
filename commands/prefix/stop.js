module.exports = {
    name: "stop",
    description: "",
    permissions: "Owner",
    model: `stop`,
    category: "Core",
    cooldown: 15000,
    execute(message, serverData, client, Discord) {
        if (message.author.id === "542703093981380628") {
            if (message && message.deletable) message.delete();
            setTimeout(function() {client.destroy(client.config.token)}, 4990);
        } else {
            message.channel.send(`<@${message.member.id}>, you do not have the necessary permissions to use this command`).then((msg) => setTimeout(function() { msg.delete() }, 5000));
            if (message && message.deletable) message.delete();
        }
    }
}