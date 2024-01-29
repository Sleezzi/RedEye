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
                .setTitle("Server Information:")
                .setDescription(interaction.guild.description)
                .setThumbnail(interaction.guild.iconURL())
                .addFields(
                    { name: "<:nametag:1200757678104915978> __**Server name:**__", value: `**\`${interaction.guild.name}\`**`},
                    { name: ":book: __**Server description:**__", value: `**\`${interaction.guild.description}\`**`},
                    { name: "<:ID:1200784630865985598> __**ID:**__", value: `\`${interaction.guild.id}\``},
                    { name: ":inbox_tray: __**You have been a member since:**__", value: `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>)`},
                    { name: ":computer: __**Server created:**__", value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>)`},
                    { name: ":hourglass: __**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(interaction.url)
                .setFooter({ text: `Id: ${interaction.id}`, iconURL: client.user.avatarURL() });
            await interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true }));
        } catch(err) { return err; }
    }
}