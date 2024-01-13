module.exports = {
    name: "clean",
    description: "Delete messages in the channel in which the command is used",
    permissions: "ManageMessages",
    model: `clean`,
    category: "Core",
    cooldown: 15_000,
    async execute(message, serverData, client, Discord) {
        if (message.member.permissions.has("ManageMessages")) {
            try {
                message.channel.sendTyping();
                let fetchedMessages = { size: 1};
                let messagesDeleted = 0;
                do {
                    await message.channel.messages.fetch({ limit: 100 }).then((messages) => fetchedMessages = messages.filter((msg) => msg && 1_209_600 > Math.floor((Date.now() - msg.createdTimestamp) / 1_000) && msg.bulkDeletable && msg.member.id === client.user.id));
                    try {
                        await message.channel.bulkDelete(fetchedMessages.filter((msg) => msg.id));
                    } catch(err) { return err; }
                    messagesDeleted += fetchedMessages.size;
                } while (fetchedMessages.size >= 2);
                try {if (message) message.delete();} catch(err) { return err; }
                message.channel.send(`Channel content delete (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`).then((msg) => setTimeout(async function() { try {msg.delete() } catch(err) { return err; } }, 5_000));
            } catch(err) { return err; }
            
        } else {
            message.reply("You do not have permission to delete messages").then((msg) => setTimeout(async function() { try {msg.delete() } catch(err) { return err; } }, 5_000));
        }
    }
}