module.exports = {
    name: "CommandsHandler",
    event: "MessageCreate",
    type: "on",
    async execute([message], serverData, client, Discord) {
        if (message.channel.type === 1
        || message.author.bot
        || !message.content.startsWith(serverData.get(message.guild.id).prefix)) return;
        const command = message.content.toLowerCase().replace(serverData.get(message.guild.id).prefix, "").split(" ")[0];
        if (client.data.commands.prefix.has(command)) {
            try {
                // Checks if the user is in cooldown
                if (client.data.cooldown.has(message.author.id)) {
                    await client.data.cooldown.set(message.author.id, { usedAt: Math.floor(Date.now() / 1000), cooldown: require(`../commands/prefix/${command}`).cooldown});
                    try {
                        if (client.data.cooldown.has(message.author.id).cooldown) {
                            message.reply(`Please wait **${client.data.cooldown.get(message.author.id).cooldown / 1000 - (Math.floor(Date.now() / 1000) - client.data.cooldown.get(message.author.id).usedAt)}s** before using command.`).then((msg) => setTimeout(async function() {
                                try {
                                    if (msg.id) msg.delete();
                                    if (message && message.deletable) message.delete();
                                } catch(err) {console.error(err);}
                            }, (client.data.cooldown.get(message.author.id).cooldown - (Math.floor(Date.now() / 1000) - client.data.cooldown.get(message.author.id).usedAt))));
                            return;
                        }
                    } catch(err) {console.error(err);}
                }
                // Put the user in cooldown
                client.data.cooldown.set(message.author.id, { usedAt: Math.floor(Date.now() / 1000), cooldown: require(`../commands/prefix/${command}`).cooldown});
                // log
                console.log(`  ↪ [\x1b[90m${(message.createdAt.getDate() < 10 ? `0${message.createdAt.getDate()}` : message.createdAt.getDate())}/${(message.createdAt.getMonth() < 10 ? `0${message.createdAt.getMonth()}` : message.createdAt.getMonth())}/${(message.createdAt.getFullYear() < 10 ? `0${message.createdAt.getFullYear()}` : message.createdAt.getFullYear())} ${(message.createdAt.getHours() < 10 ? `0${message.createdAt.getHours()}` : message.createdAt.getHours())}:${(message.createdAt.getMinutes() < 10 ? `0${message.createdAt.getMinutes()}` : message.createdAt.getMinutes())}:${(message.createdAt.getSeconds() < 10 ? `0${message.createdAt.getSeconds()}` : message.createdAt.getSeconds())}\x1b[0m] \x1b[36m${(message.member.nickname ? `${message.member.nickname} (${(message.author.tag.endsWith("#0") ? `${`${message.author.username}`.replace(`${message.author.username}`.slice(1), "").toUpperCase()}${`${message.author.username}`.slice(1)}` : `${`${message.author.tag}`.replace(`${message.author.tag}`.slice(1), "").toUpperCase()}${`${message.author.tag}`.slice(1)}`)})` : `${(message.author.tag.endsWith("#0") ? `${`${message.author.username}`.replace(`${message.author.username}`.slice(1), "").toUpperCase()}${`${message.author.username}`.slice(1)}` : `${`${message.author.tag}`.replace(`${message.author.tag}`.slice(1), "").toUpperCase()}${`${message.author.tag}`.slice(1)}`)}`)}\x1b[0m a utilisé la commande ${client.config.prefix}${command}${(message.content.toLowerCase().split(`${command} `).slice(1).length > 0 ? ` (\x1b[90m${message.content.toLowerCase().split(`${command} `).slice(1)}\x1b[0m)` : '\x1b[0m')}`);
                if (serverData.get(message.guild.id).disabledCommands.find(c => c === command)) {
                    message.reply({ embeds: [{
                        color: 0xff0000,
                        title: `Error`,
                        fields: [
                            { name: 'The administrators of this server have disabled this command.', value: '\u200B', inline: false },
                            { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        ],
                        footer: {
                            text: `Id: ${message.id}`,
                            icon_url: client.user.avatarURL(),
                        }
                    }] }).then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
                    return;
                }
                const err = await require(`../commands/prefix/${command}`).execute(message, serverData, client, Discord);
                if (err) {
                    console.error(err);
                }
                if (serverData.get(message.guild.id).channel.log.enable && message.guild.channels.cache.find((channel) => channel.id === serverData.get(message.guild.id).channel.log.channelId) && !serverData.get(message.guild.id).channel.log.whitelisted.find((channel) => channel === message.channel.id)) {
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setTitle("New command")
                    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
                    .addFields(
                        { name: "__Command:__", value: `**\`${command}\`**` },
                        { name: "__Options(s):__", value: `**\`${message.content.split(`${client.config.prefix}${command} `).slice(1)}\`**` },
                        { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                        { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                        { name: "__Date:__", value: `<t:${Math.floor(message.createdMath.floor(Date.now() / 1000) / 1000)}:d> (<t:${Math.floor(message.createdMath.floor(Date.now() / 1000) / 1000)}:R>)` },
                    )
                    .setURL(message.url)
                    .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
                    message.guild.channels.cache.get(serverData.get(message.guild.id).channel.log.channelId).send({ embeds: [embed]});
                }
                
            } catch(err) { console.error(err); }
            // Remove the user in cooldown
            setTimeout(function() {
                try {
                    client.data.cooldown.delete(message.author.id);
                } catch(err) {console.error(err);}
            }, require(`../commands/prefix/${command}`).cooldown);
        } else {
            // check if channel is whitelisted 
            if (!serverData.get(message.guild.id).channel.log.enable || !message.guild.channels.cache.find((channel) => channel.id === serverData.get(message.guild.id).channel.log.channelId) || serverData.get(message.guild.id).channel.log.whitelisted.find((channel) => channel === message.channel.id)) return;
            // log
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("New command")
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
            .addFields(
                { name: "__Command:__", value: `**\`${command}\`**` },
                { name: "__Options(s):__", value: `**\`${message.content.replace(client.config.prefix + command, "").split(" ")[0]}\`**` },
                { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                { name: "__Date:__", value: `<t:${Math.floor(message.createdMath.floor(Date.now() / 1000) / 1000)}:d> (<t:${Math.floor(message.createdMath.floor(Date.now() / 1000) / 1000)}:R>)` },
            )
            .setURL(message.url)
            .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            message.guild.channels.cache.get(serverData.get(message.guild.id).channel.log.channelId).send({ embeds: [embed]});
        }
    }
}