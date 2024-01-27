module.exports = {
    name: "about",
    description: "Gives information about the server",
    model: `about`,
    category: "Information",
    cooldown: 15000,
    async execute(message, serverData, client, Discord) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Server Information:")
                .setDescription(message.guild.description)
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    { name: "<:nametag:1200757678104915978> __**Server name:**__", value: `**\`${message.guild.name}\`**`},
                    { name: ":book: __**Server description:**__", value: `**\`${message.guild.description}\`**`},
                    { name: "<:ID:1200784630865985598> __**ID:**__", value: `\`${message.guild.id}\``},
                    { name: ":inbox_tray: __**You have been a member since:**__", value: `<t:${Math.floor(message.member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(message.member.joinedTimestamp / 1000)}:R>)`},
                    { name: ":computer: __**Server created:**__", value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.guild.createdTimestamp / 1000)}:R>)`},
                    { name: ":hourglass: __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            const msg = await message.channel.send({ embeds: [embed], ephemeral: true });
            setTimeout(() => {
                try {
                    if (msg.deletable) {
                        msg.delete();
                    }
                } catch(err) { return err; }
            }, 15000);
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}