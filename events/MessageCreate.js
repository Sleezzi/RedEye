module.exports = {
    name: "NewMessage",
    event: "MessageCreate",
    type: "on",
    execute([message], serverData, client, Discord) {
        if (message.channel.type === 1 || message.author.bot || Object.values(client.config.channels.log).includes(message.channel.id)) return;
        for (const word of client.config.bannedWord) {
            if (message.content.toLocaleLowerCase().includes(word) && message.deletable && message.member.id !== client.user.id) {
                try {
                    if (message && message.deletable) message.delete();
                    message.reply(`Le mot "||${word}||" est interdit sur ce serveur`).then((msg) => setTimeout(function() { msg.delete()}, 5000));
                    return;
                } catch(err) { console.error(err); }
            }
        }
        for (const word of client.config.link) {
            if (message.content.toLocaleLowerCase().includes(word) && message.deletable && !message.member.roles.cache.has(client.config.roles.link)) {
                message.delete();
                const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setTitle("New message")
                    .setDescription("With link inside")
                    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
                    .addFields(
                        { name: "__Link:__", value: `**\`${word}\`**` },
                        { name: "__Message:__", value: `**\`${message.content}\`**` },
                        { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                        { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                        { name: "__Date:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
                    )
                    .setURL(message.url)
                    .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
                client.channels.cache.get(client.config.channels.log.messages).send({ embeds: [embed]});
                message.channel.send(`Les liens sont interdit sur ce serveur`).then((msg) => setTimeout(function() {msg.delete()}, 5000));
                return;
            }
        }

        if (!message.content.startsWith(client.config.prefix)) {
            const embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("New message")
                .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
                .addFields(
                    { name: "__Message:__", value: `**\`${message.content}\`**` },
                    { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                    { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                    { name: "__Date:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            client.channels.cache.get(client.config.channels.log.messages).send({ embeds: [embed]});
        }
    }
}