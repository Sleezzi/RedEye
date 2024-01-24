module.exports = {
    name: "ChannelDelete",
    event: "ChannelDelete",
    type: "on",
    execute([channel], _, client, Discord) {
        require("../components/database").get(`/${message.guild.id}/channels/log/channelId`, client).then(id => {
            if (typeof id === "object" || !channel.guild.channels.cache.has(id) || !channel.guild.channels.cache.get(id).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) return;
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle(`${(channel.type === 0 ? "Text" : (channel.type === 2 ? "Voice" : (channel.type === 15 ? "Forum" : (channel.type === 5 ? "Announcement" : (channel.type === 13 ? "Stage" : "Unknown")))))} channel deleted`)
            .addFields(
                { name: "__Nom:__", value: `\`${channel.name}\`` },
                { name: "__NSFW:__", value: (channel.nsfw === true ? ":white_check_mark:" : ":x:") },
                { name: "__Date de création:__", value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true },
                { name: "__Date de supression", value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true }
            )
            .setFooter({ text: `Id: ${channel.id}`, iconURL: client.user.avatarURL() });
            channel.guild.channels.cache.get(id).send({ embeds: [embed] });
        });
    }
}