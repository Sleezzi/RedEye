module.exports = {
    name: "ping",
    description: "Gives information about the server",
    model: `ping`,
    category: "Misc",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            let date = new Date();
            const APIPing = Date.now() - message.createdAt;
            let embed = {
                color: 0x00FFFF,
                title: ":wireless: - Latency:",
                author: {
                    name: message.author.tag,
                    icon_url: message.member.user.avatarURL(),
                    url: message.url,
                },
                fields: [
                    { name: "<:time:1205987554260684870> - __**The ping of Discord API:**__", value: `**\`${APIPing}ms\`**`, inline: true },
                    { name: "<:time:1205987554260684870> - __**The ping of Bot:**__", value: `**\`${client.ws.ping}ms\`**`, inline: true }
                ],
                footer: {
                    text: `Id: ${message.id}`,
                    iconURL: client.user.avatarURL()
                }
            }
            message.channel.send({ embeds: [embed], ephemeral: false });
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}