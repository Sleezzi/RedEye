module.exports = {
    name: "MessageUpdate",
    event: "MessageUpdate",
    type: "on",
    execute([message, newMessage], serverData, client, Discord) {
        if (message.channel.type === 1 || message.author.id === client.user.id || Object.values(client.config.channels.log).includes(message.channel.id)) return;
        for (const word of client.config.bannedWord) {
            if (newMessage.content.includes(word) && newMessage.deletable && newMessage.member.id !== client.user.id) {
                newMessage.delete();
                newMessage.channel.send(`The word ||${word}|| is forbidden on this server`).then((msg) => setTimeout(function() {msg.delete()}, 5000))
            }
        }
        for (const word of client.config.link) {
            if (newMessage.content.includes(word) && newMessage.deletable && !newMessage.member.roles.cache.has(client.config.roles.link)) {
                newMessage.delete();
                newMessage.channel.send(`Links are prohibited on this server`).then((msg) => setTimeout(function() {msg.delete()}, 5000))
            }
        }
        if (newMessage.content.startsWith(client.config.prefix)) {
            require("./commandHandler").execute([newMessage], serverData, client, Discord);
        } else {
            const embed = new Discord.EmbedBuilder()
                .setColor("Orange")
                .setTitle("Message edited")
                .addFields(
                    { name: "__Old message:__", value: `\`${message.content}\``, inline: true},
                    { name: "__New message:__", value: `\`${newMessage.content}\``, inline: true},
                    { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                    { name: "__Author:__", value: `\`${message.author}\``},
                    { name: "__Date the message was sent:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                    { name: "__Message modification date:__", value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true},
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            client.channels.cache.get(client.config.channels.log.messages).send({ embeds: [embed]});
        }
    }
}