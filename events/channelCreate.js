module.exports = {
    name: "NewChannel",
    event: "ChannelCreate",
    type: "on",
    execute([channel], serverData, client, Discord) {
        const embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle(`New ${(channel.type === 0 ? "Text" : (channel.type === 2 ? "Voice" : (channel.type === 15 ? "Forum" : (channel.type === 5 ? "Announcement" : (channel.type === 13 ? "Stage" : "Unknown")))))} channel`)
            .addFields(
                { name: "__Name:__", value: `\`${channel.name}\`` },
                { name: `__Description:__`, value: `> ${(channel.topic ? channel.topic : "This channel has no description")}`, inline: true },
                { name: "__NSFW:__", value: (channel.nsfw === true ? ":white_check_mark:" : ":x:") },
                { name: "__Date of creation:__", value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true },
            )
            .setFooter({ text: `Id: ${channel.id}`, iconURL: client.user.avatarURL() });
        channel.guild.channels.cache.get(client.config.channels.log.channels).send({ embeds: [embed]});
    }
}