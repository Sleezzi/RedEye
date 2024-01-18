module.exports = {
    name: "logchannel",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `logchannel **\`mention of channel\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, serverData, client, Discord) {
        if (!message.member.permissions.has("Administrator")) {
            message.reply("You do not have permission to do this").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        const channel = message.mentions.channels.first();
        if (!channel) {
            if (serverData.get(message.guild.id).channel.log.channelId) {
                const newserverData = {...serverData.get(message.guild.id)};            
                newserverData.channel.log.channeldId = undefined;
                serverData.set(message.guild.id, newserverData);
                message.reply('You have disabled the log channel').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            } else {
                message.reply('You must mention the channel to which you want the bot to send log messages').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            }
            return;
        }
        if (!message.guild.channels.cache.find(c => c.id === channel.id)) {
            message.reply('The mentioned channel does not exist or the bot does not have access to it').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        if (!message.guild.channels.cache.find(c => c.id === channel.id).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) {
            message.reply('The bot cannot send messages to the mentioned channel').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        try {
            const newserverData = {...serverData.get(message.guild.id)};            
            newserverData.channel.log.channeldId = channel.id;
            serverData.set(message.guild.id, newserverData);
            message.reply('The log channel has been successfully registered').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
        } catch(err) { return err; }
    }
}