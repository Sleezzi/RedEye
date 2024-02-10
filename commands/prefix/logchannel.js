module.exports = {
    name: "logchannel",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `logchannel **\`mention of channel\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, client, Discord) {
        if (!message.member.permissions.has("Administrator")) {
            const msg = await message.reply("<a:no:1205984659524296744> - You do not have permission to do this");
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        message.channel.sendTyping();
        const channel = message.mentions.channels.first();
        if (!channel) {
            const id = await require("../../components/database").get(`/${message.guild.id}/channels/log/channelId`, client);
            if (typeof id === "object") {
                const msg = await message.reply('You must mention the channel to which you want the bot to send log messages');
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 5000);
            } else {
                const msg = await message.reply('The log channel has been disabled.');
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 5000);
                require("../../components/database").delete(`/${message.guild.id}/channels/log/channelId`, client);
            }
            return;
        }
        if (!message.guild.channels.cache.find(c => c.id === channel.id)) {
            const msg = await message.reply('The mentioned channel does not exist or the bot does not have access to it');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        if (!message.guild.channels.cache.find(c => c.id === channel.id).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages")) {
            const msg = await message.reply('The bot cannot send messages to the mentioned channel');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        try {
            require("../../components/database").set(`/${message.guild.id}/channels/log/channelId`, channel.id, client);
            const msg = await message.reply('The log channel has been successfully registered');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
        } catch(err) { return err; }
    }
}