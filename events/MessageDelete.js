module.exports = {
    name: "MessageDelete",
    event: "MessageDelete",
    type: "on",
    execute([message], client, Discord) {
        require("../components/database").get(`/${message.guild.id}`, client).then(async (serverData) => {
            if (!message.channel.type === 1 ||
                (serverData.prefix && message.content.startsWith(serverData.prefix)) ||
                !serverData.channels ||
                !serverData.channels.log ||
                !serverData.channels.log.channelId ||
                !message.guild.channels.cache.get(serverData.channels.log.channelId) ||
                message.channel.id === serverData.channels.log.channelId ||
                !message.guild.channels.cache.find(channel => channel.id === serverData.channels.log.channelId).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) return;
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Message deleted")
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
            .addFields(
                { name: "__Message:__", value: `**\`${message.content}\`**` },
                { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                { name: "__Date the message was sent:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                { name: "__Date:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
            )
            .setURL(message.url)
            .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            message.guild.channels.cache.get(serverData.channels.log.channelId).send({ embeds: [embed]});
        });
    }
}