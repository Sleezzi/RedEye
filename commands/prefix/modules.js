const modules = {
    log: {
        emoji: "🤖",
        description: "Send a message every time something happens on the server",
        model: "#channel",
        execute: (message, response, reaction) => {
            try {
                console.log(message.content, response.content, reaction.emoji.name);
            } catch (err) { console.error(err); }
        }
    },
    welcom: {
        emoji: "📥",
        description: "Send a message when a user join the server",
        model: "#channel",
        execute: (message, response, reaction) => {
            try {
                console.log(message.content, response.content, reaction.emoji.name);
            } catch (err) { console.error(err); }
        }
    },
    goodbye: {
        emoji: "1205202384326885498",
        description: "Send a message when a user leave the server",
        model: "#channel",
        execute: (message, response, reaction) => {
            try {
                console.log(message.content, response.content, reaction.emoji.name);
            } catch (err) { console.error(err); }
        }
    },
}

module.exports = {
    name: "modules",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `logchannel **\`mention of channel\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            const embed = {
                color: 0x0099ff,
                title: ':bricks: - Modules',
                author: {
                    name: message.member.username,
                    icon_url: message.member.user.avatarURL(),
                    url: message.url,
                },
                fields: [
                    { name: `:question: - __How to use:__`, value: `**Select a reaction below then send a message in this channel following the template to activate and configure the different modules.**`, inline: false },
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
                msg.react(modules[module].emoji);
            }
            let used = false;
            client.on(Discord.Events.MessageReactionAdd, (reaction, user) => {
                if (msg.id !== reaction.message.id || user.id !== message.member.id) return;
                
                if (!modules[Object.keys(modules).find((module) => modules[module].emoji === reaction.emoji.id || modules[module].emoji === reaction.emoji.name)]) {
                    reaction.remove();
                    return;
                }
                
                msg.reactions.cache.forEach(r => {
                    if (r.emoji.id !== reaction.emoji.id) r.remove();
                    for (const module in modules) {
                        msg.react(modules[module].emoji);
                    }
                });
                
                client.on(Discord.Events.MessageCreate, async (response) => {
                    if (response.channel.id !== msg.channel.id ||
                        response.member.id !== message.member.id ||
                        used ||
                        !msg.reactions.cache.get(reaction.emoji.id).users.cache.find(member => member.id === message.member.id)
                    ) return;
                    used = true;
                    await modules[Object.keys(modules).find((module) => modules[module].emoji === reaction.emoji.name || modules[module].emoji === reaction.emoji.id)].execute(message, response, reaction);
                    msg.delete();
                    return;
                });
                return;
            });
            if (message && message.deletable) message.delete();
        } catch (err) { console.error(err); }
    }
}