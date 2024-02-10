module.exports = {
    name: "enablecommand",
    description: "Enables a command on this server.",
    permissions: "Administrator",
    model: `enablecommand **\`Name of command to enable\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        if (!message.member.permissions.has("Administrator")) {
            const msg = await message.reply("<a:no:1205984659524296744> - You do not have permission to enable command");
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        let command = message.content.split(' ').slice(1)[0];
        if (!command) {
            const msg = await message.reply('You must specify the name of command to enable');
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
        let commands = await require("../../components/database").get(`/${message.guild.id}/disabled`, client);
        if (!commands[0]) commands = [];
        if (!commands.find(cmd => cmd === command)) {
            const msg = await message.reply('The specified command is not disabled');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        commands.shift(commands.indexOf(commands.find(cmd => cmd === command)));
        require("../../components/database").set(`/${message.guild.id}/disabled`, commands, client);
        const msg = await message.reply('The command has been enabled');
        setTimeout(async () => {
            try {
                msg.delete();
            } catch(err) { return err; }
        }, 5000);
    }
}