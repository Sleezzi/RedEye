module.exports = {
    data: {
        name: "guild",
        name_localizations: {
            "en-US": "guild",
            fr: "servers"
        },
        description: "Show you the list of guild where the bot is",
        description_localizations: {
            "en-US": "Show you the list of guild where the bot is",
            fr: "Vous montre la liste des serveurs sur lequel le bot est"
        },
        default_member_permissions: "8",
        options: [],
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        if (interaction.member.id === "542703093981380628") {
            const embed = {
                color: 0x0099ff,
                title: 'Servers list',
                author: {
                    name: interaction.member.user.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url
                },
                fields: [
                    { name: "__**Server(s):**__", value: `Total member: 0`, inline: false},
                ],
                url: interaction.url,
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL()
                },
            }
            let members = 0;
            client.guilds.cache.forEach(guild => {
                members += guild.members.cache.filter((member) => !member.user.bot).size;
                embed.fields[0].value = `> - Total server${(client.guilds.cache.map(server => server.id).length > 1 ? "s" : "")}: \`${client.guilds.cache.map(server => server.id).length}\`\n> - Total member${(members > 1 ? "s" : "")}: \`${members}\``;
                embed.fields.push({name: `${guild.name} (\`${guild.id}\`)`, value: `> - Member${(guild.members.cache.filter((member) => !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => !member.user.bot).size}**\n> - Online member${(guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size}**\n> - Owner: **${guild.members.cache.find(member => member.id === guild.ownerId).user.username.toUpperCase()}**`})
            });
            interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true }));
        } else {
            interaction.deleteReply().then(() => interaction.followUp({ content: `<@${interaction.member.id}>, you do not have the necessary permissions to use this command`, ephemeral: true }));
        }
    }
}