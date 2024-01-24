module.exports = {
    name: "CommandsHandler",
    event: "MessageCreate",
    type: "on",
    async execute([message], _, client, Discord) {
        if (message.channel.type === 1
        || message.author.bot) return;
        const serverData = await require("../components/database").get(`/${message.guild.id}`, client); // Get serverData from db
        if (!serverData.prefix) serverData.prefix = "!"; // Check if the server have a custom prefix, if he don't have, it's put ! by default
        if (!serverData.disabled) serverData.disabled = []; // Check if the server have a disabled command, if he don't have, it set disabled on a Array to don't make error
        if (message.content.startsWith(serverData.prefix)) { // Check if message is a command
            const command = message.content.toLowerCase().replace(serverData.prefix, "").split(" ")[0]; // Get the command
            if (client.data.commands.prefix.has(command)) { // Check if it's a valid command
                try {
                    if (client.data.cooldown.has(message.author.id)) { // Checks if the user is in cooldown
                        try {
                            message.reply(`Please wait **${client.data.cooldown.get(message.author.id).cooldown / 1000 - (Math.floor(Date.now() / 1000) - client.data.cooldown.get(message.author.id).usedAt)}s** before using command.`).then((msg) => setTimeout(async function() {
                                try {
                                    if (msg.id) msg.delete();
                                    if (message && message.deletable) message.delete();
                                } catch(err) {console.error(err);}
                            }, (client.data.cooldown.get(message.author.id).cooldown - (Math.floor(Date.now() / 1000) - client.data.cooldown.get(message.author.id).usedAt)))); // Delete message when the cooldown is end
                            return;
                        } catch(err) {console.error(err);}
                    }
                    client.data.cooldown.set(message.author.id, { usedAt: Math.floor(Date.now() / 1000), cooldown: require(`../commands/prefix/${command}`).cooldown}); // Put the user in cooldown
                    require("../components/log")(`%aqua%${(message.member.nickname ? `${message.member.nickname} (${(message.author.tag.endsWith("#0") ? `${`${message.author.username}`.replace(`${message.author.username}`.slice(1), "").toUpperCase()}${`${message.author.username}`.slice(1)}` : `${`${message.author.tag}`.replace(`${message.author.tag}`.slice(1), "").toUpperCase()}${`${message.author.tag}`.slice(1)}`)})` : `${(message.author.tag.endsWith("#0") ? `${`${message.author.username}`.replace(`${message.author.username}`.slice(1), "").toUpperCase()}${`${message.author.username}`.slice(1)}` : `${`${message.author.tag}`.replace(`${message.author.tag}`.slice(1), "").toUpperCase()}${`${message.author.tag}`.slice(1)}`)}`)}%reset% a utilisé la commande %yellow%${serverData.prefix}${command}%reset%${(message.content.toLowerCase().split(`${command} `).slice(1).length > 0 ? ` (%grey%${message.content.toLowerCase().split(`${command} `).slice(1)}%reset%)` : '%reset%')}`); // Log message in console
                    if (serverData.disabled.find(c => c === command)) { // Check if the server has disabled the command
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
                        }] }).then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000)); // send message to warn the user about the disabled command
                        return; // End here
                    }
                    const err = await require(`../commands/prefix/${command}`).execute(message, serverData, client, Discord); // Execute the command
                    if (err) console.error(err); // Check if some error happned
                    if (serverData.channels && serverData.channels.log && message.channelId !== serverData.channels.log.channelId && message.guild.channels.cache.find((channel) => channel.id === serverData.channels.log.channelId) && (!serverData.channels.log.whitelisted || !serverData.channels.log.whitelisted.find((channel) => channel === message.channel.id))) { // Check if a log channel is defined and if the message has don't been send in a whitelisted channel
                        const embed = new Discord.EmbedBuilder()
                            .setColor("Green")
                            .setTitle("New command")
                            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
                            .addFields(
                                { name: "__Command:__", value: `**\`${command}\`**` },
                                { name: "__Options(s):__", value: `**\`${message.content.split(`${serverData.prefix}${command} `).slice(1)}\`**` },
                                { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                                { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                                { name: "__Date:__", value: `<t:${Math.floor(message.created / 1000)}:d> (<t:${Math.floor(message.created / 1000)}:R>)` },
                            )
                            .setURL(message.url)
                            .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
                        message.guild.channels.cache.get(serverData.channels.log.channelId).send({ embeds: [embed]}); // Send the log in the channel selected by the admin of the server
                    }
                } catch(err) { console.error(err); }
               
                setTimeout(function() { // Await
                    try {
                        client.data.cooldown.delete(message.author.id); // Remove the user in cooldown
                    } catch(err) { console.error(err); }
                }, require(`../commands/prefix/${command}`).cooldown);
            } else { // If command don't existe
                if (!serverData.channels || !serverData.channels.log || message.channelId === serverData.channels.log.channelId || message.guild.channels.cache.find((channel) => channel.id === serverData.channels.log.channelId) || (serverData.channels.log.whitelisted && serverData.channels.log.whitelisted.find((channel) => channel === message.channel.id))) return; // Check if a log channel is defined and if the message has don't been send in a whitelisted channel
                const embed = new Discord.EmbedBuilder()
                    .setColor("Red")
                    .setTitle("New command")
                    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
                    .addFields(
                        { name: "__Command:__", value: `**\`${command}\`**` },
                        { name: "__Options(s):__", value: `**\`${message.content.replace(`${serverData.prefix}${command}`, "").split(" ")[0]}\`**` },
                        { name: "__Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                        { name: "__Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                        { name: "__Date:__", value: `<t:${Math.floor(message.createdMath.floor(Date.now() / 1000) / 1000)}:d> (<t:${Math.floor(message.createdMath.floor(Date.now() / 1000) / 1000)}:R>)` },
                    )
                    .setURL(message.url)
                    .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
                message.guild.channels.cache.get(serverData.channels.log.channelId).send({ embeds: [embed]}); // Send the message of the log in the log channel
            }
        }
    }
}