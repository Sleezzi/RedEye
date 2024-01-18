module.exports = {
    name: "enablecommand",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `enablecommand **\`Name of command to enable\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, serverData, client, Discord) {
        if (!message.member.permissions.has("Administrator")) {
            message.reply("You do not have permission to enable command").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        let command = message.content.split(' ').slice(1)[0];
        if (!command) {
            message.reply('You must specify the name of command to enable').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        if (!client.data.commands.prefix.has(command)) {
            message.reply('The specified command does not exist').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        if (!serverData.get(message.guild.id).disabledCommands.find(c => c === command)) {
            message.reply('The specified command is already enabled').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        try {
            const newserverData = {...serverData.get(message.guild.id)};            
            newserverData.disabledCommands.shift(newserverData.disabledCommands.indexOf(newserverData.disabledCommands.find(c => c === command)));
            serverData.set(message.guild.id, newserverData);
            message.reply('The command has been enabled').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
        } catch(err) { return err; }
    }
}