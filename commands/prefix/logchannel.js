module.exports = {
    name: "logchannel",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `logchannel **\`mention of channel\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, _, client, Discord) {
        if (!message.member.permissions.has("Administrator")) {
            message.reply("You do not have permission to do this").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        const channel = message.mentions.channels.first();
        if (!channel) {
            require("../../components/database").get(`/${message.guild.id}/channels/log/channelId`, client).then((id) => {
                if (typeof id === "object") {
                    message.reply('You must mention the channel to which you want the bot to send log messages').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
                } else {
                    message.reply('The log channel has been disabled.').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
                    require("../../components/database").delete(`/${message.guild.id}/channels/log/channelId`, client);
                }
            });
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
            require("../../components/database").set(`/${message.guild.id}/channels/log/channelId`, channel.id, client);
            message.reply('The log channel has been successfully registered').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
        } catch(err) { return err; }
    }
}