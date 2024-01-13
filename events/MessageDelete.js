module.exports = {
    name: "MessageDelete",
    event: "MessageDelete",
    type: "on",
    execute([message], serverData, client, Discord) {
        if (message.channel.type === 1 || message.content.startsWith(client.config.prefix) || Object.values(client.config.channels.log).includes(message.channel.id) || message.author.id === client.user.id) return;
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
        client.channels.cache.get(client.config.channels.log.messages).send({ embeds: [embed]});
    }
}