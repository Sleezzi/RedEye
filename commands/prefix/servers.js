module.exports = {
    name: "servers",
    description: "Show you the list of guild where the bot is.",
    permissions: "Administrator",
    model: `servers`,
    category: "Core",
    cooldown: 5000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        if (message.member.id !== client.ownerId) {
            message.channel.send({ content: `<a:no:1209518375169167391> - <@${message.member.id}>, you do not have the necessary permissions to use this command`, ephemeral: true });
            return;
        }
        const embed = {
            color: 0x0099ff,
            title: 'Servers list',
            author: {
                name: message.member.user.tag,
                icon_url: message.member.user.avatarURL(),
                url: message.url
            },
            fields: [
                { name: ":mechanical_arm:・__**Server(s):**__", value: `Total member: 0`, inline: false},
            ],
            url: message.url,
            footer: {
                text: `Id: ${message.id}`,
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
        message.channel.send({ embeds: [embed], ephemeral: true });
    }
}