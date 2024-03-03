module.exports = {
    name: "about",
    description: "Gives information about the server",
    model: `about`,
    category: "Misc",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Server Information:")
                .setDescription(message.guild.description)
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    { name: "<:nametag:1200757678104915978> __**Server name:**__", value: `**\`${message.guild.name}\`**`, inline: true},
                    { name: ":book:・__**Server description:**__", value: `**\`${message.guild.description}\`**`, inline: true},
                    { name: "<:ID:1200784630865985598> - __**ID:**__", value: `\`${message.guild.id}\``, inline: true},
                    { name: "<:owner:1200816888364683396> - __**Owner:**__", value: `${message.guild.members.cache.find(member => member.id === message.guild.ownerId).user.username} (id: ${message.guild.ownerId})`, inline: true},
                    { name: `<:member:1200816753421328484> - __**Member${message.guild.members.cache.filter(member => !member.user.bot).size > 1 ? "s" : ""}:**__`, value: `${message.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true},
                    { name: `<:member:1200816753421328484> - __**Onlone Member${message.guild.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size > 1 ? "s" : ""}:**__`, value: `${message.guild.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size}`, inline: true},
                    { name: ":inbox_tray:・__**You have been a member since:**__", value: `<t:${Math.floor(message.member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(message.member.joinedTimestamp / 1000)}:R>)`, inline: true},
                    { name: ":computer:・__**Server created:**__", value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.guild.createdTimestamp / 1000)}:R>)`, inline: true},
                    { name: "<:time:1205987554260684870> - __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
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
            }, 25_000);
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}