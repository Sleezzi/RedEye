module.exports = {
    name: "disablecommand",
    description: "Disables a command on this server.",
    permissions: "Administrator",
    model: `disablecommand **\`Name of command to disable\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, serverData, client, Discord) {
        if (!message.member.permissions.has("Administrator")) {
            message.reply("You do not have permission to disable command").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        let command = message.content.split(' ').slice(1)[0];
        if (!command) {
            message.reply('You must specify the name of command to disable').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        if (!client.data.commands.prefix.has(command)) {
            message.reply('The specified command does not exist').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        require("../../components/database").get(`/${message.guild.id}/disabled`, client).then((commands) => {
            if (!commands[0]) commands = [];
            if (commands.find(cmd => cmd === command)) {
                message.reply('The specified command is already disabled').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
                return;
            }
            commands.push(command);
            require("../../components/database").set(`/${message.guild.id}/disabled`, commands, client);
            message.reply('The command has been disabled').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
        });
    }
}