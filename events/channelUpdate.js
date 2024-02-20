module.exports = {
    name: "ChannelUpdate",
    event: "ChannelUpdate",
    type: "on",
    async execute([oldChannel, channel], client, Discord) {
        try {
            const id = await require("../components/database").get(`/${message.guild.id}/channels/log/channelId`, client);
            if (typeof id === "object" || !channel.guild.channels.cache.has(id) || !channel.guild.channels.cache.get(id).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) return;
            const embed = {
                color: 0xffa500,
                title: `${(channel.type === 0 ? "Text" : (channel.type === 2 ? "Voice" : (channel.type === 15 ? "Forum" : (channel.type === 5 ? "Announcement" : (channel.type === 13 ? "Stage" : "Unknown")))))} Salon edited`,
                fields: [
                    { name: `<:time:1205987554260684870> - __Date of creation:__`, value: `> <t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true},
                    { name: `<:time:1205987554260684870> - __Date of edit:__`, value: `> <t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                ],
                footer: {
                    text: `Id: ${channel.id}`,
                    icon_url: client.user.avatarURL(),
                },
            }
            
            if (oldChannel.nsfw !== channel.nsfw) {
                embed.fields.push(
                    { name: `:underage: - __NSFW before:__`, value: `> ${(oldChannel.nsfw === true ? `<a:yes:1205984539852144751>` : `<a:no:1209518375169167391>`)}`, inline: true},
                    { name: `:underage: - __NSFW after:__`, value: `> ${(channel.nsfw === true ? `<a:yes:1205984539852144751>` : `<a:no:1209518375169167391>`)}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                );
            } else {
                embed.fields.push(
                    { name: `:underage: - __NSFW:__`, value: `> ${(channel.nsfw === true ? `<a:yes:1205984539852144751>` : `<a:no:1209518375169167391>`)}`, inline: true},
                );
            }
            
            if (oldChannel.topic !== channel.topic) {
                embed.fields.push(
                    { name: `:book: - __Old description:__`, value: `> ${oldChannel.topic}`, inline: true},
                    { name: `:book: - __New description:__`, value: `> ${channel.topic}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                );
            } else {
                embed.fields.push(
                    { name: `:book: - __Description:__`, value: `> ${channel.topic}`, inline: true},
                );
            }
            
            if (oldChannel.name !== channel.name) {
                embed.fields.push(
                    { name: `<:nametag:1200757678104915978> - __Old name:__`, value: `> \`${oldChannel.name}\``, inline: true },
                    { name: `<:nametag:1200757678104915978> - __New name:__`, value: `> <#${channel.id}> \`(${channel.name})\``, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                );
            } else {
                embed.fields.push(
                    { name: `<:nametag:1200757678104915978> - __Name:__`, value: `> <#${channel.id}> \`(${channel.name})\``},
                );
            }
            channel.guild.channels.cache.get(id).send({ embeds: [embed] });
        } catch (err) { return err; }
    }
}