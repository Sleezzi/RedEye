module.exports = {
    data: {
        name: "guild",
        name_localizations: {
            "en-US": "guild",
            fr: "servers"
        },
        description: "Shows you the list of servers the bot is on",
        description_localizations: {
            "en-US": "Shows you the list of servers the bot is on",
            fr: "Vous montre la liste des serveurs sur lesquels le bot est"
        },
        default_member_permissions: "8",
        options: [],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            if (interaction.member.id !== client.ownerId) {
                await interaction.deleteReply();
                interaction.followUp({ content: `<a:no:1211019198881472622> - <@${interaction.member.id}>, you do not have the necessary permissions to use this command`, ephemeral: true });
                return;
            }
            const embed = {
                color: 0x0099ff,
                title: 'Servers list',
                author: {
                    name: interaction.member.user.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url
                },
                fields: [
                    { name: ":mechanical_arm:・__**Server(s):**__", value: `Total member: 0`, inline: false},
                ],
                url: interaction.url,
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL()
                },
            }
            
            let members = 0;
            if (client.guilds.cache.map((guild) => guild.id).length > 99) {
                client.guilds.cache.map((guild) => guild).filter((guild, index) => index <= 99).forEach((guild, index) => {
                    members += guild.members.cache.filter((member) => !member.user.bot).size;
                    embed.fields[0].value = `> **Here is the stats for:** \`${index + 1}\`\n > - Total member${(members > 1 ? "s" : "")}: \`${members}\``;
                    embed.fields.push({name: `${guild.name} (\`${guild.id}\`)`, value: `> - Member${(guild.members.cache.filter((member) => !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => !member.user.bot).size}**\n> - Online member${(guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size}**\n> - Owner: **${guild.members.cache.find(member => member.id === guild.ownerId).user.username.toUpperCase()}**`});
                });
            } else {
                client.guilds.cache.forEach((guild, index) => {
                    members += guild.members.cache.filter((member) => !member.user.bot).size;
                    embed.fields[0].value = `> - Total server${index + 1 > 1 ?"s" : ""}: \`${client.guilds.cache.map(server => server.id).length}\`\n> - Total member${(members > 1 ? "s" : "")}: \`${members}\``;
                    embed.fields.push({name: `${guild.name} (\`${guild.id}\`)`, value: `> - Member${index + 1 > 1 ? "s" : ""}: **${guild.members.cache.filter((member) => !member.user.bot).size}**\n> - Online member${(guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size}**\n> - Owner: **${guild.members.cache.find(member => member.id === guild.ownerId).user.username.toUpperCase()}**`});
                });
            }
            await interaction.deleteReply();
            interaction.followUp({ embeds: [embed], ephemeral: true });
        } catch (err) { return err; }
    }
}