module.exports = {
    name: "clean",
    description: "Delete messages in the channel in which the command is used",
    permissions: "ManageMessages",
    model: `clean`,
    category: "Core",
    cooldown: 15_000,
    async execute(message, client, Discord) {
        try {
            if (!message.member.permissions.has("ManageMessages")) {
                const msg = await message.reply(":x: - You do not have permission to delete messages");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 15000);
                return;
            }
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
            try { if (message && message.id) message.delete();} catch(err) { return err; }
            const msg = await message.channel.send(`:put_litter_in_its_place: - Channel content delete (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`);
            setTimeout(() => {
                try {
                    if (msg.deletable) {
                        msg.delete();
                    }
                } catch(err) { return err; }
            }, 15000);
        } catch(err) { return err; }
    }
}