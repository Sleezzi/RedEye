module.exports = {
    data: {
        name: "about",
        name_localizations: {
            "en-US": "about",
            fr: "info"
        },
        description: "Gives you information about the server",
        description_localizations: {
            "en-US": "Gives you information about the server",
            fr: "Donne des informations sur le serveur"
        },
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle(":information:・Server Information:")
                .setDescription(interaction.guild.description)
                .setThumbnail(interaction.guild.iconURL())
                .addFields(
                    { name: "<:nametag:1200757678104915978> __**Server name:**__", value: `**\`${interaction.guild.name}\`**`, inline: true},
                    { name: ":book:・__**Server description:**__", value: `**\`${interaction.guild.description}\`**`, inline: true},
                    { name: "<:ID:1200784630865985598> - __**ID:**__", value: `\`${interaction.guild.id}\``, inline: true},
                    { name: "<:owner:1200816888364683396> - __**Owner:**__", value: `${interaction.guild.members.cache.find(member => member.id === interaction.guild.ownerId).user.username} (id: ${interaction.guild.ownerId})`, inline: true},
                    { name: `<:member:1200816753421328484> - __**Member${interaction.guild.members.cache.filter(member => !member.user.bot).size > 1 ? "s" : ""}:**__`, value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true},
                    { name: `<:member:1200816753421328484> - __**Onlone Member${interaction.guild.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size > 1 ? "s" : ""}:**__`, value: `${interaction.guild.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size}`, inline: true},
                    { name: ":inbox_tray:・__**You have been a member since:**__", value: `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>)`, inline: true},
                    { name: ":computer:・__**Server created:**__", value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>)`, inline: true},
                    { name: "<:time:1205987554260684870> - __**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(interaction.url)
                .setFooter({ text: `Id: ${interaction.id}`, iconURL: client.user.avatarURL() });
            await interaction.deleteReply();
            interaction.followUp({ embeds: [embed], ephemeral: true });
        } catch(err) { return err; }
    }
}