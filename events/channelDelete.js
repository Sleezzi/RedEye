module.exports = {
    name: "ChannelDelete",
    event: "ChannelDelete",
    type: "on",
    async execute([channel], client, Discord) {
        try {
            const id = await require("../components/database").get(`/${message.guild.id}/channels/log/channelId`, client);
            if (typeof id === "object" || !channel.guild.channels.cache.has(id) || !channel.guild.channels.cache.get(id).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) return;
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle(`${(channel.type === 0 ? "Text" : (channel.type === 2 ? "Voice" : (channel.type === 15 ? "Forum" : (channel.type === 5 ? "Announcement" : (channel.type === 13 ? "Stage" : "Unknown")))))} channel deleted`)
            .addFields(
                { name: "<:nametag:1200757678104915978> - __Name:__", value: `\`${channel.name}\`` },
                { name: ":underage: - __NSFW:__", value: (channel.nsfw === true ? "<a:yes:1205984539852144751>" : "<a:no:1205984659524296744>") },
                { name: "<:time:1205987554260684870> - __Date of creation:__", value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true },
                { name: "<:time:1205987554260684870> - __Date of delete", value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true }
            )
            .setFooter({ text: `Id: ${channel.id}`, iconURL: client.user.avatarURL() });
            channel.guild.channels.cache.get(id).send({ embeds: [embed] });
        } catch (err) { return err; }
        
    }
}