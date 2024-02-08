module.exports = {
    name: "restart",
    description: "Restart the bot",
    permissions: "Owner",
    model: `restart`,
    category: "Core",
    cooldown: 15000,
    execute(message, client, Discord) {
        if (message.author.id === "542703093981380628") {
            if (message && message.deletable) message.delete();
            setTimeout(function() {
                client.destroy(require("../../token.json").token).then(() => {
                    client.login(require("../../token.json").token).then(() => {console.log(`  \x1b[32m➜ Restarted\x1b[0m\n\n`); });
                });
            }, 490);
        } else {
            message.channel.send(`:x: - <@${message.member.id}>, you do not have the necessary permissions to use this command`).then((msg) => setTimeout(function() { msg.delete() }, 5000));
            if (message && message.deletable) message.delete();
        }
    }
}