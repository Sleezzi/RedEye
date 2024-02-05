module.exports = {
    name: "disablecommand",
    description: "Disables a command on this server.",
    permissions: "Administrator",
    model: `disablecommand **\`Name of command to disable\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        if (!message.member.permissions.has("Administrator")) {
            const msg = await message.reply(":x: - You do not have permission to disable command").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        let command = message.content.split(' ').slice(1)[0];
        if (!command) {
            const msg = await message.reply('You must specify the name of command to disable').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        if (!client.data.commands.prefix.has(command)) {
            const msg = await message.reply('The specified command does not exist');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        require("../../components/database").get(`/${message.guild.id}/disabled`, client).then(async (commands) => {
            if (!commands[0]) commands = [];
            if (commands.find(cmd => cmd === command)) {
                const msg = await message.reply('The specified command is already disabled').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 5000);
                return;
            }
            commands.push(command);
            require("../../components/database").set(`/${message.guild.id}/disabled`, commands, client);
            const msg = await message.reply('The command has been disabled').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
        });
    }
}