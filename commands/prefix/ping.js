module.exports = {
    name: "ping",
    description: "Gives information about the server",
    model: `ping`,
    category: "Information",
    cooldown: 15000,
    async execute(message, serverData, client, Discord) {
        try {
            let date = new Date();
            const APIPing = Date.now() - message.createdAt;
            let embed = {
                color: 0x00FFFF,
                title: ".o0 | Latency:",
                author: {
                    name: message.author.tag,
                    icon_url: message.member.user.avatarURL(),
                    url: message.url,
                },
                fields: [ { name: "__**The ping of Discord API:**__", value: `**\`${APIPing}ms\`**`, inline: true} ],
                footer: {
                    text: `Id: ${message.id}`,
                    iconURL: client.user.avatarURL()
                }
            }
            const msg = await message.channel.send({ embeds: [embed], ephemeral: false });
            embed.fields.push(
                { name: "__**The ping of Bot:**__", value: `**\`${(msg.createdAt - message.createdAt) - APIPing}ms\`**`, inline: true }
            )
            msg.edit({ embeds: [embed], ephemeral: false });
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}