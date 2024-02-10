module.exports = {
    name: "restart",
    description: "Restart the bot",
    permissions: "Owner",
    model: `restart`,
    category: "Core",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            if (message.author.id === client.ownerId) {
                setTimeout(async () => {
                    await client.destroy(require("../../token.json").token);
                    await client.login(require("../../token.json").token);
                    console.log(`  \x1b[32m➜ Restarted\x1b[0m\n\n`);
                }, 490);
            } else {
                const msg = await message.channel.send(`<a:no:1205984659524296744> - <@${message.member.id}>, you do not have the necessary permissions to use this command`);
                setTimeout(() => {
                    try {
                        msg.delete();
                    } catch (err) {
                        return err;
                    }
                }, 5000);
            }
            if (message && message.deletable) message.delete();
        } catch (err) {
            return err;
        }
    }
}