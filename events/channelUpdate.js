module.exports = {
    name: "ChannelUpdate",
    event: "ChannelUpdate",
    type: "on",
    execute([oldChannel, channel], client, Discord) {
        require("../components/database").get(`/${message.guild.id}/channels/log/channelId`, client).then(id => {
            if (typeof id === "object" || !channel.guild.channels.cache.has(id) || !channel.guild.channels.cache.get(id).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) return;
            const embed = {
                color: 0xffa500,
                title: `${(channel.type === 0 ? "Text" : (channel.type === 2 ? "Voice" : (channel.type === 15 ? "Forum" : (channel.type === 5 ? "Announcement" : (channel.type === 13 ? "Stage" : "Unknown")))))} Salon edited`,
                fields: [
                    { name: `__Date of creation:__`, value: `> <t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true},
                    { name: `__Date of edit:__`, value: `> <t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true },
                ],
                footer: {
                    text: `Id: ${channel.id}`,
                    icon_url: client.user.avatarURL(),
                },
            }
    
            if (oldChannel.nsfw !== channel.nsfw) {
                embed.fields.push(
                    { name: `__NSFW before:__`, value: `> ${(oldChannel.nsfw === true ? `:white_check_mark:` : `:x:`)}`, inline: true},
                    { name: `__NSFW after:__`, value: `> ${(channel.nsfw === true ? `:white_check_mark:` : `:x:`)}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                );
            }
            
            if (oldChannel.topic !== channel.topic) {
                embed.fields.push(
                    { name: `__Old description:__`, value: `> ${oldChannel.topic}`, inline: true},
                    { name: `__New description:__`, value: `> ${channel.topic}`, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                );
            }
    
            if (oldChannel.name !== channel.name) {
                embed.fields.push(
                    { name: `__Old name:__`, value: `> \`${oldChannel.name}\``, inline: true },
                    { name: `__New name:__`, value: `> <#${channel.id}> \`(${channel.name})\``, inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                );
            } else {
                embed.fields.push(
                    { name: `__Name:__`, value: `> <#${channel.id}> \`(${channel.name})\``},
                );
            }
            channel.guild.channels.cache.get(id).send({ embeds: [embed] });
        });
    }
}