module.exports = {
    name: "stop",
    description: "Stop the bot",
    permissions: "Owner",
    model: `stop`,
    category: "Core",
    cooldown: 15000,
    execute(message, client, Discord) {
        if (message.author.id === client.ownerId) {
            if (message && message.deletable) message.delete();
            setTimeout(function() {client.destroy(client.config.token)}, 4990);
        } else {
            message.channel.send(`:x: - <@${message.member.id}>, you do not have the necessary permissions to use this command`).then((msg) => setTimeout(function() { msg.delete() }, 5000));
            if (message && message.deletable) message.delete();
        }
    }
}