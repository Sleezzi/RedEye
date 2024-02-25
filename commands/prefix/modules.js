const modules = {
    log: {
        emoji: "🤖",
        description: "Send a message every time something happens on the server",
        model: "#channel",
        async execute(message, response, reaction, client, Discord) {
            try {
                const channel = response.mentions.channels.first();
                if (!channel) { // Check if the user put a channel
                    const id = await require("../../components/database").get(`/${response.guild.id}/channels/log`);
                    if (typeof id === "object") { // Check if the db already has a channelId
                        const msg = await response.reply('You must mention the channel to which you want the bot to send log messages');
                        setTimeout(async () => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                    } else { // If the db has a log's channelId
                        const msg = await response.reply('The log channel has been disabled.');
                        setTimeout(async () => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                        require("../../components/database").delete(`/${response.guild.id}/channels/log`);
                    }
                    return;
                }
                if (!response.guild.channels.cache.find(c => c.id === channel.id)) { // Check if the bot can access to the channel
                    const msg = await response.reply('The mentioned channel does not exist or the bot does not have access to it');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                if (!response.guild.channels.cache.find(c => c.id === channel.id).permissionsFor(response.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) { // Check if the bot can send message in clog channel
                    const msg = await response.reply('The bot cannot send messages to the mentioned channel');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                
                try {
                    require("../../components/database").set(`/${response.guild.id}/channels/log`, channel.id); // Register the channel id in db
                    const msg = await response.reply('The log channel has been successfully registered');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                } catch(err) { console.error(err); }
            } catch (err) { console.error(err); }
        }
    },
    welcom: {
        emoji: "📥",
        description: "Send a message when a user join the server",
        model: "#channel",
        async execute(message, response, reaction, client, Discord) {
            try {
                const channel = response.mentions.channels.first();
                if (!channel) { // Check if the user put a channel
                    const id = await require("../../components/database").get(`/${response.guild.id}/channels/welcome`);
                    if (typeof id === "object") { // Check if the db already has a channelId
                        const msg = await response.reply('You must mention the channel to which you want the bot to send welcome messages');
                        setTimeout(async () => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                    } else { // If the db has a welcome's channelId
                        const msg = await response.reply('The welcome channel has been disabled.');
                        setTimeout(async () => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                        require("../../components/database").delete(`/${response.guild.id}/channels/welcome`);
                    }
                    return;
                }
                if (!response.guild.channels.cache.find(c => c.id === channel.id)) { // Check if the bot can access to the channel
                    const msg = await response.reply('The mentioned channel does not exist or the bot does not have access to it');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                if (!response.guild.channels.cache.find(c => c.id === channel.id).permissionsFor(response.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) { // Check if the bot can send message in clog channel
                    const msg = await response.reply('The bot cannot send messages to the mentioned channel');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                
                try {
                    require("../../components/database").set(`/${response.guild.id}/channels/welcome`, channel.id); // Register the channel id in db
                    const msg = await response.reply('The welcome channel has been successfully registered');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                } catch(err) { console.error(err); }
            } catch (err) { console.error(err); }
        }
    },
    goodbye: {
        emoji: "1205202384326885498",
        description: "Send a message when a user leave the server",
        model: "#channel",
        async execute(message, response, reaction, client, Discord) {
            try {
                const channel = response.mentions.channels.first();
                if (!channel) { // Check if the user put a channel
                    const id = await require("../../components/database").get(`/${response.guild.id}/channels/goodbye`);
                    if (typeof id === "object") { // Check if the db already has a channelId
                        const msg = await response.reply('You must mention the channel to which you want the bot to send goodbye messages');
                        setTimeout(async () => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                    } else { // If the db has a goodbye's channelId
                        const msg = await response.reply('The goodbye channel has been disabled.');
                        setTimeout(async () => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                        require("../../components/database").delete(`/${response.guild.id}/channels/goodbye`);
                    }
                    return;
                }
                if (!response.guild.channels.cache.find(c => c.id === channel.id)) { // Check if the bot can access to the channel
                    const msg = await response.reply('The mentioned channel does not exist or the bot does not have access to it');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                if (!response.guild.channels.cache.find(c => c.id === channel.id).permissionsFor(response.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) { // Check if the bot can send message in clog channel
                    const msg = await response.reply('The bot cannot send messages to the mentioned channel');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                
                try {
                    require("../../components/database").set(`/${response.guild.id}/channels/goodbye`, channel.id); // Register the channel id in db
                    const msg = await response.reply('The goodbye channel has been successfully registered');
                    setTimeout(async () => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                } catch(err) { console.error(err); }
                return;
            } catch (err) { console.error(err); }
        }
    },
    autorole: {
        emoji: "1200816753421328484",
        description: "Automatically assigns a role to the new member",
        model: "@role",
        async execute(message, response, reaction, client, Discord) {
            try {
                const role = response.mentions.roles.first();
                if (!role) { // Check if the user put a channel
                    const id = await require("../../components/database").get(`/${response.guild.id}/autorole`);
                    if (typeof id === "object") { // Check if the db already has a channelId
                        const msg = await response.reply('You must mention the role that the bot must give to the new member');
                        setTimeout(() => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                    } else { // If the db has a goodbye's channelId
                        const msg = await response.reply('The autorole module has been disabled.');
                        setTimeout(() => {
                            try {
                                msg.delete();
                            } catch(err) { console.error(err); }
                        }, 5000);
                        require("../../components/database").delete(`/${response.guild.id}/autorole`);
                    }
                    return;
                }
                if (!response.guild.roles.cache.find(r => r.id === role.id)) { // Check if the bot can access to the channel
                    const msg = await response.reply('The bot cannot find this role');
                    setTimeout(() => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                if (!response.guild.roles.cache.find(r => r.id === role.id).editable) { // Check if the bot can send message in clog channel
                    const msg = await response.reply('The bot cannot give this role to the member');
                    setTimeout(() => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                    return;
                }
                
                try {
                    require("../../components/database").set(`/${response.guild.id}/autorole`, role.id); // Register the channel id in db
                    const msg = await response.reply('The autorole has been successfully registered');
                    setTimeout(() => {
                        try {
                            msg.delete();
                        } catch(err) { console.error(err); }
                    }, 5000);
                } catch(err) { console.error(err); }
                return;
            } catch (err) { console.error(err); }
        }
    },
}

module.exports = {
    name: "modules",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `logchannel **\`mention of channel\`**`,
    category: "Moderation",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            if (!message.member.permissions.has("Administrator")) {
                const msg = await message.reply("<a:no:1211019198881472622> - You do not have permission to do this");
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 5000);
                return;
            }
            const embed = {
                color: 0x0099ff,
                title: ':bricks:・Modules',
                author: {
                    name: message.member.username,
                    icon_url: message.member.user.avatarURL(),
                    url: message.url,
                },
                fields: [
                    { name: `:question:・__How to use:__`, value: `**Select a reaction below then send a message in this channel following the template to activate and configure the different modules.**`, inline: false },
                ],
                footer: {
                    text: `Id: ${message.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };
            
            for (const module in modules) {
                embed.fields.push({
                    name: `${(/^\d/.test(modules[module].emoji) ? `<${(client.emojis.cache.find(emoji => emoji.id === modules[module].emoji && emoji.available).animated ? "a" : "")}:${client.emojis.cache.find(emoji => emoji.id === modules[module].emoji && emoji.available).name}:${modules[module].emoji}>` : modules[module].emoji)} - ${module.toUpperCase()}`,
                    value: `> - ${modules[module].description}\n> - Message template: ${modules[module].model}`
                });
            }
            
            const msg = await message.channel.send({ embeds: [embed] });
            
            for (const module in modules) {
                try {
                    msg.react(modules[module].emoji);
                } catch (err) { console.error(err); }
            }
            let used = false;
            client.on(Discord.Events.MessageReactionAdd, (reaction, user) => {
                if (msg.id !== reaction.message.id || user.id === client.user.id || used) return;
                
                if (user.id !== message.member.id || !modules[Object.keys(modules).find((module) => modules[module].emoji === reaction.emoji.id || modules[module].emoji === reaction.emoji.name)]) {
                    try {
                        reaction.remove();
                    } catch (err) { console.error(err); }
                    return;
                }
                msg.reactions.cache.forEach(r => {
                    if (r.emoji.id !== reaction.emoji.id) r.remove();
                    try {
                        msg.react(r.emoji);
                    } catch (err) { return err; }
                });
                
                client.on(Discord.Events.MessageCreate, async (response) => {
                    try {
                        if (response.channel.id !== msg.channel.id ||
                            response.member.id !== message.member.id ||
                            used ||
                            !msg.reactions.cache.find(r => r.emoji.id === reaction.emoji.id && r.users.cache.find(member => member.id === message.member.id))
                        ) return;
                        
                        used = true;
                        response.channel.sendTyping();
                        await modules[Object.keys(modules).find(module =>
                            modules[module].emoji === msg.reactions.cache.find(r =>
                                r.emoji.id === reaction.emoji.id &&
                                r.users.cache.find(member => member.id === message.member.id)
                            ).emoji.name ||
                            modules[module].emoji === msg.reactions.cache.find(r =>
                                r.emoji.id === reaction.emoji.id &&
                                r.users.cache.find(member => member.id === message.member.id)
                            ).emoji.id
                        )].execute(message, response, msg.reactions.cache.find(r => r.emoji.id === reaction.emoji.id && r.users.cache.find(member => member.id === message.member.id)), client, Discord);
                        await msg.delete();
                        await response.delete();
                        client.off(Discord.Events.MessageReactionAdd, () => {});
                        client.off(Discord.Events.MessageCreate, () => {});
                        return;
                    } catch (err) { console.error(err); }
                });
                return;
            });
            if (message && message.deletable) message.delete();
        } catch (err) { console.error(err); }
    }
}