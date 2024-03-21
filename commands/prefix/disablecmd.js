module.exports = {
    name: "disablecmd",
    description: "Disables a command on this server.",
    permissions: "Administrator",
    model: `disablecmd **\`Name of command to disable\`**`,
    category: "Moderation",
    cooldown: 5000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        if (!message.member.permissions.has("Administrator")) {
            const msg = await message.reply("<a:no:1211019198881472622> - You do not have permission to disable command");
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        let command = message.content.split(' ').slice(1)[0];
        if (!command) {
            const msg = await message.reply('You must specify the name of command to disable');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        if (!client.commands.prefix.has(command)) {
            const msg = await message.reply('The specified command does not exist');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        let commands = await require("../../components/database").get(`/${message.guild.id}/disabled`)
        if (!commands[0]) commands = [];
        if (commands.find(cmd => cmd === command)) {
            const msg = await message.reply('The specified command is already disabled');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        commands.push(command);
        require("../../components/database").set(`/${message.guild.id}/disabled`, commands);
        const msg = await message.reply('The command has been disabled');
        setTimeout(async () => {
            try {
                msg.delete();
            } catch(err) { return err; }
        }, 5000);
    }
}