module.exports = {
    name: "stop",
    description: "Stop the bot",
    permissions: "Owner",
    model: `stop`,
    category: "Core",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            if (message.author.id === client.ownerId) {
                if (message && message.deletable) message.delete();
                setTimeout(() => {
                    client.destroy(client.config.token);
                }, 4990);
            } else {
                const msg = await message.channel.send(`:x: - <@${message.member.id}>, you do not have the necessary permissions to use this command`);
                setTimeout(() => {
                    msg.delete();
                }, 5000);
                if (message && message.deletable) message.delete();
            }
        } catch (err) {
            return err;
        }
    }
}