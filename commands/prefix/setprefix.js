module.exports = {
    name: "setprefix",
    description: "Change the prefix on this server.",
    permissions: "Administrator",
    model: `setprefix **\`prefix\`**`,
    category: "Manage",
    cooldown: 5000,
    async execute(message, _, client, Discord) {
        if (!message.member.permissions.has("Administrator")) {
            message.reply("You do not have permission to do this").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        const prefix = message.content.split(' ').slice(1)[0];
        if (!prefix) {
            message.reply('You must enter the prefix').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        try {
            if (prefix === "!") {
                require("../../components/database").delete(`/${message.guild.id}/prefix`, client);
            } else {
                require("../../components/database").set(`/${message.guild.id}/prefix`, prefix, client);
                
            }
            message.reply(`The prefix has been successfully updated, now it's \`${prefix}\``).then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
        } catch(err) { return err; }
    }
}